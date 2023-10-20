export class Quest {
    constructor(obj?: any) {
        this.questId = obj?.quest_id;
        this.userId = obj?.user_id;
        this.from =
            (obj && typeof obj.from == "string") ||
                (obj && typeof obj.from == "number")
                ? new Date(obj?.from).getTime()
                : null;
        this.to =
            (obj && typeof obj.to == "string") || (obj && typeof obj.to == "number")
                ? new Date(obj?.to).getTime()
                : null;
        this.createdAt =
            obj && obj.created_at instanceof Date
                ? obj?.created_at.getTime()
                : new Date().getTime();
        this.isPublic = obj?.isPublic
    }

    questId: string;
    userId: string;
    createdAt: Date | number;
    from: Date | number;
    to: Date | number;
    isPublic: boolean;

    asObj() {
        return Object.assign({
            user_id: this.userId,
            quest_id: this.questId,
            created_at: this.createdAt,
            from: this.from,
            to: this.to,
            isPublic: this.isPublic,
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

export type CreateQuestParams = Pick<Quest, "from" | "to">;

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
    questsId: string[]
    userQuests: QuestByPersonal[]
}

export class QuestByPersonal {

    constructor(obj?: any) {
        this.questId = obj?.quest_id;
        this.userId = obj?.user_id;
        this.from =
            (obj && typeof obj.from == "string") ||
                (obj && typeof obj.from == "number")
                ? new Date(obj?.from).getTime()
                : null;
        this.to =
            (obj && typeof obj.to == "string") || (obj && typeof obj.to == "number")
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
}
