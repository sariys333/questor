export type User = {
    userId: string;
    email: string;
    password: string;
    name: string;
    username: string;
    regDate: Date | undefined;
};

// export type GetUserInfoQuery = Pick<User, "userId">
