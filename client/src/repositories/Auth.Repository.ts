import { API_URL } from "../Constants";
import { User } from "../routes/login/types/User.typs";

export type Credentials = {
    email: string;
    password: string;
    remember?: boolean;
    name: string;
    username: string;
};

class AuthRepository {
    private readonly url: string;
    constructor(private readonly apiName: string) {
        this.url = API_URL + apiName;
    }

    async login(cred: Credentials): Promise<{
        status: "ok" | "err";
        user?: User;
        msg?: string;
    }> {
        const response = await fetch(`${this.url}/login`, {
            method: "post",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cred),
        });
        const data = await response.json();

        if (response.status == 200) {
            return {
                status: "ok",
                user: data,
            };
        } else if (response.status == 401) {
            return {
                status: "err",
                msg: "비밀번호가 일치하지 않습니다.",
            };
        } else {
            return {
                status: "err",
                msg: "존재하지 않는 이메일입니다.",
            };
        }
    }
}

export default new AuthRepository("auth") as AuthRepository;
