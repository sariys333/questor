import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    DynamoDBDocumentClient,
    GetCommand,
    PutCommand,
    ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import { Injectable } from "@nestjs/common";
import { Quest } from "./types/quest.type";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

@Injectable()
export class QuestService {
    async getList(uesrId: number): Promise<Quest[]> {
        const command = new GetCommand({
            TableName: "quests",
            Key: {
                user_id: uesrId,
            },
        });

        const response = await docClient.send(command);
        console.log(response);

        //   return response
        return [new Quest(response.Item)];
    }

    async putQuest(quest: Quest): Promise<boolean> {
        const date = new Date();
        // console.log(date.getTime());
        const command = new PutCommand({
            TableName: "quests",
            Item: {
                quest_id: 8,
                user_id: 1,
                content: "1-0 퀘스트",
                completed: false,
                completedAt: null,
                from: date.getTime(),
                to: date.getTime() + 86400,
            },
        });

        //const response = await docClient.send(command);
        return;
    }

    async getAll() // { page, pageSize }: { page: number, pageSize: number }
        : Promise<Quest[]> {
        // pageSize = 30
        // page = 2
        // 150
        // exclusiveStartKey

        const command = new ScanCommand({
            TableName: "quests",
            ConsistentRead: true,
        });

        const response = await docClient.send(command);
        console.log(response);
        const quests = response.Items.map((item: Quest) => new Quest(item));
        console.log(quests);
        return quests;
    }

    async getQuestById(questId: number): Promise<Quest> {
        const command = new ScanCommand({
            TableName: "quests",
            FilterExpression: "quest_id = :questId",
            ExpressionAttributeValues: {
                ":questId": 1,
            },
        });

        const response = await docClient.send(command);
        console.log(response);

        //   return response
        return new Quest(response.Items[0]);
    }

    async editQuest(form: Quest): Promise<boolean> {
        console.log(form.from);
        console.log(form.to);
        const command = new PutCommand({
            TableName: "quests",
            Item: {
                quest_id: form.questId,
                content: form.content,
                from: form.from.getTime(),
                to: form.to.getTime(),
            },
        });
        console.log(form)
        //const response = await docClient.send(command);
        return;
    }


}
