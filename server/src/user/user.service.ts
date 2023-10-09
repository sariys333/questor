import { Injectable } from '@nestjs/common';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient, GetCommand, QueryCommand, QueryCommandInput, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { User } from './types/user.type';
import { Credentials } from 'src/auth/types/auth.types';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

@Injectable()
export class UserService {

    async getUserById(userId: number): Promise<User> {
        const command = new GetCommand({
            TableName: 'users',
            Key: {
                user_id: userId
            }
        })

        const response = await docClient.send(command)

        console.log(response)

        return new User(response.Item)
    }

    async getUserByEmail(email: string): Promise<User> {
        const command = new ScanCommand({
            TableName: "users",
            FilterExpression: "email = :email",
            ExpressionAttributeValues: {
                ":email": email
            },
        }) // 1메가를 우선 조회 다함. 그리고 그안에서 이메일이 맞는 걸 찾음. 그럼 1메가 넘은 곳에 있으면 어떻게 함

        const response = await docClient.send(command)

        console.log(response)

        if (response.Items) {
            return new User(response.Items[0])
        } else {
            return undefined
        } 
    }

    async signup(cred: Credentials): Promise<boolean> {
        const command = new PutCommand({
            TableName: "users",
            Item: {
                user_id: 2,
                email:  cred.email,
                password: cred.password,
                name: cred.name,
                username: cred.username,
                reg_date: new Date().getTime()
            }
        })

        const response = await docClient.send(command);
        console.log(response)
        if(response) {
            return true
        }
        return 
    }


}