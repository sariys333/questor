import { SliceCaseReducers, createSlice } from "@reduxjs/toolkit";
import { User } from "../routes/login/types/User.typs";

export type UserState = {
    user: User;
    selectedUser: User;
};

const initialState = {
    user: {
        userId: "",
        email: "",
        password: "",
        name: "",
        username: "",
        regDate: undefined,
    },
    selectedUser: {
        userId: "",
        email: "",
        password: "",
        name: "",
        username: "",
        regDate: undefined,
    },
};

const userSlice = createSlice<UserState, SliceCaseReducers<UserState>>({
    name: "user",
    initialState: initialState,
    reducers: {
        logout: (state, action) => {},
    },
    extraReducers: (builder) => {},
});

export const { logout } = userSlice.actions;
export default userSlice;
