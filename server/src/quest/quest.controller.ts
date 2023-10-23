import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { Public } from "src/auth/public.decorator";
import { User, UserCredentials } from "src/user/types/user.type";
import { User as ReqUser } from "src/user/user.decorator";
import { QuestService } from "./quest.service";
import {
  CreateObjParam,
  CreateQuestParams,
  Quest,
  QuestByUser,
  QuestObj,
} from "./types/quest.type";

@Controller("api/quest")
export class QuestController {
  constructor(private readonly questService: QuestService) {}

  // 전체 퀘스트 목록
  @Public()
  @Get("/list")
  async getQuestList(): Promise<Quest[]> {
    return await this.questService.getQuests();
  }

  // 퀘스트 생성
  // user_quests, objectieves, user_objectives
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

  // 퀘스트 상세페이지 + objectives
  @Public()
  @Get("detail/:questId")
  async getQuestById(@Param("questId") questId: string) {
    const quest = await this.questService.getQuestById(questId);
    const objectives = await this.questService.getObjectivesByQuest(questId);

    return {
      quest: quest,
      objectives: objectives,
    };
  }

  @Post("edit")
  async editQuest(@Body() form: Quest) {
    return await this.questService.editQuest(form);
  }

  // id에 해당하는 퀘스트 목록
  @Post("/list")
  async getQuestListByUserId(@Body() user: UserCredentials) {
    const quests = await this.questService.getQuestsByUserId(user.userId);

    const userQuestsObject = {};
    if (quests) {
      // 유저 퀘스트 가져오기
      const userQuest = await this.questService.getUserQuests(user.userId);
      // 퀘스트에서 id값만 꺼내기
      const questIds = quests.map((item: QuestByUser) => item.questId);
      // 꺼낸 id값들로 objectives 가져오기
      const questObjectives =
        await this.questService.getObjectivesByIds(questIds);

      quests.forEach((quest) => {
        const { questId, ...questItem } = quest;
        userQuestsObject[questId] = { ...questItem, objectives: {} };
      });

      questObjectives.forEach((objective) => {
        const { objectiveId, questId, ...objItem } = objective;
        if (userQuestsObject[questId] && userQuestsObject[questId].objectives) {
          userQuestsObject[questId].objectives[objectiveId] = {
            ...objItem,
          };
        }
      });

      userQuest.forEach((userQuestItem) => {
        const { questId, ...userQuestRest } = userQuestItem;
        if (userQuestsObject[questId]) {
          userQuestsObject[questId] = {
            ...userQuestsObject[questId],
            ...userQuestRest,
          };
        }
      });

      console.log(userQuestsObject);
    }

    return userQuestsObject;
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

// @Get("userQuest/:questId")
// async getUserQuestById(
//   @Param("questId") questId: string,
//   @ReqUser() user: User,
// ) {
//   console.log("detail", user);
//   const userObj = await this.questService.getObjectivesByUser({
//     questId,
//     user,
//   });
//   const objectiveIds: string[] = userObj.map((item) => item.objectiveId);
//   const obj = await this.questService.getObjectivesByIds(objectiveIds);

//   console.log("objectiveIds", objectiveIds);
//   console.log("obj", obj);

//   const userObjectives: Objective[] = [...userObj, ...obj];

//   console.log("userObjectives", userObjectives);

//   const objectiveDatas = [
//     ...userObjectives
//       .reduce((map, obj) => map.set(obj.objectiveId, obj), new Map())
//       .values(),
//   ];
//   const quest = await this.questService.getQuestById(questId);

//   console.log("ojdata", objectiveDatas);

//   return {
//     quest: quest,
//     objectives: objectiveDatas,
//   };
// }

// @Post("/personal")
// async getQuestsByPersonal(
//   @Body() user: UserCredentials,
// ): Promise<QuestByPersonal[]> {
//   const questsAndIds = await this.questService.getUserQuests(user.userId);
//   const quests = await this.questService.getUserQuests(questsAndIds.questsId);

//   const uesrQuests: QuestByPersonal[] = [
//     ...questsAndIds.userQuests,
//     ...quests,
//   ];

//   const questData = Array.from(
//     new Set(uesrQuests.map((item) => item.questId + item.userId)),
//   ).map((key) =>
//     uesrQuests.find((item) => item.questId + item.userId === key),
//   );

//   return questData;
// }
