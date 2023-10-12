import { API_URL } from "../Constants";
import { CreateCred } from "../quest/Quest.Create.Component";
import { Quest } from "../quest/types/Quest.types";

class QuestRepository {
    private readonly url: string
    constructor(private readonly apiName: string) {
        this.url = API_URL + apiName
    }

    async getAll(): Promise<Quest[]> {
        try {
            const response = await fetch(`${this.url}/list`, {
                method: 'get',
                headers: { 
                    "Content-Type": "application/json",
                    // "Authorization": `Bearer ${}` 
                },
            })

            const data = await response.json()
            return data
        } catch (e) {
            // throw e
            return []
        }
    }

    async create(cred: CreateCred): Promise<boolean> {
        try {
            const response = await fetch(`${this.url}/create`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(cred)
            })

            const data = await response.json()
            if(data) {
                return true
            }
        } catch (error) {
            console.error(error)
        }
        return false
    }

}

export default new QuestRepository('quest') as QuestRepository