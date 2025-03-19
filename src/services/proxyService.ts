import { Request, Response } from 'express'
import { ForwardClient } from '../utils/fetcher'
import { buildQueryString } from '../utils/buildQueryString'
import { CacheService } from './cacheService'
import { extractHeaders } from '../utils/extractHeaders'

export class ProxyService {
  private forwardClient: ForwardClient

  constructor(origin: string, forwardClient?: ForwardClient) {
    this.forwardClient = forwardClient ?? new ForwardClient(origin)
  }

  public async handleRequest(req: Request, res: Response): Promise<void> {
    try {
      const method = req.method.toLowerCase()
      let path = req.params.path
      const body = req.body || {}
      const queryString = buildQueryString(
        req.query as Record<string, string | string[]>,
      )

      if (queryString) {
        path += `?${queryString}`
      }

      const cacheKey = `${method}:${path}`
      const cachedData = await CacheService.get(cacheKey)

      if (cachedData) {
        res.setHeader('X-Cache', 'HIT')
        res.json(cachedData.data)
        return
      }
      
      const headers = extractHeaders(req.headers)
      const response = await this.forwardClient.fetch(
          path,
          headers,
        method,
        body,
    )

    await CacheService.set(cacheKey, { data: response.data }, 3600)
    res.setHeader('X-Cache', 'MISS')
      res.json(response.data)
    } catch (error) {
      res.status(500).json({
        error: `Error processing request: ${error instanceof Error ? error.message : 'Unknown error'}`,
      })
    }
  }
}
