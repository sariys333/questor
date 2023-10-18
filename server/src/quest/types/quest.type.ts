import { UserCredentials } from '../../user/types/user.type';
export class Quest {
    constructor(obj?: any) {
        // = getSe(string i) getSe(undefined i) i가 없어도 있으면 있는데로, undefined = 선언X
        this.questId = obj?.quest_id;
        this.userId = obj?.user_id;
        this.content = obj?.content;
        this.completed = obj?.completed || false;
        this.completedAt =
            obj && obj.completedAt instanceof Date
                ? obj?.completedAt.getTime()
                : null;
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
            obj && obj.createdAt instanceof Date
                ? obj?.createdAt.getTime()
                : new Date().getTime();
        this.category = obj?.category;
    }

    questId: string;
    userId: string;
    content: string;
    completed: boolean;
    category: Category;
    completedAt: Date | number;
    createdAt: Date | number;
    from: Date | number;
    to: Date | number;

    asObj() {
        return Object.assign({
            user_id: this.userId,
            quest_id: this.questId,
            content: this.content,
            completed: this.completed,
            category: this.category,
            completedAt: this.completedAt,
            createdAt: this.createdAt,
            from: this.from,
            to: this.to,
        });
    }
}

export enum Category {
    walk = "걷기",
    run = "달리기",
    gym = "헬스",
    study = "공부",
    read = "독서",
    etc = "etc",
}

export type GetQuestListQuery = Pick<Quest, "userId">;

export type CreateQuestParams = Pick<
    Quest,
    "content" | "from" | "to" | "category"
>;

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
        this.content = obj?.quest.content;
        this.category = obj?.quest.category;
        this.from = obj?.time[0].getTime();
        this.to = obj?.time[1].getTime();
    }

    questId: number;
    userId: number;
    content: string;
    category: string;
    from: Date;
    to: Date;
}


