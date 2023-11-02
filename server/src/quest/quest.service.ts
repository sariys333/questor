import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    DeleteCommand,
    DynamoDBDocumentClient,
    PutCommand,
    ScanCommand
} from "@aws-sdk/lib-dynamodb";
import { Injectable } from "@nestjs/common";
import { User, UserCredentials } from "src/user/types/user.type";
import { v4 as uuidv4 } from "uuid";
import {
    CreateObjParams,
    CreateQuestParams,
    CreateUserObjParams,
    EditObjParams,
    EditQuestParams,
    Objective,
    Quest,
    UserObjective,
    UserQuest,
    UserQuestDetail,
    UserQuestParmas,
} from "./types/quest.type";

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
        console.log(quests);

        return quests;
    }

    async getQuests(): Promise<UserQuestDetail[]> {
        const command = new ScanCommand({
            TableName: "quests",
            ConsistentRead: true,
        });

        const response = await docClient.send(command);
        const quests = response.Items.map((item) => new UserQuestDetail(item));
        return quests;
    }

    async deleteQuest({ questId, userId }: { questId: string, userId: string }): Promise<number> {
        const command = new DeleteCommand({
            TableName: "quests",
            Key: {
                quest_id: questId,
                user_id: userId
            },
        });

        const response = await docClient.send(command);
        console.log(response)
        return response.$metadata.httpStatusCode

    }

    async deleteUserQuest({ questId, userId }: { questId: string, userId: string }) {
        const command = new DeleteCommand({
            TableName: "user_quests",
            Key: {
                quest_id: questId,
                user_id: userId
            },
        });
        await docClient.send(command);
    }

    async deleteObjectives(questId: string): Promise<string[]> {
        const command = new ScanCommand({
            TableName: "objectives",
            FilterExpression: "quest_id = :questId",
            ExpressionAttributeValues: {
                ":questId": questId,
            },
        });
        const response = await docClient.send(command);
        const objectiveIds = response.Items.map((item) => item.objective_id)

        objectiveIds.forEach(async (id) => {
            const delCommand = new DeleteCommand({
                TableName: "objectives",
                Key: {
                    quest_id: questId,
                    objective_id: id
                }
            })
            await docClient.send(delCommand);
        })

        return objectiveIds
    }

    async deleteUserObjectives({ questId, objectiveIds }: { questId: string, objectiveIds: string[] }) {
        objectiveIds.forEach(async (id) => {
            const command = new DeleteCommand({
                TableName: "user_objectives",
                Key: {
                    objective_id: id,
                    quest_id: questId,
                }
            });
            const response = await docClient.send(command);
            console.log(response)

        })

        return
    }

    async createQuest(questParams: CreateQuestParams): Promise<{ result: string; questId: string }> {
        const questId: string = uuidv4();
        const quest = new Quest({
            ...questParams,
            user_id: questParams.userId,
            quest_id: questId,
        }).asObj();
        const command = new PutCommand({
            TableName: "quests",
            Item: quest,
        });

        const response = await docClient.send(command);

        if (response.$metadata.httpStatusCode === 200) {
            return {
                result: "ok",
                questId: questId,
            };
        }
    }

    async createUserQuest(params: UserQuestParmas) {
        const userQuest = new UserQuest({
            ...params,
            user_id: params.userId,
            quest_id: params.questId
        }).asObj();

        const command = new PutCommand({
            TableName: "user_quests",
            Item: userQuest,
        });

        await docClient.send(command);
    }

    async createObjectives(params: CreateObjParams): Promise<{ result: string, objectiveIds: string[] }> {
        console.log(params)
        const objectiveIds = []
        params.objectives.forEach(async (item) => {
            const objectiveId = uuidv4()
            objectiveIds.push(objectiveId)
            const objective = new Objective({
                quest_id: params.questId,
                user_id: params.userId,
                objective_id: objectiveId,
                ...item,
            }).asObj();
            console.log(objective)
            const command = new PutCommand({
                TableName: "objectives",
                Item: objective,
            });
            const response = await docClient.send(command);
        });

        return {
            result: "ok",
            objectiveIds: objectiveIds
        };
    }

    async createUserObjectives(params: CreateUserObjParams): Promise<{ result: string }> {
        params.objectiveIds.forEach(async (item) => {
            const objective = new UserObjective({
                quest_id: params.questId,
                user_id: params.userId,
                objective_id: item,
            }).asObj();
            const command = new PutCommand({
                TableName: "user_objectives",
                Item: objective,
            });
            await docClient.send(command);
        });

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

    async getUserQuestByQuestId({
        questId,
        user,
    }: {
        questId: string;
        user: User;
    }): Promise<UserQuest> {
        const { userId } = user;
        const command = new ScanCommand({
            TableName: "user_quests",
            FilterExpression: "quest_id = :questId AND user_id = :userId",
            ExpressionAttributeValues: {
                ":questId": questId,
                ":userId": userId,
            },
        });

        const response = await docClient.send(command);
        return new UserQuest(response.Items[0]);
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

    async getUserObjectivesByQuest({
        questId,
        user,
    }: {
        questId: string;
        user: User | UserCredentials;
    }): Promise<UserObjective[]> {
        const { userId } = user;
        const command = new ScanCommand({
            TableName: "user_objectives",
            FilterExpression: "quest_id = :questId AND user_id = :userId",
            ExpressionAttributeValues: {
                ":questId": questId,
                ":userId": userId,
            },
        });

        const response = await docClient.send(command);
        const obejctives = response.Items.map((obj) => new UserObjective(obj));

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

        return objectives;
    }

    async increaseObjectiveReps({ objective, user }: { objective: UserObjective, user: User }): Promise<UserObjective> {
        const { objectiveId, userId } = objective;

        const scanCmd = new ScanCommand({
            TableName: "objectives",
            FilterExpression: "objective_id = :objectiveId",
            ExpressionAttributeValues: {
                ":objectiveId": objectiveId,
            }
        })

        const scanRes = await docClient.send(scanCmd);
        const questObjective = scanRes.Items[0];

        console.log(scanRes)

        const command = new ScanCommand({
            TableName: "user_objectives",
            FilterExpression: "objective_id = :objectiveId AND user_id = :userId",
            ExpressionAttributeValues: {
                ":objectiveId": objectiveId,
                ":userId": userId
            },
        });
        const response = await docClient.send(command);
        const item = response.Items[0];
        const incresed = item.current_reps + 1

        console.log("scand", questObjective)

        const userObjective = new UserObjective({
            ...item,
            current_reps: incresed,
            completed_at:
                incresed === questObjective.target_reps
                    ? new Date().getTime()
                    : null,
            completed: incresed === questObjective.target_reps
                ? true
                : false,
        }).asObj();

        console.log("new", userObjective)

        const putCommand = new PutCommand({
            TableName: "user_objectives",
            Item: userObjective,
        });

        const putResponse = await docClient.send(putCommand);
        console.log(putResponse);

        const updated = new UserObjective(userObjective);
        console.log("updated", updated)

        if (putResponse.$metadata.httpStatusCode === 200) {
            return updated;
        }
    }

    async completeQuest({ quest, userId }: { quest: Quest; userId: string }) {
        console.log(quest);

        const completedQuest = new UserQuest({
            user_id: quest.userId,
            quest_id: quest.questId,
            completed: true,
            completed_at: new Date(),
        }).asObj();

        console.log(completedQuest);

        const putCommand = new PutCommand({
            TableName: "user_quests",
            Item: completedQuest,
        });

        const response = await docClient.send(putCommand);
        if (response.$metadata.httpStatusCode === 200) {
            return completedQuest
        }

    }

    async getUserObjectivesByIds({
        questIds,
        userId,
    }: {
        questIds: string[];
        userId: string;
    }): Promise<UserObjective[]> {
        // const expressionAttributeValues = {};
        // const questIdParams = questIds
        //     .map((u, i) => {
        //         const questParam = `:q${i}`;
        //         expressionAttributeValues[questParam] = u;
        //         return questParam;
        //     })
        //     .join(",");
        // expressionAttributeValues[":userId"] = userId;
        // const command = new ScanCommand({
        //     TableName: "user_objectives",
        //     FilterExpression: `user_id = :userId AND quest_id In (${questIdParams})`,
        //     ExpressionAttributeValues: expressionAttributeValues,
        // });

        const command = new ScanCommand({
            TableName: "user_objectives",
            FilterExpression: `user_id = :userId`,
            ExpressionAttributeValues: {
                ":userId": userId
            }
        });
        const response = await docClient.send(command);
        const objectives = response.Items.map(
            (item: UserObjective) => new UserObjective(item),
        );

        return objectives;
    }

    async editQuest(params: EditQuestParams): Promise<boolean> {
        console.log(params)
        const quest = new Quest({
            ...params,
            quest_id: params.questId,
            user_id: params.userId
        }).asObj();
        console.log("?", quest)
        const command = new PutCommand({
            TableName: "quests",
            Item: quest
        });

        const response = await docClient.send(command)
        if (response.$metadata.httpStatusCode === 200) {
            return true
        }
        return false
    }

    async editQuestObjectives(params: EditObjParams): Promise<string[]> {
        console.log(params)
        const objectiveIds = []
        params.objectives.forEach(async (obj) => {
            const { objectiveId, ...others } = obj;
            const uuid = uuidv4();
            if (!objectiveId) objectiveIds.push(uuid)
            const objective = new Objective({
                quest_id: params.questId,
                user_id: params.userId,
                objective_id: objectiveId ? objectiveId : uuid,
                ...others,
            }).asObj();

            const command = new PutCommand({
                TableName: "objectives",
                Item: objective
            });

            const response = await docClient.send(command)

            if (response.$metadata.httpStatusCode !== 200) {
                return;
            }

        })

        return objectiveIds
    }

    async getUserQuests(userId: string): Promise<UserQuest[]> {
        const command = new ScanCommand({
            TableName: "user_quests",
            FilterExpression: "user_id = :userId",
            ExpressionAttributeValues: {
                ":userId": userId,
            },
        });
        const response = await docClient.send(command);
        const userQuests = response.Items.map((item) => new UserQuest(item));

        return userQuests;
    }

    async getUsersInfo(userIds: string[]): Promise<User[]> {
        const idArray = [...new Set(userIds)];
        const expressionAttributeValues = {};
        const userIdParams = idArray
            .map((u, i) => {
                const userParam = `:u${i}`;
                expressionAttributeValues[userParam] = u;
                return userParam;
            })
            .join(",");
        const command = new ScanCommand({
            TableName: "users",
            FilterExpression: `user_id In (${userIdParams})`,
            ExpressionAttributeValues: expressionAttributeValues,
        });

        const response = await docClient.send(command);

        const users = response.Items.map((item) => new User(item));

        return users;
    }

    async getUserInfo(userId: string): Promise<User> {
        const command = new ScanCommand({
            TableName: "users",
            FilterExpression: "user_id = :userId",
            ExpressionAttributeValues: {
                ":userId": userId,
            },
        });

        const response = await docClient.send(command);

        return new User(response.Items[0]);
    }
}
