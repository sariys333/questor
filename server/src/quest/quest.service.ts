import { Injectable } from '@nestjs/common';
import { Quest } from './types/quest.type';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient, GetCommand, QueryCommand, QueryCommandInput } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

@Injectable()
export class QuestService {

    async getList(): Promise<Quest[]> {
        const command = new GetCommand({
            TableName: "quests",
            Key: {
                user_id: 0,
                quest_id: 1
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
                quest_id: 5,
                user_id: 0,
                content:  "여섯번째 퀘스트",
                completed: false,
                completedAt: null,//date.getTime()
                from: date.getTime(),
                to: date.getTime()+106400
            }
        })

        //const response = await docClient.send(command);
        return 
    }

    async getAll(n1: number, n2: number): Promise<Quest[]> {
        const commandInput: QueryCommandInput = {
            TableName: "quests",
            KeyConditionExpression:
                "user_id = :user_id",
            ExpressionAttributeValues: {
                ":user_id": 0,
            },
            ConsistentRead: true,
            ScanIndexForward: false,
            Limit: 4,
            ExclusiveStartKey: {
                "user_id": 0,
                "quest_id": 3
            }
            
        }



        const command = new QueryCommand(commandInput);
        
        const response = await docClient.send(command);
        console.log(response);
        return null;
    }
    
}
