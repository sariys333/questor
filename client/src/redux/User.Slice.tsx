import {
    SliceCaseReducers,
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";
import QuestRepository from "../repositories/Quest.Repository";
import { User } from "../routes/login/types/User.typs";

export type UserState = {
    user: User;
};

export const userSlice = createSlice<UserState, SliceCaseReducers<UserState>>({
    name: "user",
    initialState: {
        user: {
            userId: "",
            email: "",
            password: "",
            name: "",
            username: "",
            regDate: undefined,
        },
    },
    reducers: {
        logout: (state, action) => {},
    },
    extraReducers: (builder) => {},
});

export const { logout } = userSlice.actions;
