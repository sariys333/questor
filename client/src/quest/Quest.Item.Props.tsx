
export type Quest = {
    userId: number,
    questId: number,
    content: string,
    completed: boolean,
    completedAt: null | number,
    from: number,
    to: number
}