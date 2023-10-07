import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService) { }

    // 로그인 가능 계정인지 확인
    // 토큰도 생성, 반환

    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.userService.getUserByEmail(username);
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }
        const { password, ...result } = user;
        // TODO: Generate a JWT and return it here
        // instead of the user object
        return result;
    }
}
