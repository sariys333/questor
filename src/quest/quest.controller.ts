import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { QuestService } from './quest.service';
import { Quest } from './types/quest.type';

@Controller('quest') // /quest 로 시작하는 uri 를 처리
export class QuestController {

    constructor(private readonly questService: QuestService) {}

    @Get("list") // /quest/list GET
    async getQuestList(): Promise<Quest[]> {
        this.questService.getAll(1, 5)
        //this.questService.putQuest(new Quest())
        return await this.questService.getList();
    }

    // @Get() // /quest?id={questId}
    // getQuestByIdQuery(@Query("id") questId: string): string {
    //     return this.questService.getHello();
    // }

    // @Get(":questId") // /quest/{questId}
    // getQuestByIdParam(@Param("questId") questId: string): string {
    //     return this.questService.getHello();
    // }

    // @Post("create")
    // getQuestCreate(@Body() body: any): boolean {


    //     return true
    // }
}
