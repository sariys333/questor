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
        const result = await this.userService.login('user@quest.com','znptmxm')
        return result
    }


}
