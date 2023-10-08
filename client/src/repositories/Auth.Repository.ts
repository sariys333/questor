import { API_URL } from "../Constants";
import { User } from "../routes/login/types/User.typs";

export type Credentials = {
    email: string,
    password: string,
    remember: boolean
} 

class AuthRepository {
    private readonly url: string
    constructor(private readonly apiName: string) {
        this.url = API_URL + apiName
    }

    async login(cred: Credentials): Promise<User> {
        const response = await fetch(`${this.url}/login`, {
            method: 'post',
            credentials: "include",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(cred)
        })
        const data = await response.json()
        console.log(data)
        return data
    }

    
}

export default new AuthRepository('auth') as AuthRepository