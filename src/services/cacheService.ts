import { redis } from '../utils/redis'

export class CacheService {
  private readonly redis: typeof redis

  constructor(redisClient: typeof redis) {
    this.redis = redisClient
  }

  public async get(key: string): Promise<Record<string, any> | null> {
    const data = await this.redis.get(key)

    return data ? JSON.parse(data) : null
  }

  public async set(
    key: string,
    value: Record<string, any>,
    expiration: number = 3600,
  ): Promise<void> {
    await this.redis.set(key, JSON.stringify(value), 'EX', expiration)
  }
}
