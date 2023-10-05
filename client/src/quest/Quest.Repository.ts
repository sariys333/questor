import { API_URL } from "../Constants";
import { Quest } from "./types/Quest.types";

class QuestRepository {
    private readonly url: string
    constructor(private readonly apiName: string) {
        this.url = API_URL + apiName
    }

    async getAll(): Promise<Quest[]> {
        // 'http://localhost:3001/quest/'+id+'/list?limit='
        const response = await fetch(`${this.url}/list`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
        })

        const data = await response.json()
        return data
    }

}

export default new QuestRepository('quest') as QuestRepository