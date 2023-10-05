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
