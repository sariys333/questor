export type Quest = {
    questId: number
    userId: number
    content: string
    completed: boolean
    completedAt: Date
    createdAt: Date
    from: Date
    to: Date
}

export type GetQuestListQuery = Pick<Quest, "userId">

export class Category {

    constructor() {
        this.walk = "🚶🏻"
        this.run = "🏃🏿"
        this.gym = "🏋🏽"
        this.study = "📝"
        this.read = "📖"
    }
    
    walk: string
    run: string
    gym: string
    study: string
    read: string

}

