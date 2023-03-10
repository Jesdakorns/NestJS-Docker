import { Logger, Module } from '@nestjs/common';
import { createClient } from 'redis';

export const REDIS_CLIENT = 'REDIS_CLIENT';
const THREE_MINUTES_PING_INTERVAL = 180000;

@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      useFactory: async () => {
        const logger = new Logger(REDIS_CLIENT);

        const client = createClient({
          url: `redis://localhost:6379`,
          pingInterval: THREE_MINUTES_PING_INTERVAL,
        });
        client.on('ping-interval', (reply) => {
          logger.debug(`Redis ping reply: ${reply}`);
        });
        client.on('error', (err) => {
          logger.error(`Redis error: ${err.message}`);
        });
        client.on('connect', () => {
          logger.debug('Redis connected');
        });
        client.on('reconnecting', () => {
          logger.debug('Redis reconnecting');
        });
        client.on('ready', () => {
          logger.debug('Redis ready!');
        });

        await client.connect();
        return client;
      },
    },
  ],
  exports: [REDIS_CLIENT],
})
export class RedisModule {}
