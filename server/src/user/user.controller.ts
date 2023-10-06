import { Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { LoggerGuard } from 'src/logger/logger.guard';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post("/signup")
    async postSignup() {
        return await this.userService.signup()
    }

    @Post("/login")
    @UseGuards(LoggerGuard)
    async postLogin() {
        return null
    }


}
