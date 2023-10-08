import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { Body, Controller, HttpCode, HttpStatus, Post, Response, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';
import { Credentials } from './types/auth.types';
import { Response as Res } from 'express';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

@Controller('api/auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    // 로그인 요청 signIn
    @HttpCode(HttpStatus.OK)
    @Post('login')
    @Public()
    async signIn(@Body() cred: Credentials, @Response() res: Res) {
        console.log(cred)
        const {user, token} = await this.authService.signIn(cred)
        console.log(token)
        res.cookie("JWT", token, {
            secure: false,
            httpOnly: true,
            sameSite: true,
            expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
        }).json(user)
        return
    }

    async signup(): Promise<boolean> {
        const date = new Date();
        const command = new PutCommand({
            TableName: "users",
            Item: {
                user_id: 0,
                email: "user@quest.com",
                password: "znptmxm",
                name: "홍길동",
                nickname: "의적",
                tel: "01094651351",
                regDate: date.getTime()
            }
        })

        const response = await docClient.send(command)
        return
    }


}
