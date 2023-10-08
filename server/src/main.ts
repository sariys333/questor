import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { cookieParser } from "cookie-parser"
const cookieParser = require('cookie-parser');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:3000', // 클라이언트 애플리케이션의 출처
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 허용할 HTTP 메서드
    credentials: true, // 인증 정보 전송 허용 (쿠키 사용 시 필요)
  });

  await app.listen(3001);
}
bootstrap();
