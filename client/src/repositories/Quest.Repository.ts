import { API_URL } from "../Constants";
import { CreateForm } from "../quest/Quest.Create.Component";
import { EditForm } from "../quest/Quest.Edit.Component";
import { Quest } from "../quest/types/Quest.types";

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
                    // "Authorization": `Bearer ${}`
                },
            });

            const data = await response.json();
            return data;
        } catch (e) {
            // throw e
            return [];
        }
    }

    async create(form: CreateForm): Promise<boolean> {
        try {
            const response = await fetch(`${this.url}/create`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
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

    async getQuestById(questId: number): Promise<Quest | undefined> {
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
        return;
    }

    async edit(form: EditForm): Promise<boolean> {
        console.log(form)
        try {
            const response = await fetch(`${this.url}/edit`, {
                method: "post",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
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
