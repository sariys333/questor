export type Quest = {
    questId: string
    userId: string
    category: Category
    content: string
    completed: boolean
    completedAt: Date
    createdAt: Date
    from: Date
    to: Date
}

export type GetQuestListQuery = Pick<Quest, "userId">

export type CreateQuestParams = Pick<Quest, "content" | "from" | "to" | "category">

export type EditQuestParams = Pick<Quest, "content" | "from" | "to" | "category" | "questId">

export enum Category {
    walk="걷기",
    run="달리기",
    gym="헬스",
    study="공부",
    read="독서",
    etc="etc"
}

export const CategoryEmojiMap = new Map<Category, string>([
    [Category.walk, "🚶🏻"],
    [Category.run, "🏃🏿"],
    [Category.gym, "🏋🏽"],
    [Category.study, "📝"],
    [Category.read, "📖"],
    [Category.etc, "❔"],
])