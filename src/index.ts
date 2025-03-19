import { options } from './cli'
import { ProxyServer } from './server'

const proxyServer = new ProxyServer(options.origin, options.port)

proxyServer.start()
