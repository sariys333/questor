import {
    SliceCaseReducers,
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";
import { Category, CreateQuestParams, Quest } from "../quest/types/Quest.types";
import QuestRepository from "../repositories/Quest.Repository";
import { ConsoleSqlOutlined } from "@ant-design/icons";
import { User } from "../routes/login/types/User.typs";

export type DashState = {
    dashStats: {
        user?: User;
        quests?: Quest[];
        quest?: Quest;
        dayOption: number;
    };
};

const initialState = {
    dashStats: {
        user: undefined,
        quests: [],
        quest: undefined,
        dayOption: 7,
    },
};

const dashSlice = createSlice<DashState, SliceCaseReducers<DashState>>({
    name: "dashboard",
    initialState: initialState,
    reducers: {
        selectChange: (state, action) => {
            state.dashStats.dayOption = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchQuestsByUserId.fulfilled, (state, action) => {
            state.dashStats.quests = action.payload;
        });
    },
});

export default dashSlice;
export const { selectChange } = dashSlice.actions;

export const fetchQuestsByUserId = createAsyncThunk(
    "dashboard/fetchQuests",
    async (userId: string) => {
        const questList = await QuestRepository.getAllByUserId(userId);
        console.log(questList);
        return questList;
    }
);
