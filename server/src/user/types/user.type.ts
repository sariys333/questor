export class User {

    constructor(obj?: any) {
        this.userId = obj?.user_id
        this.email = obj?.email
        this.password = obj?.password
        this.name = obj?.name
        this.username = obj?.username
        this.regDate = obj?.regDate
    }

    userId: number
    email: string
    password: string
    name: string
    username: string
    regDate: Date
}

export type UserCredentials = {
    email: string,
    password: string,
    name: string,
    username: string,
    regDate: Date
}
