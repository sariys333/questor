import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { Public } from "src/auth/public.decorator";
import { User, UserCredentials } from "src/user/types/user.type";
import { User as ReqUser } from "src/user/user.decorator";
import { QuestService } from "./quest.service";
import { CreateQuestParams, Quest, QuestByPersonal } from "./types/quest.type";
import Item from 'antd/es/list/Item';

@Controller("api/quest")
export class QuestController {
    constructor(private readonly questService: QuestService) { }

    @Public()
    @Get("/list")
    async getQuestList(): Promise<Quest[]> {
        return await this.questService.getQuests();
    }

    @Post("/create")
    async createQuest(@ReqUser() user: User, @Body() params: CreateQuestParams) {
        await this.questService.createObjectives({ user, params })
        return await this.questService.createQuest({ user, params });
    }

    @Public()
    @Get("detail/:questId")
    async getQuestById(@Param("questId") questId: string) {
        return await this.questService.getQuestById(questId);
    }

    @Post("edit")
    async editQuest(@Body() form: Quest) {
        return await this.questService.editQuest(form);
    }

    @Post("/list")
    async getQuestListByUserId(@Body() user: UserCredentials): Promise<Quest[]> {
        return await this.questService.getQuestsByUserId(user.userId);
    }

    @Post("/personal")
    async getQuestsByPersonal(@Body() user: UserCredentials): Promise<QuestByPersonal[]> {
        console.log("personal \n")
        const questsAndIds = await this.questService.getUserQuestsId(user.userId);
        const quests = await this.questService.getUserQuests(questsAndIds.questsId);

        const mergeQuests: QuestByPersonal[] = [...questsAndIds.userQuests, ...quests];

        const questData = Array.from(new Set(mergeQuests.map(item => item.questId + item.userId)))
            .map(key => mergeQuests.find(item => (item.questId + item.userId) === key));

        return questData
    }

}
