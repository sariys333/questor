export class Quest {
    constructor(obj?: any) {
        // = getSe(string i) getSe(undefined i) i가 없어도 있으면 있는데로, undefined = 선언X
        this.questId = obj?.quest_id;
        this.userId = obj?.user_id;
        this.content = obj?.content;
        this.completed = obj?.completed;
        this.completedAt = obj?.completedAt;
        this.from = obj?.from;
        this.to = obj?.to;
    }

    questId: number;
    userId: number;
    content: string;
    completed: boolean;
    completedAt: Date;
    createdAt: Date;
    from: Date;
    to: Date;
}

export class CreateForm {
    constructor(userId: number, questId: number) {
        this.userId = userId
        this.questId = questId
    }

    questId: number
    userId: number
}

export class EditForm {
    constructor(obj?: any) {
        this.questId = obj?.questId
        this.userId = obj?.userId
        this.content = obj?.quest.content
        this.category = obj?.quest.category
        this.from = obj?.time[0].getTime()
        this.to = obj?.time[1].getTime()
    }

    questId: number
    userId: number
    content: string
    category: string
    from: Date
    to: Date

}
