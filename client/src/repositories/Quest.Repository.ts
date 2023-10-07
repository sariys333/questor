import { API_URL } from "../Constants";
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
                headers: { 'Content-Type': 'application/json' },
            })

            const data = await response.json()
            return data
        } catch (e) {
            // throw e
            return []
        }
    }

}

export default new QuestRepository('quest') as QuestRepository