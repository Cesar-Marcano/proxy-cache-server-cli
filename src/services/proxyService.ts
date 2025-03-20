import { Request, Response } from 'express'
import { ForwardClient } from '../utils/fetcher'
import { buildQueryString } from '../utils/buildQueryString'
import { CacheService } from './cacheService'
import { extractHeaders } from '../utils/extractHeaders'
import { redis } from '../utils/redis'

export class ProxyService {
  private forwardClient: ForwardClient
  private cacheService: CacheService

  constructor(
    origin: string,
    services?: {
      forwardClient?: ForwardClient
      cacheService?: { instance?: CacheService; redisClient?: typeof redis }
    },
  ) {
    this.forwardClient = services?.forwardClient ?? new ForwardClient(origin)
    this.cacheService =
      services?.cacheService?.instance ??
      new CacheService(services?.cacheService?.redisClient ?? redis)
  }

  public async handleRequest(req: Request, res: Response): Promise<void> {
    try {
      const method = req.method.toLowerCase()
      let path = req.params.path || ''
      const body = req.body || {}
      const queryString = buildQueryString(
        req.query as Record<string, string | string[]>,
      )

      if (queryString) {
        path += `?${queryString}`
      }

      const cacheKey = `${method}:${path}`
      const cachedResponse = await this.cacheService.get(cacheKey)

      if (cachedResponse) {
        res.setHeader('X-Cache', 'HIT')
        res.setHeader('Content-Type', cachedResponse.contentType)
        res.send(cachedResponse.data)
        return
      }

      const headers = extractHeaders(req.headers)
      const response = await this.forwardClient.fetch(
        path,
        headers,
        method,
        body,
      )

      if (!response || !response.data) {
        res.status(502).json({ error: 'Bad Gateway: No response from origin' })
        return
      }

      const responseContentType =
        response.headers?.['content-type'] || 'application/octet-stream'

      await this.cacheService.set(
        cacheKey,
        responseContentType,
        response.data,
        3600,
      )

      res.setHeader('X-Cache', 'MISS')
      res.setHeader('Content-Type', responseContentType)
      res.send(response.data)
    } catch (error) {
      res.status(500).json({
        error: `Error processing request: ${error instanceof Error ? error.message : 'Unknown error'}`,
      })
    }
  }
}
