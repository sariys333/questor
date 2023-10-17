import { API_URL } from "../Constants";

export class Repository {
    protected readonly url: string;
    constructor(protected readonly apiName: string) {
        this.url = API_URL + apiName;
    }

    async fetch(input: RequestInfo | URL, init?: RequestInit) {
        try {
            const response = await fetch(input, {
                ...init,
            });
            if (response.status === 401) {
                this.refresh()
                const retryResult = await fetch(input, {
                    ...init,
                });
                return await retryResult.json();
            }
            return await response.json();
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async refresh() {
        await fetch(`${API_URL}auth/refresh`, {
            method: "get",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}
