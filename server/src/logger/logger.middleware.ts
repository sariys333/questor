import { Injectable, NestMiddleware } from '@nestjs/common';
import { SignJWT, generateSecret } from 'jose';
import { LoggerService } from './logger.service';
import Item from 'antd/es/list/Item';
import { User } from 'src/user/types/user.type';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

  constructor(private readonly loggerService: LoggerService) { }

  async use(req: any, res: any, next: () => void) {
    // 로그인 요청하는 유저 데이터 가져오기
    // 데이터에서 로그인 아이디 비밀번호 꺼내서 서비스 호출
    const loginUser = await this.loggerService.idPwCheck('user@quest.com','znptmxm')
    console.log(loginUser)
    if(loginUser) {
      // 로그인 성공했다면 토큰생성
      const email = loginUser[0].email
      const secretKey = await generateSecret("HS256");
      const token = await new SignJWT({"login": true })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuer(email)
        .sign(secretKey)

        res.setHeader('Authorization', `Bearer ${token}`)
    }
    next();
  }
}
