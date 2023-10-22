import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { Public } from "src/auth/public.decorator";
import { User, UserCredentials } from "src/user/types/user.type";
import { User as ReqUser } from "src/user/user.decorator";
import { QuestService } from "./quest.service";
import {
  CreateObjParam,
  CreateQuestParams,
  Objective,
  Quest,
  QuestByPersonal,
} from "./types/quest.type";

@Controller("api/quest")
export class QuestController {
  constructor(private readonly questService: QuestService) {}

  @Public()
  @Get("/list")
  async getQuestList(): Promise<Quest[]> {
    return await this.questService.getQuests();
  }

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
    const questId = response.questId;
    await this.questService.createObjectives({ user, questId, objectives });
    return;
  }

  @Public()
  @Get("detail/:questId")
  async getQuestById(@Param("questId") questId: string, @ReqUser() user: User) {
    console.log(user);
    const userObj = await this.questService.getUserObjectivesByIds({
      questId,
      user,
    });
    const objectiveIds: string[] = userObj.map((item) => item.objectiveId);
    const obj = await this.questService.getObjectivesByIds(objectiveIds);

    // console.log("userObj", userObj);
    // console.log("obj", obj);

    const userObjectives: Objective[] = [...userObj, ...obj];

    console.log("userObjectives", userObjectives);

    const objectiveDatas = [
      ...userObjectives
        .reduce((map, obj) => map.set(obj.objectiveId, obj), new Map())
        .values(),
    ];
    const quest = await this.questService.getQuestById(questId);

    console.log("ojdata", objectiveDatas);

    return {
      quest: quest,
      objectives: objectiveDatas,
    };
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
  async getQuestsByPersonal(
    @Body() user: UserCredentials,
  ): Promise<QuestByPersonal[]> {
    const questsAndIds = await this.questService.getUserQuestsId(user.userId);
    const quests = await this.questService.getUserQuests(questsAndIds.questsId);

    const uesrQuests: QuestByPersonal[] = [
      ...questsAndIds.userQuests,
      ...quests,
    ];

    const questData = Array.from(
      new Set(uesrQuests.map((item) => item.questId + item.userId)),
    ).map((key) =>
      uesrQuests.find((item) => item.questId + item.userId === key),
    );

    return questData;
  }
}
