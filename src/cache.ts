import IORedis from "ioredis";
import { options } from "./cli";

class RedisClient {
  private static instance: IORedis | null = null;
  private static redisUrl: string = "redis://localhost:6379";

  private constructor() {}

  public static configure(redisUrl: string) {
    this.redisUrl = redisUrl;
  }

  public static getInstance(): IORedis {
    if (!this.instance) {
      console.log(`🔗 Conectando a Redis en: ${this.redisUrl}`);

      this.instance = new IORedis(this.redisUrl);

      this.instance.on("connect", () => console.log("✅ Redis Connected"));
      this.instance.on("error", (err) => console.error("❌ Redis Error:", err));
    }
    return this.instance;
  }

  public static closeConnection() {
    if (this.instance) {
      this.instance.quit();
      this.instance = null;
      console.log("🔴 Redis Disconnected");
    }
  }
}

RedisClient.configure(options.redisUrl);

export const redis = RedisClient.getInstance();
