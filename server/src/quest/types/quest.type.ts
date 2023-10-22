export class Quest {
  constructor(obj?: any) {
    this.questId = obj?.quest_id;
    this.userId = obj?.user_id;
    this.from =
      obj && (typeof obj.from == "string" || typeof obj.from == "number")
        ? new Date(obj?.from).getTime()
        : null;
    this.to =
      obj && (typeof obj.to == "string" || typeof obj.to == "number")
        ? new Date(obj?.to).getTime()
        : null;
    this.createdAt =
      obj && obj.created_at instanceof Date
        ? obj?.created_at.getTime()
        : new Date().getTime();
    this.isPrivate = obj?.is_private;
  }

  questId: string;
  userId: string;
  createdAt: Date | number;
  from: Date | number;
  to: Date | number;
  isPrivate: boolean;

  asObj() {
    return Object.assign({
      user_id: this.userId,
      quest_id: this.questId,
      created_at: this.createdAt,
      from: this.from,
      to: this.to,
      is_private: this.isPrivate,
    });
  }
}

export class UserQuest {
  constructor(obj?: any) {
    this.questId = obj?.quest_id;
    this.userId = obj?.user_id;
    this.completed = obj?.completed || false;
    this.completedAt =
      obj && obj.completed_at instanceof Date
        ? obj?.completed_at.getTime()
        : null;
    this.acceptedAt = obj?.accepted_at;
    this.productorId = obj?.productor_id;
  }

  questId: string;
  userId: string;
  completed: boolean;
  completedAt: Date | number;
  acceptedAt: Date | number;
  productorId: string;

  asObj() {
    return Object.assign({
      user_id: this.userId,
      quest_id: this.questId,
      completed: this.completed,
      completed_at: this.completedAt,
      accepted_at: this.acceptedAt,
      productor_id: this.productorId,
    });
  }
}

export type GetQuestListQuery = Pick<Quest, "userId">;

export type CreateQuestParams = Pick<Quest, "from" | "to"> & {
  objectives: Pick<Objective, "category" | "content" | "targetReps">[];
};

export class CreateForm {
  constructor(userId: number, questId: number) {
    this.userId = userId;
    this.questId = questId;
  }

  questId: number;
  userId: number;
}

export class EditForm {
  constructor(obj?: any) {
    this.questId = obj?.questId;
    this.userId = obj?.userId;
    this.from = obj?.time[0].getTime();
    this.to = obj?.time[1].getTime();
  }

  questId: number;
  userId: number;
  from: Date;
  to: Date;
}

export type QuestsAndIds = {
  questsId: string[];
  userQuests: QuestByPersonal[];
};

export class QuestByPersonal {
  constructor(obj?: any) {
    this.questId = obj?.quest_id;
    this.userId = obj?.user_id;
    this.from =
      obj && (typeof obj.from == "string" || typeof obj.from == "number")
        ? new Date(obj?.from).getTime()
        : null;
    this.to =
      obj && (typeof obj.to == "string" || typeof obj.to == "number")
        ? new Date(obj?.to).getTime()
        : null;
    this.createdAt =
      obj && obj.created_at instanceof Date
        ? obj?.created_at.getTime()
        : new Date().getTime();
    this.completed = obj?.completed || false;
    this.completedAt =
      obj && obj.completed_at instanceof Date
        ? obj?.completed_at.getTime()
        : null;
    this.acceptedAt = obj?.accepted_at;
    this.productorId = obj?.productor_id;
    this.isPublic = obj?.isPublic || false;
    this.objectives = obj?.objectives;
  }

  questId: string;
  userId: string;
  createdAt: Date | number;
  from: Date | number;
  to: Date | number;
  isPublic: boolean;
  completed: boolean;
  completedAt: Date | number;
  acceptedAt: Date | number;
  productorId: string;
  objectives: {
    objectiveId: string;
    category: string;
    content: string;
    targetReps: number;
    currentReps: number;
    completedObjAt: Date | number;
  }[];
}

export class Objective {
  constructor(obj?: any) {
    this.questId = obj?.quest_id;
    this.userId = obj?.user_id;
    this.objectiveId = obj?.objective_id;
    this.category = obj?.category;
    this.content = obj?.content;
    this.targetReps = obj?.targetReps || obj?.target_reps;
    this.currentReps = obj?.current_reps || 0;
    this.completedAt = obj?.completed_at || null;
  }

  questId: string;
  userId: string;
  objectiveId: string;
  category: string;
  content: string;
  targetReps: number;
  currentReps: number;
  completedAt: Date | number;

  asObj() {
    return {
      quest_id: this.questId,
      user_id: this.userId,
      objective_id: this.objectiveId,
      category: this.category,
      content: this.content,
      target_reps: this.targetReps,
      current_reps: this.currentReps,
      completed_at: this.completedAt,
    };
  }
}

export type CreateObjParam = Pick<
  Objective,
  "category" | "content" | "targetReps"
>;
