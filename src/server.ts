import express, { Application } from 'express'

export class ProxyServer {
  private readonly server: Application
  private readonly forwardUrl: string

  constructor(forwardUrl: string) {
    this.server = express()
    this.forwardUrl = forwardUrl
  }

  public start(port: number): void {
    this.server.listen(port, () => {
      console.log(`Proxy server is listening to http://localhost:${port}/ and forwarding to ${this.forwardUrl}`)
    })
  }
}
