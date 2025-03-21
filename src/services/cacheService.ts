import { redis } from '../utils/redis'

export class CacheService {
  private readonly redis: typeof redis
  private readonly ttl: number = 3600

  constructor(redisClient: typeof redis, ttl?: number) {
    this.redis = redisClient
    this.ttl = ttl || this.ttl
  }

  public async get(
    key: string,
  ): Promise<{ contentType: string; data: any } | null> {
    const data = await this.redis.get(key)

    if (!data) return null

    try {
      const parsed = JSON.parse(data)
      if (parsed.isBase64) {
        return {
          contentType: parsed.contentType,
          data: Buffer.from(parsed.data, 'base64'),
        }
      }
      return parsed
    } catch {
      return null
    }
  }

  public async set(
    key: string,
    contentType: string,
    value: any,
    expiration: number = this.ttl,
  ): Promise<void> {
    let storedValue

    if (
      contentType.startsWith('text/') ||
      contentType.includes('json') ||
      contentType.includes('xml')
    ) {
      storedValue = JSON.stringify({ contentType, data: value })
    } else {
      storedValue = JSON.stringify({
        contentType,
        data: Buffer.from(value).toString('base64'),
        isBase64: true,
      })
    }

    await this.redis.set(key, storedValue, 'EX', expiration)
  }
}
