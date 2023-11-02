import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from "cookie-parser";


async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(cookieParser());
    app.enableCors({
        origin: "http://3.39.23.102:8080",
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });

    await app.listen(8080);
}
bootstrap();
