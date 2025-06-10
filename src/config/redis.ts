import "dotenv/config"
import Redis from "ioredis";
import { envSchema } from "../schemas/env";

const redisUrl = envSchema.parse(process.env).REDIS_URL as string

export const redis = new Redis(redisUrl)

// set redis key
export const setRedisAsync = async (key: string, value: string, ex: number = 600)=> {
    await redis.set(key, value, "EX", ex)
}

// get redis key
export const getRedisAsync = async (key: string): Promise<string | null>=> {
    return await redis.get(key)
}

// delete redis key
export const deleteRedisAsync = async (key: string) => {
    await redis.del(key)
}

// exists redis key
export const existsRedisAsync = async (key: string) => {
    const result = await redis.exists(key)
    return result === 1
}

// verify redis key expiration time
export const ttlRedisAsync = async (key: string): Promise<number> => {
  return await redis.ttl(key)
}