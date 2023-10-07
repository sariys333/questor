import { API_URL } from "../Constants";
import { User } from "../login/types/User.typs";

class UserRepository {
    private readonly url: string
    constructor(private readonly apiName: string) {
        this.url = API_URL + apiName
    }



    async getInfoById(): Promise<User[]> {
        const response = await fetch(`${this.url}/info`, {
            method: 'post',
            headers: {

                'Content-Type': 'application/json'
            },
        })

        const data = await response.json()
        return data
    }

}

export default new UserRepository('user') as UserRepository