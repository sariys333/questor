import { Controller, Get, Post, UseGuards, Body } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./types/user.type";
import { User as ReqUser } from "src/user/user.decorator";
import { Public } from "src/auth/public.decorator";
import { Credentials } from "src/auth/types/auth.types";

@Controller("api/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("")
  async findCurrentUser(@ReqUser() user: User): Promise<{ user: User }> {
    const userFound = await this.userService.getUserById(user.userId);
    return {
      user: userFound,
    };
  }

  @Public()
  @Post("/signup")
  async signup(@Body() cred: Credentials): Promise<boolean> {
    return await this.userService.signup(cred);
  }

  @Public()
  @Post("/email")
  async checkEmail(@Body() cred: Credentials): Promise<boolean> {
    console.log(cred);
    const user = await this.userService.getUserByEmail(cred.email);
    console.log(user);
    if (user.email == cred.email) {
      return false;
    }
    return true;
  }
}
