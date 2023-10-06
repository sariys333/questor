import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { QuestService } from './quest.service';
import { Quest } from './types/quest.type';

@Controller('quest') // /quest 로 시작하는 uri 를 처리
export class QuestController {

    constructor(private readonly questService: QuestService) { }

    @Get("/list") // /quest/{id}/list GET
    async getQuestList(@Query("page") page, @Query("pageSize") pageSize): Promise<Quest[]> {
        // console.log("limit - "+limit)]
        console.log(page, pageSize)
        // this.questService.getList(userId)
        // this.questService.putQuest(new Quest())
        return await this.questService.getAll();
    }

    

}
