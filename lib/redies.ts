import { Redis } from "ioredis";

const redis = new Redis({
  host: "47.120.58.223",
  port: 6379,
  password: "root123.",
  connectTimeout: 10000,
  retryStrategy: (times) => {
    console.log(`重试连接 Redis，第 ${times} 次尝试`);
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
