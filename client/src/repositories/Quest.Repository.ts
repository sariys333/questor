import {
    CreateQuestParams,
    EditableObjective,
    Objective,
    Quest,
    QuestByPersonal,
    UserQuestDetail,
} from "../routes/quest/types/Quest.types";
import { Repository } from "./Repository";

class QuestRepository extends Repository {
    constructor(protected readonly apiName: string) {
        super(apiName);
    }

    async getAll(): Promise<UserQuestDetail[]> {
        try {
            const response = await this.fetch(`${this.url}/list`, {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response;
        } catch (e) {
            return [];
        }
    }

    async create({
        params,
        objectives,
    }: {
        params: CreateQuestParams;
        objectives: EditableObjective[];
    }): Promise<{
        status: "ok" | "err";
        result: boolean;
        msg?: string;
    }> {
        console.log(params);
        console.log(objectives);
        try {
            const response = await this.fetch(`${this.url}/create`, {
                method: "post",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ params, objectives }),
            });
            if (response.statusCode == 401) {
                return {
                    status: "err",
                    result: false,
                    msg: "로그인이 필요한 서비스입니다.",
                };
            }
            if (response) {
                return {
                    status: "ok",
                    result: true,
                };
            }
        } catch (error) {
            console.error(error);
        }
        return {
            status: "err",
            result: false,
            msg: "퀘스트 생성에 실패하였습니다. 다시 시도해주세요.",
        };
    }

    async getQuestById(
        questId: string
    ): Promise<{ quest: Quest; objectives: EditableObjective[] } | undefined> {
        try {
            const response = await this.fetch(`${this.url}/detail/${questId}`, {
                method: "get",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response) {
                console.log(response);
                return {
                    quest: response.quest,
                    objectives: response.objectives,
                };
            }
        } catch (error) {
            console.error(error);
        }
    }

    // async edit(params: EditQuestParams): Promise<boolean> {
    //     try {
    //         const response = await this.fetch(`${this.url}/edit`, {
    //             method: "post",
    //             credentials: "include",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(params),
    //         });

    //         if (response) {
    //             return true;
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }
    //     return false;
    // }

    async getAllByUserId(userId: string): Promise<UserQuestDetail[]> {
        try {
            const response = await this.fetch(`${this.url}/list`, {
                method: "post",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId }),
            });
            return response;
        } catch (e) {
            return [];
        }
    }

    async getQuestsByPersonal(
        userId: string
    ): Promise<QuestByPersonal | undefined> {
        try {
            const response = await this.fetch(`${this.url}/personal`, {
                method: "post",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId }),
            });
            return response;
        } catch (e) {
            return;
        }
    }

    async getObjectivesByQuest(questId: string): Promise<Objective[]> {
        try {
            const response = await this.fetch(
                `${this.url}/${questId}/objectives`,
                {
                    method: "get",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            return response;
        } catch (e) {
            return [];
        }
    }
}

export default new QuestRepository("quest") as QuestRepository;
