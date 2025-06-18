import { Redis } from "ioredis";

const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: parseInt(process.env.REDIS_PORT || "6379"),
  password: process.env.REDIS_PASSWORD || "root123.",
  connectTimeout: 10000,
  retryStrategy: (times) => {
    console.log(`Retrying Redis connection, attempt ${times}`);
    return Math.min(times * 100, 3000);
  },
});

export const setRedis = async (key: string, value: string, ttl?: number) => {
  if (ttl) {
    await redis.set(key, value, "EX", ttl);
  } else {
    await redis.set(key, value);
  }
};

export const getRedis = async (key: string) => {
  return await redis.get(key);
};

export const delRedies = async (key: string) => {
  return await redis.del(key);
};
