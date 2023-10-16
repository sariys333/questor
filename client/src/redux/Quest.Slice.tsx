import {
    SliceCaseReducers,
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";
import { Quest } from "../quest/types/Quest.types";
import QuestRepository from "../repositories/Quest.Repository";

export type QuestState = {
    quests: Quest[];
};

const questSlice = createSlice<QuestState, SliceCaseReducers<QuestState>>({
    name: "quest",
    initialState: {
        quests: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchQuestsByUserId.pending, (state, action) => {});
        builder.addCase(fetchQuestsByUserId.fulfilled, (state, action) => {
            state.quests = action.payload;
        });
        builder.addCase(fetchQuestsByUserId.rejected, (state, action) => {});
    },
});

export const fetchQuestsByUserId = createAsyncThunk(
    "quests/fetchByUserId",
    async (userId: string) => {
        try {
            const questList = await QuestRepository.getAll();
            return questList;
        } catch (error) {
            console.error(error);
            return [];
        }
    }
);

export const {} = questSlice.actions;
export default questSlice;
