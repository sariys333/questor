import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { QuestService } from './quest.service';
import { Quest } from './types/quest.type';
import { Public } from 'src/auth/public.decorator';
import { User } from 'src/user/types/user.type';
import { User as ReqUser } from 'src/user/user.decorator';

@Controller('api/quest') // /quest 로 시작하는 uri 를 처리
export class QuestController {

    constructor(private readonly questService: QuestService) { }

    @Public()
    @Get("/list") // /quest/{id}/list GET
    async getQuestList(@ReqUser() user: User, @Query("page") page, @Query("pageSize") pageSize): Promise<Quest[]> {
        // console.log("limit - "+limit)]
        console.log(page, pageSize)
        // this.questService.getList(userId)
        // this.questService.putQuest(new Quest())
        return await this.questService.getAll();
    }

    @Post("/create")
    createQuest(@ReqUser() user: User, @Body() quest: Quest) {
        console.log(user)
        console.log(quest) 
    }



}
