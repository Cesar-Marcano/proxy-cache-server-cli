import express, { Application } from 'express'
import { ProxyService } from './services/proxyService'

export class ProxyServer {
  private readonly server: Application
  private readonly forwardUrl: string
  private readonly port: number
  private proxyService: ProxyService

  constructor(origin: string, port: number, proxyService?: ProxyService) {
    this.server = express()
    this.forwardUrl = origin
    this.port = port

    this.server.use(express.json())
    this.server.use(express.urlencoded({ extended: true }))

    this.proxyService = proxyService || new ProxyService(origin)

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
