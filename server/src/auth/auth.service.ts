/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { Credentials } from "./types/auth.types";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    // 로그인 가능 계정인지 확인
    // 토큰도 생성, 반환

    async signIn(credentials: Credentials): Promise<any> {
        const user = await this.userService.getUserByEmail(credentials.email);
        console.log(user);
        if (!user) {
            return { msg: "user not found" };
        }
        if (user?.password !== credentials.password) {
            throw new UnauthorizedException(user);
        }
        const { password, ...result } = user;

        const payload = { userId: user.userId, email: user.email };

        return { token: await this.jwtService.signAsync(payload), user: result };
    }
}
