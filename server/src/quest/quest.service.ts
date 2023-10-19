import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import { Injectable } from "@nestjs/common";
import { CreateQuestParams, Quest } from "./types/quest.type";
import { v4 as uuidv4 } from "uuid";
import { User } from "src/user/types/user.type";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

@Injectable()
export class QuestService {
  async getQuestsByUserId(uesrId: string): Promise<Quest[]> {
    const command = new ScanCommand({
      TableName: "quests",
      FilterExpression: "user_id = :uesrId",
      ExpressionAttributeValues: {
        ":uesrId": uesrId,
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
}
