import { API_URL } from "../Constants";
import { User } from "../routes/login/types/User.typs";
import { Credentials } from "./Auth.Repository";
import { Repository } from "./Repository";

class UserRepository extends Repository {
    constructor(protected readonly apiName: string) {
        super(apiName);
    }

    async findCurrentUser(): Promise<User | undefined> {
        try {
            const response = await this.fetch(`${this.url}`, {
                method: "get",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(response);
            return response.user;
        } catch (e) {
            console.log(e);
        }
    }

    async signup(cred: Credentials) {
        const response = await fetch(`${this.url}/signup`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cred),
        });
        const data = await response.json();
        console.log(data);
        return data;
    }

    async checkEmail(cred: Credentials): Promise<boolean | undefined> {
        const response = await fetch(`${this.url}/email`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cred),
        });
        console.log("res", response);
        const data = await response.json();
        console.log(data);
        return data;
    }
}

export default new UserRepository("user") as UserRepository;
