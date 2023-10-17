import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Response,
} from "@nestjs/common";
import { Response as Res } from "express";
import { AuthService } from "./auth.service";
import { Public } from "./public.decorator";
import { Credentials } from "./types/auth.types";
import { ACCESS_EXPIRATION, REFRESH_EXPIRATION } from "src/Constants";
import { RefreshTokenGuard } from "src/guards/refresh-token/refresh-token.guard";
import { UseGuards } from "@nestjs/common";
import { User } from "src/user/types/user.type";
import { User as ReqUser } from "../user/user.decorator";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

@Controller("api/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 로그인 요청 signIn
  @HttpCode(HttpStatus.OK)
  @Post("login")
  @Public()
  async signIn(@Body() cred: Credentials, @Response() res: Res) {
    // console.log(cred);
    const { user, token, refresh } = await this.authService.signIn(cred);
    console.log("?", token);
    console.log("re", refresh);
    res.cookie("access_token", token, {
      secure: false,
      httpOnly: true,
      sameSite: true,
      expires: this.getExpirationTime(ACCESS_EXPIRATION),
    });
    res
      .cookie("refresh_token", refresh, {
        secure: false,
        httpOnly: true,
        sameSite: true,
        expires: this.getExpirationTime(REFRESH_EXPIRATION),
      })
      .json(user);
    return;
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Get("/refresh")
  async refresh(@ReqUser() user: User, @Response() res: Res) {
    const { token } = await this.authService.refresh(user);
    res
      .cookie("access_token", token, {
        secure: false,
        httpOnly: true,
        sameSite: true,
        expires: this.getExpirationTime(ACCESS_EXPIRATION),
      })
      .json("refreshed");
  }

  getExpirationTime(expiration: number) {
    return new Date(Date.now() + expiration);
  }
}
