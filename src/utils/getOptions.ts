import { OptionValues } from 'commander'
import { Options } from '../types'
import { normalizeUrl } from './normalizeUrl'

function validatePort(port: string): number {
  const parsedPort = parseInt(port, 10)
  if (isNaN(parsedPort) || parsedPort < 0 || parsedPort > 65535) {
    throw new Error(`Invalid port number: ${port}`)
  }
  return parsedPort
}

function validateRedisUrl(redisUrl: string): string {
  if (!/^redis:\/\/.+/.test(redisUrl)) {
    throw new Error(`Invalid Redis URL: ${redisUrl}`)
  }
  return redisUrl
}

function validateOrigin(origin: string): string {
  const urlPattern = /\b((http|https):\/\/)?(www\.)?([a-zA-Z0-9-]+\.[a-zA-Z]{2,})(\/[a-zA-Z0-9#-]+\/?)*\b/i

  if (!urlPattern.test(origin)) {
    throw new Error(`Invalid origin URL: ${origin}`)
  }
  
  return origin
}

export function getOptions(opt: OptionValues): Options {
  return {
    redisUrl: validateRedisUrl(opt.redisUrl),
    port: validatePort(opt.port),
    origin: validateOrigin(normalizeUrl(opt.origin)),
    clearCache: opt.clearCache || false,
  }
}
