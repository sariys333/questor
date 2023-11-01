import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestModule } from './quest/quest.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UtilsModule } from './utils/utils.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
    imports: [QuestModule, UserModule, AuthModule, UtilsModule, ServeStaticModule.forRoot({
        rootPath: join(__dirname, '..', 'client', 'build'),
    }),],
    controllers: [AppController],
    providers: [AppService],
})

export class AppModule { }