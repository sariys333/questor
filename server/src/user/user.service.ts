import { Injectable } from '@nestjs/common';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient, GetCommand, QueryCommand, QueryCommandInput, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { User } from './types/user.type';

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
        const command = new GetCommand({
            TableName: 'users',
            Key: {
                email: email
            }
        })

        const response = await docClient.send(command)

        console.log(response)

        return new User(response.Item)
    }
}