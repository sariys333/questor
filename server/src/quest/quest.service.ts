import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    DynamoDBDocumentClient,
    PutCommand,
    ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import { Injectable } from "@nestjs/common";
import { User, UserCredentials } from "src/user/types/user.type";
import { v4 as uuidv4 } from "uuid";
import {
    CreateObjParam,
    CreateQuestParams,
    Objective,
    Quest,
    UserQuest,
    UserQuestDetail,
} from "./types/quest.type";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

@Injectable()
export class QuestService {
    async getQuestsByUserId(userId: string): Promise<UserQuestDetail[]> {
        const command = new ScanCommand({
            TableName: "quests",
            FilterExpression: "user_id = :userId",
            ExpressionAttributeValues: {
                ":userId": userId,
            },
        });

        const response = await docClient.send(command);
        const quests = response.Items.map(
            (item: UserQuestDetail) => new UserQuestDetail(item),
        );
        return quests;
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

    async createQuest({
        user,
        params,
    }: {
        user: User;
        params: CreateQuestParams;
    }): Promise<{ result: string, questId: string }> {
        const questId: string = uuidv4();
        const quest = new Quest({
            ...params,
            quest_id: questId,
            user_id: user.userId,
        }).asObj();
        // console.log("quest", quest);
        const command = new PutCommand({
            TableName: "quests",
            Item: quest,
        });

        const response = await docClient.send(command);

        if (response) {
            return {
                result: "ok",
                questId: questId,
            };
        }
    }

    async createUserQuest({
        user,
        questId,
    }: {
        user: User;
        questId: string;
    }): Promise<any> {
        // console.log(user);
        // console.log(questId);

        const userQuest = new UserQuest({
            quest_id: questId,
            user_id: user.userId,
        }).asObj();

        const command = new PutCommand({
            TableName: "user_quests",
            Item: userQuest,
        });

        const response = await docClient.send(command);

        return;
    }

    async createObjectives({
        user,
        questId,
        objectives,
    }: {
        user: User;
        questId: string;
        objectives: CreateObjParam[];
    }): Promise<any> {
        objectives.forEach(async (item) => {
            const objective = new Objective({
                quest_id: questId,
                user_id: user.userId,
                objective_id: uuidv4(),
                ...item
            }).asObj();
            const command = new PutCommand({
                TableName: "objectives",
                Item: objective,
            });
            await docClient.send(command);
        })

        return {
            result: "ok",
        };
    }

    async getQuestById(questId: string): Promise<UserQuestDetail> {
        const command = new ScanCommand({
            TableName: "quests",
            FilterExpression: "quest_id = :questId",
            ExpressionAttributeValues: {
                ":questId": questId,
            },
        });

        const response = await docClient.send(command);
        return new UserQuestDetail(response.Items[0]);
    }

    async getObjectivesByQuest(questId: string): Promise<Objective[]> {
        const command = new ScanCommand({
            TableName: "objectives",
            FilterExpression: "quest_id = :questId",
            ExpressionAttributeValues: {
                ":questId": questId,
            },
        });

        const response = await docClient.send(command);
        const obejctives = response.Items.map((obj) => new Objective(obj));
        return obejctives;
    }

    async getObjectivesByUser({
        questId,
        user,
    }: {
        questId: string;
        user: User | UserCredentials;
    }): Promise<Objective[]> {
        const command = new ScanCommand({
            TableName: "user_objectives",
            FilterExpression: "quest_id = :questId AND user_id = :userId",
            ExpressionAttributeValues: {
                ":questId": questId,
                ":userId": user.userId,
            },
        });

        const response = await docClient.send(command);
        const obejctives = response.Items.map((obj) => new Objective(obj));

        // console.log(obejctives);

        return obejctives;
    }

    async getObjectivesByIds(questIds: string[]): Promise<Objective[]> {
        const expressionAttributeValues = {};
        const questIdParams = questIds
            .map((u, i) => {
                const questParam = `:q${i}`;
                expressionAttributeValues[questParam] = u;
                return questParam;
            })
            .join(",");
        const command = new ScanCommand({
            TableName: "objectives",
            FilterExpression: `quest_id IN (${questIdParams})`,
            ExpressionAttributeValues: expressionAttributeValues,
        });
        const response = await docClient.send(command);
        const objectives = response.Items.map(
            (item: Objective) => new Objective(item),
        );

        // console.log(objectives);

        return objectives;
    }

    async getUserObjectivesByIds({ questIds, user }: { questIds: string[], user: User | UserCredentials }): Promise<Objective[]> {
        const expressionAttributeValues = {};
        const questIdParams = questIds
            .map((u, i) => {
                const questParam = `:q${i}`;
                expressionAttributeValues[questParam] = u;
                return questParam;
            })
            .join(",");
        expressionAttributeValues[":userId"] = user.userId
        // console.log(expressionAttributeValues);
        const command = new ScanCommand({
            TableName: "user_objectives",
            FilterExpression: `user_id = :userId AND quest_id In (${questIdParams})`,
            ExpressionAttributeValues: expressionAttributeValues,
        })
        const response = await docClient.send(command);
        const objectives = response.Items.map(
            (item: Objective) => new Objective(item),
        );
        // console.log("userobje", objectives);

        return objectives;
    }

    async editQuest(form: Quest): Promise<boolean> {
        // console.log(form.from);
        // console.log(form.to);
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

    async getUserQuests(userId: string): Promise<UserQuestDetail[]> {
        // console.log(userId);
        const command = new ScanCommand({
            TableName: "user_quests",
            FilterExpression: "user_id = :userId",
            ExpressionAttributeValues: {
                ":userId": userId,
            },
        });
        const response = await docClient.send(command);
        // console.log(response);
        const userQuests = response.Items.map((item) => new UserQuestDetail(item));

        return userQuests;
    }

    async getUsersInfo(userIds: string[]): Promise<User[]> {
        // console.log(userIds)
        const idArray = [...new Set(userIds)];
        const expressionAttributeValues = {};
        const userIdParams = idArray
            .map((u, i) => {
                const userParam = `:u${i}`;
                expressionAttributeValues[userParam] = u;
                return userParam;
            })
            .join(",");
        // console.log(userIdParams)
        const command = new ScanCommand({
            TableName: "users",
            FilterExpression: `user_id In (${userIdParams})`,
            ExpressionAttributeValues: expressionAttributeValues,
        })

        const response = await docClient.send(command);

        // console.log(response)

        const users = response.Items.map((item) => new User(item))

        return users
    };

    async getUserInfo(userId: string): Promise<User> {
        const command = new ScanCommand({
            TableName: "users",
            FilterExpression: "user_id = :userId",
            ExpressionAttributeValues: {
                ":userId": userId
            },
        })

        const response = await docClient.send(command);

        return new User(response.Items[0]);
    };

}

