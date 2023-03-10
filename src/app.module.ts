import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './redis.module';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, RedisModule],
})
export class AppModule {}
