export type Quest = {
    questId: string;
    userId: string;
    username: string;
    title: string;
    from: Date;
    to: Date;
    isPrivate: boolean;
    createdAt: Date;
};

export type UserQuest = {
    questId: string;
    userId: string;
    completed: boolean;
    completedAt: Date;
    acceptedAt: Date;
};

export type GetQuestListQuery = Pick<Quest, "userId">;

export type Objective = {
    questId: string;
    userId: string;
    objectiveId: string;
    category: string;
    content: string;
    currentReps: number;
    targetReps: number;
    completedAt: Date;
};

export type EditableObjective = Partial<
    Pick<
        Objective,
        | "questId"
        | "userId"
        | "objectiveId"
        | "category"
        | "content"
        | "targetReps"
        | "currentReps"
        | "completedAt"
    >
>;

export type QuestsAndIds = {
    questsId: string[];
    userQuests: Partial<Quest[]>;
};

export type QuestByPersonal = {
    quests: Quest[];
    userQuests: Partial<Quest[]>;
};

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

export type UserQuestDetail = Quest & UserQuest & { objectives: Objective[] };

export type QuestDetail = Quest & Objective[];

export type CreateQuestParam = Pick<Quest, "to" | "from" | "title"> & {
    objectives: Pick<Objective, "category" | "content" | "targetReps">[];
};

export type UserObjective = Pick<
    Objective,
    "currentReps" | "userId" | "objectiveId" | "completedAt" | "questId"
>;
