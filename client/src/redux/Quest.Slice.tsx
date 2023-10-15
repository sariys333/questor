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

export const questSlice = createSlice<
    QuestState,
    SliceCaseReducers<QuestState>
>({
    name: "quest",
    initialState: {
        quests: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchQuestsByUserId.fulfilled, (state, action) => {
            state.quests = action.payload;
        });
        builder.addCase(fetchQuestsByUserId.rejected, (state, action) => {});
        builder.addCase(fetchQuestsByUserId.pending, (state, action) => {});
    },
});

export const fetchQuestsByUserId = createAsyncThunk(
    "quests/fetchByUserId",
    // Declare the type your function argument here:
    async (userId: string) => {
        const questList = await QuestRepository.getAll();
        // Inferred return type: Promise<MyData>
        return questList;
    }
);

export const {} = questSlice.actions;
