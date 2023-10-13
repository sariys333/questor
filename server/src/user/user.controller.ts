import { Controller, Get, Post, UseGuards, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './types/user.type';
import { User as ReqUser } from "src/user/user.decorator"
import { Public } from 'src/auth/public.decorator';
import { SECRET_KEY } from 'src/Constants';
import { get } from 'http';
import { Credentials } from 'src/auth/types/auth.types';

@Controller('api/user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get("")
    async findCurrentUser(@ReqUser() user: User): Promise<User> {
        return await this.userService.getUserById(user.userId);
    }

    @Public()
    @Post("/signup")
    async signup(@Body() cred: Credentials): Promise<boolean> {
        const encryptpwd = require('encrypt-with-password');
        const encoded = encryptpwd.encrypt(SECRET_KEY, cred.password)
        console.log(encoded)
        cred.password = encoded
        console.log(cred)
        return await this.userService.signup(cred);
    }

    @Public()
    @Post("/email")
    async checkEmail(@Body() cred: Credentials): Promise<boolean> {
        console.log(cred)
        const user = await this.userService.getUserByEmail(cred.email)
        console.log(user)
        if (user.email == cred.email) {
            return false
        }
        return true
    }

}
// 토큰 유효기간있잖아

// 토큰을 리프레쉬하는 기능
// 일정시간이 지났어도 다시 새로운걸 발급해줄수있는

// 접근을 위한 토큰 : access token 휘발성
// 토큰을 리프레쉬 하기 위한 토큰: refresh token < 데이터 베이스에 저장하는 방식일 것이다.