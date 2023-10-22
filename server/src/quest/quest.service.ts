import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    DynamoDBDocumentClient,
    PutCommand,
    ScanCommand
} from "@aws-sdk/lib-dynamodb";
import { Injectable } from "@nestjs/common";
import { User } from "src/user/types/user.type";
import { v4 as uuidv4 } from "uuid";
import { CreateQuestParams, Objective, Quest, QuestByPersonal, QuestsAndIds, UserQuest } from './types/quest.type';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

@Injectable()
export class QuestService {
    async getQuestsByUserId(userId: string): Promise<Quest[]> {
        const command = new ScanCommand({
            TableName: "quests",
            FilterExpression: "user_id = :userId",
            ExpressionAttributeValues: {
                ":userId": userId,
            },
        });

        const response = await docClient.send(command);
        const quests = response.Items.map((item: Quest) => new Quest(item));
        return quests;
    }

    async createQuest({
        user,
        params,
    }: {
        user: User;
        params: CreateQuestParams;
    }): Promise<any> {
        // console.log(date.getTime());
        const quest = new Quest({
            ...params,
            quest_id: uuidv4(),
            user_id: user.userId,
        }).asObj();
        const command = new PutCommand({
            TableName: "quests",
            Item: quest,
        });

        const response = await docClient.send(command);
        return {
            result: "ok",
        };
    }

    async getQuests(): Promise<Quest[]> {
        const command = new ScanCommand({
            TableName: "quests",
            ConsistentRead: true,
        });

        const response = await docClient.send(command);
        const quests = response.Items.map((item: Quest) => new Quest(item));
        return quests;
    }

    async createObjectives({
        user,
        params,
    }: {
        user: User;
        params: CreateQuestParams;
    }): Promise<any> {
        console.log("obj")
        console.log(params)

        // const command = new PutCommand({
        //     TableName: "quests",
        //     Item: quest,
        // });

        // const response = await docClient.send(command);
        // return {
        //     result: "ok",
        // };

    }

    async getQuestById(questId: string): Promise<Quest> {
        const command = new ScanCommand({
            TableName: "quests",
            FilterExpression: "quest_id = :questId",
            ExpressionAttributeValues: {
                ":questId": questId,
            },
        });

        const response = await docClient.send(command);
        return new Quest(response.Items[0]);
    }

    async editQuest(form: Quest): Promise<boolean> {
        console.log(form.from);
        console.log(form.to);
        const command = new PutCommand({
            TableName: "quests",
            Item: {
                quest_id: form.questId,
                from: form.from,
                to: form.to,
            },
        });
        return;
    }

    async getUserQuestsId(userId: string): Promise<QuestsAndIds> {
        console.log(userId)
        const command = new ScanCommand({
            TableName: "user_quests",
            FilterExpression: "user_id = :userId",
            ExpressionAttributeValues: {
                ":userId": userId
            },
        })
        const response = await docClient.send(command);
        console.log(response.Items)
        const questsId: string[] = response.Items.map((item) => item.quest_id)
        console.log(questsId)
        const userQuests = response.Items.map((item) => new QuestByPersonal(item))

        return {
            questsId: questsId,
            userQuests: userQuests
        }
    }

    async getUserQuests(questsId: string[]): Promise<QuestByPersonal[]> {
        console.log(questsId)
        const expressionAttributeValues = {};
        const questIdParams = questsId.map((u, i) => {
            const questParam = `:quest${i}`;
            expressionAttributeValues[questParam] = u;
            return questParam;
        }).join(',')
        console.log(questIdParams)
        console.log(expressionAttributeValues)

        const command = new ScanCommand({
            TableName: "quests",
            FilterExpression: `quest_id IN (${questIdParams})`,
            ExpressionAttributeValues:
                expressionAttributeValues,

        })
        const response = await docClient.send(command);
        console.log(response)
        const quests = response.Items.map((item) => new QuestByPersonal(item));

        return quests;
    }


}


