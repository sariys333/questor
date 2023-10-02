export class Quest {

    constructor(obj?: any) {
        this.questId = obj?.quest_id
        this.userId = obj?.user_id
        this.content = obj?.content
        this.completed = obj?.completed
        this.completedAt = obj?.completedAt
        this.from = obj?.from
        this.to = obj?.to
    }
    

    content: string = "say hello"
    completed: boolean = false
    completedAt: Date = new Date()
    createdAt: Date = new Date()
    userId: number = 0
    from: Date = new Date()
    to: Date = new Date()
    questId: number = 0
}
