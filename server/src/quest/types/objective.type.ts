export class Objective {
  constructor(obj?: any) {
    this.questId = obj?.quest_id;
    this.objectiveId = obj?.objective_id;
    this.content = obj?.content;
    this.maxProgress = obj?.max_progress;
  }

  questId: string;
  objectiveId: string;
  content: string;
  maxProgress: number;
}

export class UserObjective {
  constructor(obj?: any) {
    this.questId = obj?.quest_id;
    this.objectiveId = obj?.objective_id;
    this.userId = obj?.user_id;
    this.currentProgress = obj?.current_progress;
  }

  questId: string;
  objectiveId: string;
  userId: string;
  currentProgress: number;
}
