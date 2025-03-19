import { redis } from '../utils/redis'

export class CacheService {
  public static async get(
    key: string,
  ): Promise<Record<string, any> | null> {
    const data = await redis.get(key)

    return data ? JSON.parse(data) : null
  }

  public static async set(
    key: string,
    value: Record<string, any>,
    expiration: number = 3600,
  ): Promise<void> {
    await redis.set(key, JSON.stringify(value), 'EX', expiration)
  }
}
