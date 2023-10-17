/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { REFRESH_KEY } from "src/Constants";
import { UserService } from "src/user/user.service";
import { BcryptService } from "src/utils/bcrypt.service";
import { Credentials, RefreshTokenParams } from "./types/auth.types";
import { User } from "src/user/types/user.type";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly bcryptService: BcryptService,
    ) { }

    // 로그인 가능 계정인지 확인
    // 토큰도 생성, 반환

    async refresh({ userId }: RefreshTokenParams): Promise<any> {
        console.log(userId);
        const user = await this.userService.getUserById(userId);
        const payload = { userId: user.userId, email: user.email };
        return {
            token: await this.jwtService.signAsync(payload),
        };
    }

    async signIn(credentials: Credentials): Promise<any> {
        const user = await this.userService.getUserByEmail(credentials.email);
        // console.log(user);
        if (!user) {
            return { msg: "user not found" };
        }

        const compared = await this.bcryptService.compare(
            credentials.password,
            user?.password,
        );
        console.log("compared", compared);
        if (!compared) {
            throw new UnauthorizedException(user);
        }
        const { password, ...result } = user;

        const payload = { userId: user.userId, email: user.email };

        return {
            token: await this.jwtService.signAsync(payload),
            user: result,
            refresh: await this.jwtService.signAsync(
                { userId: payload.userId, email: payload.email },
                { secret: REFRESH_KEY },
            ),
        };
    }
}
