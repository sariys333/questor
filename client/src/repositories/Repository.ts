import { API_URL } from "../Constants";

export class Repository {
    protected readonly url: string;
    constructor(protected readonly apiName: string) {
        this.url = API_URL + apiName;
    }

    async fetch(input: RequestInfo | URL, init?: RequestInit) {
        try {
            const response = await fetch(input, {
                method: "get",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                ...init,
            });
            if (response.status === 401) {
                await fetch(`${API_URL}auth/refresh`, {
                    method: "get",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const retryResult = await fetch(input, {
                    method: "get",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    ...init,
                });
                const data = await retryResult.json();
                return data;
            }
            const data = await response.json();
            return data;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async refresh() {
        // await fetch(`${this.url}/auth/refresh`, {
        //     method: "get",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        // });
    }
}
