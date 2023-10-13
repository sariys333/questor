import { Injectable } from "@nestjs/common";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    PutCommand,
    DynamoDBDocumentClient,
    GetCommand,
    QueryCommand,
    QueryCommandInput,
    ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import { User } from "./types/user.type";
import { Credentials } from "src/auth/types/auth.types";
import { v4 as uuidv4 } from 'uuid';
import { BcryptService } from "src/utils/bcrypt.service";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

@Injectable()
export class UserService {
    constructor(private readonly bcryptService: BcryptService) {}


    async getUserById(userId: string): Promise<User> {
        const command = new GetCommand({
            TableName: "users",
            Key: {
                user_id: userId,
            },
        });

        const response = await docClient.send(command);

        console.log(response);

        return new User(response.Item);
    }

    async getUserByEmail(email: string): Promise<User> {
        const command = new ScanCommand({
            TableName: "users",
            FilterExpression: "email = :email",
            ExpressionAttributeValues: {
                ":email": email,
            },
        }); // 1메가를 우선 조회 다함. 

        const response = await docClient.send(command);

        console.log(response);

        if (response.Items) {
            return new User(response.Items[0]);
        } else {
            return undefined;
        }
    }

    async signup(cred: Credentials): Promise<boolean> {
        const hashedPw = await this.bcryptService.hash(cred.password)

        const command = new PutCommand({
            TableName: "users",
            Item: {
                user_id: uuidv4(),
                email: cred.email,
                password: hashedPw,
                name: cred.name,
                username: cred.username,
                reg_date: new Date().getTime(),
            },
        });

        const response = await docClient.send(command);
        console.log(response);
        if (response) {
            return true;
        }
        return;
    }
}
