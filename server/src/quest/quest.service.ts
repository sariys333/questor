import { Injectable } from '@nestjs/common';
import { Quest } from './types/quest.type';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient, GetCommand, QueryCommand, QueryCommandInput } from "@aws-sdk/lib-dynamodb";
import { error } from 'console';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

@Injectable()
export class QuestService {

    async getList(uesrId: number): Promise<Quest[]> {
        const command = new GetCommand({
            TableName: "quests",
            Key: {
                user_id: uesrId
            }
          });
        
          const response = await docClient.send(command);
          console.log(response);


        //   return response
        return [new Quest(response.Item)]
    }

    async putQuest(quest: Quest): Promise<boolean> {
        const date = new Date();
        // console.log(date.getTime());
        const command = new PutCommand({
            TableName: "quests",
            Item: {
                quest_id: 8,
                user_id: 1,
                content:  "1-0 퀘스트",
                completed: false,
                completedAt: null,
                from: date.getTime(),
                to: date.getTime()+86400
            }
        })

        //const response = await docClient.send(command);
        return 
    }

    async getAll(userId: number, limit: number): Promise<Quest[]> {

        const command = new QueryCommand ({
            TableName: "quests",
            KeyConditionExpression:
                "user_id = :user_id",
            ExpressionAttributeValues: {
                ":user_id": userId,
            },
            ConsistentRead: true,
            ScanIndexForward: false,
            Limit: limit
        });

        const response = await docClient.send(command);
        console.log(response)
        const quests = response.Items.map((item: Quest) => new Quest(item));
        console.log(quests);
        return quests;

    }
    
}
