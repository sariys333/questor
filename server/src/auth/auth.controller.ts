import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

@Controller('api/auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    // 로그인 요청 signIn
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.username, signInDto.password);
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
