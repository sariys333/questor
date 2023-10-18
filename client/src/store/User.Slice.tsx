import {
    SliceCaseReducers,
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";
import { Quest } from "../quest/types/Quest.types";
import AuthRepository, { Credentials } from "../repositories/Auth.Repository";
import QuestRepository from "../repositories/Quest.Repository";
import UserRepository from "../repositories/User.Repository";
import { User } from "../routes/login/types/User.typs";

export type UserState = {
    user?: User;
    quests?: Quest[];
};

const initialState = {
    user: undefined,
    quests: undefined,
};

const userSlice = createSlice<UserState, SliceCaseReducers<UserState>>({
    name: "user",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userSignIn.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(userQuests.fulfilled, (state, action) => {
                state.quests = action.payload;
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.user = action.payload;
            });
    },
});

export default userSlice;

export const userSignup = createAsyncThunk(
    "user/signup",
    async (cred: Credentials) => {
        const response = await UserRepository.signup(cred);
        return response;
    }
);

export const userSignIn = createAsyncThunk(
    "user/signin",
    async (cred: Credentials) => {
        const response = await AuthRepository.login(cred);
        if (!response.user) {
            throw "failed to sign in";
        }
        console.log(response.user);
        return response.user;
    }
);

export const getCurrentUser = createAsyncThunk(
    "user/current",
    async (arg, thunkApi) => {
        const response = await UserRepository.findCurrentUser();
        if (response == undefined) {
            throw "failed to find current user";
        }
        // if (!response.user) {
        //     throw "failed to sign in";
        // }
        return response;
    }
);

export const userQuests = createAsyncThunk(
    "user/quests",
    async (arg, thunkApi) => {
        const state = thunkApi.getState();
        console.log("user/quests", state);
        const response = await QuestRepository.getAll();
        // if (!response.user) {
        //     throw "failed to sign in";
        // }
        return response;
    }
);

// export const userSignOut = createAsyncThunk(
//     "user/signout",
//     async (cred: Credentials) => {
//         const response = await UserRepository.signup(cred);
//         return response;
//     }
// );
