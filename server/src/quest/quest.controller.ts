import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { Public } from "src/auth/public.decorator";
import { User } from "src/user/types/user.type";
import { User as ReqUser } from "src/user/user.decorator";
import { QuestService } from "./quest.service";
import { CreateQuestParams, Quest } from "./types/quest.type";

@Controller("api/quest")
export class QuestController {
    constructor(private readonly questService: QuestService) { }

    @Public()
    @Get("/list")
    async getQuestList(
        @ReqUser() user: User,
        @Query("page") page,
        @Query("pageSize") pageSize,
    ): Promise<Quest[]> {
        // console.log("limit - "+limit)]
        console.log(page, pageSize);
        // this.questService.getList(userId)
        // this.questService.putQuest(new Quest())
        return await this.questService.getAll();
    }

    @Post("/create")
    async createQuest(@ReqUser() user: User, @Body() params: CreateQuestParams) {
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
}
