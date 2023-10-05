import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { QuestService } from './quest.service';
import { Quest } from './types/quest.type';

@Controller('quest') // /quest 로 시작하는 uri 를 처리
export class QuestController {

    constructor(private readonly questService: QuestService) {}

    @Get(":id/list") // /quest/{id}/list GET
    async getQuestList(@Param("id") userId, @Query("limit") limit): Promise<Quest[]> {
        console.log("limit - "+limit)
        // this.questService.getList(userId)
        // this.questService.putQuest(new Quest())
        return await this.questService.getAll(parseInt(userId, 10), parseInt(limit, 10));
    }
}
