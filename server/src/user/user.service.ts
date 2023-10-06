import { Injectable } from '@nestjs/common';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient, GetCommand, QueryCommand, QueryCommandInput, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { User } from './types/user.type';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

@Injectable()
export class UserService {

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
    

    async login(email: string, password: string): Promise<User[]> {
        const command = new QueryCommand({
            TableName: "users",
            KeyConditionExpression:
                "email = :email",
            ExpressionAttributeValues: {
                ":email": email
            },
            ConsistentRead: true
        })

        const response = await docClient.send(command)

        if(response) {
            return response.Items.map((item: User) => new User(item))
        }
        return 
    }


    async getUserById(userId: number): Promise<User[]> {
        const command = new GetCommand({
            TableName: 'users',
            Key: {
                user_id: userId
            }
        })

        const response = await docClient.send(command)

        console.log(response)

        return [new User(response.Item)]

    }

}