import { Injectable } from '@nestjs/common';
import * as Redis from 'redis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
const client = Redis.createClient({ url: redisUrl });
client.connect();

@Injectable()
export class FeatureFlagsService {
  async getFlag(key: string, userId?: string): Promise<boolean> {
    const flagKey = userId ? `flag:${userId}:${key}` : `flag:${key}`;
    const value = await client.get(flagKey);
    return value === 'true';
  }

  async setFlag(key: string, value: boolean, userId?: string): Promise<{ key: string; value: boolean }> {
    const flagKey = userId ? `flag:${userId}:${key}` : `flag:${key}`;
    await client.set(flagKey, value ? 'true' : 'false');
    return { key, value };
  }
}
