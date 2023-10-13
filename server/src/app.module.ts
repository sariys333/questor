import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestModule } from './quest/quest.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UtilsModule } from './utils/utils.module';

@Module({
    imports: [QuestModule, UserModule, AuthModule, UtilsModule],
    controllers: [AppController],
    providers: [AppService],
})

export class AppModule { }