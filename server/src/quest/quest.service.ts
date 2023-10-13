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
    const quests = response.Items.map((item: Quest) => new Quest(item));
    console.log("list quests", quests);
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
        from: form.from,
        to: form.to,
      },
    });
    console.log(form);
    //const response = await docClient.send(command);
    return;
  }
}
