import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { Public } from "src/auth/public.decorator";
import { User, UserCredentials } from "src/user/types/user.type";
import { User as ReqUser } from "src/user/user.decorator";
import { QuestService } from "./quest.service";
import {
    CreateObjParam,
    CreateQuestParams,
    Quest
} from "./types/quest.type";

@Controller("api/quest")
export class QuestController {
    constructor(private readonly questService: QuestService) { }

    // 전체 퀘스트 목록
    @Public()
    @Get("/list")
    async getQuestList(): Promise<Quest[]> {
        return await this.questService.getQuests();
    }

    // 퀘스트 생성
    @Post("/create")
    async createQuest(
        @ReqUser() user: User,
        @Body()
        {
            params,
            objectives,
        }: { params: CreateQuestParams; objectives: CreateObjParam[] },
    ) {
        console.log("params", params);
        console.log("objectives", objectives);
        const response = await this.questService.createQuest({ user, params });
        if (response.result == "ok") {
            const questId: string = response.questId;
            await this.questService.createUserQuest({ user, questId });
            await this.questService.createObjectives({ user, questId, objectives });
        }
        return;
    }

    // 퀘스트 상세페이지
    @Public()
    @Get("detail/:questId")
    async getQuestById(@Param("questId") questId: string) {
        const quest = await this.questService.getQuestById(questId);
        const user = await this.questService.getUserInfo(quest.userId);
        const objectives = await this.questService.getObjectivesByQuest(questId);

        const questObjectives = {
            ...quest,
            objectives: objectives,
            masterId: user.userId,
            mastername: user.username,
        }

        console.log(questObjectives)

        return questObjectives
    }

    @Post("edit")
    async editQuest(@Body() form: Quest) {
        return await this.questService.editQuest(form);
    }

    @Post("/list")
    async getQuestListByUserId(@Body() user: UserCredentials) {
        const quests = await this.questService.getQuestsByUserId(user.userId);

        const userQuestsObject = {};
        if (quests) {
            const userIds = quests.map(item => item.userId);
            const userInfo = await this.questService.getUsersInfo(userIds);
            const userQuest = await this.questService.getUserQuests(user.userId);
            const questIds = quests.map(item => item.questId);
            const questObjectives =
                await this.questService.getObjectivesByIds(questIds);
            const userObjectives = await this.questService.getUserObjectivesByIds({
                questIds,
                user,
            });

            quests.forEach((quest) => {
                const { questId, ...questItem } = quest;
                const user = userInfo.find((user) => quest.userId === user.userId)
                userQuestsObject[questId] = { questId, ...questItem, masterId: questItem.userId, mastername: user.username, objectives: {} };
            });

            questObjectives.forEach((objective) => {
                const { objectiveId, questId, ...objItem } = objective;
                if (userQuestsObject[questId] && userQuestsObject[questId].objectives) {
                    userQuestsObject[questId].objectives[objectiveId] = {
                        objectiveId,
                        ...objItem,
                    };
                }
            });

            userQuest.forEach((userQuest) => {
                const { questId, ...userQuestItem } = userQuest;
                if (userQuestsObject[questId]) {
                    userQuestsObject[questId] = {
                        ...userQuestsObject[questId],
                        ...userQuestItem,
                    };
                }
            });

            userObjectives.forEach((userObjs) => {
                const { objectiveId, questId, ...userObjItem } = userObjs;
                if (
                    userQuestsObject[questId] &&
                    userQuestsObject[questId].objectives[objectiveId]
                ) {
                    userQuestsObject[questId].objectives[objectiveId] = {
                        ...userQuestsObject[questId].objectives[objectiveId],
                        currentReps: userObjItem.currentReps,
                        userId: userObjItem.userId,
                        completedAt: userObjItem.completedAt,
                    };
                }
            });

            console.log(userQuestsObject);
        }

        return Object.values(userQuestsObject);
    }

    // 해당 퀘스트 진행자의 user_objectives
    @Get("/:questId/objectives")
    async getObjectivesByQuest(
        @Param("questId") questId: string,
        @ReqUser() user: User,
    ) {
        return await this.questService.getObjectivesByUser({ questId, user });
    }
}
