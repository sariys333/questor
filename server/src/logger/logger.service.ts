import { Injectable } from '@nestjs/common';
import { DynamoDBClient, GetItemCommand, QueryCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
import { User } from 'src/user/types/user.type';
import Item from 'antd/es/list/Item';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

@Injectable()
export class LoggerService {

    async idPwCheck(email: string, password: string): Promise<User[]> {
        const command = new GetCommand({
            TableName: 'users',
            Key: {
                email: email
            }
        })

        const response = await docClient.send(command);

        const users = response.Item
        if(users.password === password) {
            return [new User(users)]
        }
        return
    }

}
