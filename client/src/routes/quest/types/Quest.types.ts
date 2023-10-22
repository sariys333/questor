export type Quest = {
    questId: string;
    userId: string;
    category: Category;
    content: string;
    completed: boolean;
    completedAt: Date;
    createdAt: Date;
    from: Date;
    to: Date;
};

export type GetQuestListQuery = Pick<Quest, "userId">;

export type CreateQuestParams = Pick<
    Quest,
    "from" | "to"
> & { objectives: (Pick<Objective, "category" | "content" | "targetReps">)[] };

export type EditQuestParams = Pick<
    Quest,
    "content" | "from" | "to" | "category" | "questId"
>;

export enum Category {
    walk = "걷기",
    run = "달리기",
    gym = "헬스",
    study = "공부",
    read = "독서",
    etc = "ETC",
}

export const CategoryEmojiMap = new Map<Category, string>([
    [Category.walk, "🚶🏻"],
    [Category.run, "🏃🏿"],
    [Category.gym, "🏋🏽"],
    [Category.study, "📝"],
    [Category.read, "📖"],
    [Category.etc, "❔"],
]);

export type UserQuest = {
    questId: string;
    userId: string;
    completed: boolean;
    completedAt: Date;
    acceptedAt: Date;
    productorId: string;
};

export type Objective = {
    questId: string;
    objectId: string
    category: Category
    content: string
    targetReps: number
}

export type UserObjective = {
    objectId: string
    userId: string;
    completedAt: Date
    currentReps: number
}

export type EditableObjective = Partial<Pick<Objective, "category" | "content" | "targetReps"> & Pick<UserObjective, "currentReps" | "completedAt">>

export type QuestsAndIds = {
    questsId: string[]
    userQuests: UserQuest[]
}

export type QuestByPersonal = {
    quests: Quest[],
    userQuests: UserQuest[]
}



