import { API_URL } from "../Constants";
import { CreateQuestParams, EditQuestParams, Quest } from "../quest/types/Quest.types";

class QuestRepository {
    private readonly url: string;
    constructor(private readonly apiName: string) {
        this.url = API_URL + apiName;
    }

    async getAll(): Promise<Quest[]> {
        try {
            const response = await fetch(`${this.url}/list`, {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            return data;
        } catch (e) {
            return [];
        }
    }

    async create(params: CreateQuestParams): Promise<boolean> {
        try {
            const response = await fetch(`${this.url}/create`, {
                method: "post",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(params),
            });

            const data = await response.json();
            if (data.statusCode == 401) {
                return false;
            }
            if (data) {
                return true;
            }
        } catch (error) {
            console.error(error);
        }
        return false;
    }

    async getQuestById(questId: string): Promise<Quest | undefined> {
        try {
            const response = await fetch(`${this.url}/detail/${questId}`, {
                method: "get",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            console.log(data)
            if (data) {
                return data;
            }
        } catch (error) {
            console.error(error);
        }
    }

    async edit(params: EditQuestParams): Promise<boolean> {
        console.log(params)
        try {
            const response = await fetch(`${this.url}/edit`, {
                method: "post",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(params),
            });

            const data = await response.json();
            if (data) {
                return true;
            }
        } catch (error) {
            console.error(error);
        }
        return false;
    }

}

export default new QuestRepository("quest") as QuestRepository;
