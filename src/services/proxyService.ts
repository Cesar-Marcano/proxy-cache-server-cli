import { Request, Response } from 'express'
import { ForwardClient } from '../utils/fetcher'
import { buildQueryString } from '../utils/buildQueryString'
import { CacheService } from './cacheService'
import { extractHeaders } from '../utils/extractHeaders'
import { redis } from '../utils/redis'
import { AxiosResponse } from 'axios'
import { getAxiosContentType } from '../utils/getAxiosContentType'

export class ProxyService {
  private forwardClient: ForwardClient
  private cacheService: CacheService
  private cacheKey?: string = undefined

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
      const fetchData = this.getFetchData(req)

      this.setCacheKey(fetchData.method, fetchData.path)

      if (!this.cacheKey) {
        throw new Error('Cache key is not defined')
      }

      const cachedResponse = await this.getCache(this.cacheKey)

      if (cachedResponse) {
        this.setCacheHeaders(res, 'HIT')
        this.setContentType(res, cachedResponse.contentType)

        res.send(cachedResponse.data)
        return
      }

      const axiosResponse = await this.fetchOrigin(fetchData)

      if (axiosResponse && axiosResponse.status >= 400) {
        return this.handleErrorFromOrigin(axiosResponse, res)
      }

      if (!axiosResponse || !axiosResponse.data) {
        return this.handleNoResponseFromOrigin(res)
      }

      const responseContentType = getAxiosContentType(axiosResponse)

      await this.setCache(
        this.cacheKey,
        responseContentType,
        axiosResponse.data,
      )

      this.setCacheHeaders(res, 'MISS')
      this.setContentType(res, responseContentType)
      res.status(axiosResponse.status).send(axiosResponse.data)
    } catch (error) {
      res.status(500).json({
        error: `Error processing request: ${error instanceof Error ? error.message : 'Unknown error'}`,
      })
    }
  }

  private async fetchOrigin(data: {
    path: string
    headers: Record<string, string>
    method: string
    body: object
  }) {
    return this.forwardClient.fetch(
      data.path,
      data.headers,
      data.method,
      data.body,
    )
  }

  private getFetchData(req: Request) {
    return {
      method: req.method.toLocaleLowerCase(),
      path: req.params.path || '',
      headers: extractHeaders(req.headers),
      queryString: buildQueryString(
        req.query as Record<string, string | string[]>,
      ),
      body: req.body || {},
      getFinalPath() {
        let finalPath = this.path
        if (this.queryString) {
          finalPath += `?${this.queryString}`
        }
        return finalPath
      },
    }
  }

  private handleErrorFromOrigin(axiosResponse: AxiosResponse, res: Response) {
    res.status(axiosResponse.status).json({
      error: `Error from origin: ${axiosResponse.status} ${axiosResponse.statusText}`,
    })
  }

  private handleNoResponseFromOrigin(res: Response) {
    res.status(502).json({ error: 'Bad Gateway: No response from origin' })
  }

  private setCacheHeaders(res: Response, cacheStatus: 'HIT' | 'MISS') {
    res.setHeader('X-Cache', cacheStatus)
  }
  private setContentType(res: Response, contentType: string) {
    res.setHeader('Content-Type', contentType)
  }

  private setCacheKey(method: string, path: string) {
    this.cacheKey = `${method}:${path}`
  }

  private getCache(cacheKey: string) {
    return this.cacheService.get(cacheKey)
  }

  private setCache(cacheKey: string, contentType: string, data: any) {
    return this.cacheService.set(cacheKey, contentType, data)
  }
}
