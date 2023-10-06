import { Injectable, NestMiddleware } from '@nestjs/common';
import { SignJWT, generateSecret } from 'jose';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

  constructor(private readonly loggerService: LoggerService) { }

  async use(req: any, res: any, next: () => void) {
    // 로그인 요청하는 유저 데이터 가져오기
    const loginUser = await this.loggerService.idPwCheck(req.body.email, req.body.password)
    console.log(loginUser)
    if(loginUser) {
      // 로그인 성공했다면 토큰생성
      const secretKey = await generateSecret("HS256");
      const token = await new SignJWT({"login": true })
        .setProtectedHeader({ alg: "HS256"})
        .setIssuer(loginUser[0].email) 
        .sign(secretKey)
        console.log(token)
        res.cookie("Token", token)
    }
    next();
  }
}

