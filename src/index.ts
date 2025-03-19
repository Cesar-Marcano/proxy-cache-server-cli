import { options } from './cli'
import { ProxyServer } from './server'
import { redis } from './utils/redis'

async function runServer() {
  if (options.clearCache) {
    console.log('🗑️  Clearing cache...')

    await redis.flushdb()

    console.log('✅ Cache cleared')

    return process.exit(0)
  }

  const proxyServer = new ProxyServer(options.origin, options.port)

  proxyServer.start()
}

void runServer()
