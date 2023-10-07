import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestModule } from './quest/quest.module';
import { UserModule } from './user/user.module';
import { LoggerModule } from './logger/logger.module';
import { LoggerService } from './logger/logger.service';
import { UserMiddleware } from './user/user.middleware';

@Module({
  imports: [QuestModule, UserModule, LoggerModule],
  controllers: [AppController],
  providers: [AppService, LoggerService],
})

export class AppModule {}