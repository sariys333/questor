export type User = {
    userId: number
    email: string
    password: string
    name: string
    nickname: string
    tel: string
    regDate: Date
}

// export type GetUserInfoQuery = Pick<User, "userId">
