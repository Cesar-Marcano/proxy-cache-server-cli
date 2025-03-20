import express, { Application } from 'express'
import { ProxyService } from './services/proxyService'
import { CacheService } from './services/cacheService'
import { redis } from './utils/redis'

export class ProxyServer {
  private readonly server: Application
  private readonly forwardUrl: string
  private readonly port: number
  private proxyService: ProxyService

  constructor(
    origin: string,
    port: number,
    redisClient: typeof redis,
    ttl: number,
    proxyService?: ProxyService,
  ) {
    this.server = express()
    this.forwardUrl = origin
    this.port = port

    this.server.use(express.json())
    this.server.use(express.urlencoded({ extended: true }))

    this.proxyService =
      proxyService ||
      new ProxyService(origin, {
        cacheService: {
          instance: new CacheService(redisClient, ttl),
        },
      })

    this.server.all(
      '/:path(*)',
      this.proxyService.handleRequest.bind(this.proxyService),
    )
  }

  public start(): void {
    this.server.listen(this.port, () => {
      console.log(
        `Proxy server is listening to http://localhost:${this.port}/ and forwarding to ${this.forwardUrl}`,
      )
    })
  }
}
