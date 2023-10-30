import {
    SliceCaseReducers,
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";
import { UserQuestDetail } from "../routes/app/quest/types/Quest.types";
import QuestRepository from "../repositories/Quest.Repository";

export type DashState = {
    dashStats: {
        quests?: UserQuestDetail[];
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
    async () => {
        const questList = await QuestRepository.getAllByUserId();
        console.log(questList);
        return questList;
    }
);
