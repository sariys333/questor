import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestModule } from './quest/quest.module';
import { UserModule } from './user/user.module';
import { LoggerModule } from './logger/logger.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { LoggerService } from './logger/logger.service';

@Module({
  imports: [QuestModule, UserModule, LoggerModule],
  controllers: [AppController],
  providers: [AppService, LoggerService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
	consumer
	.apply(LoggerMiddleware)
	.forRoutes({ path: 'user/login', method: RequestMethod.POST})
  }
}
