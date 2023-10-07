export class User {

    constructor(obj?: any) {
        this.userId = obj?.user_id
        this.email = obj?.email
        this.password = obj?.password
        this.name = obj?.name
        this.nickname = obj?.nickname
        this.tel = obj?.tel
        this.regDate = obj?.regDate
    }

    userId: number
    email: string
    password: string
    name: string
    nickname: string
    tel: string
    regDate: Date
}
