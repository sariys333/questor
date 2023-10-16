import {
    SliceCaseReducers,
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";
import { CreateQuestParams, Quest } from "../quest/types/Quest.types";
import QuestRepository from "../repositories/Quest.Repository";

export type QuestState = {
    quests: Quest[];
    selectedQuestId: string;
    showDetail: boolean;
    resultMsg: ResultMsg;
};

export type ResultMsg = {
    status: string;
    result: boolean;
    msg?: string;
};

const initialState = {
    quests: [],
    selectedQuestId: "",
    showDetail: false,
    resultMsg: { status: "err", result: false },
};

const questSlice = createSlice<QuestState, SliceCaseReducers<QuestState>>({
    name: "quest",
    initialState: initialState,
    reducers: {
        detail: (state, action) => {
            state.selectedQuestId = action.payload;
            state.showDetail = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuestsByUserId.pending, (state, action) => {
                console.log(action);
            })
            .addCase(fetchQuestsByUserId.fulfilled, (state, action) => {
                console.log(action);
                state.quests = action.payload;
            })
            .addCase(fetchQuestsByUserId.rejected, (state, action) => {
                console.log(action);
            });
        builder
            .addCase(fetchQuestByQuestId.pending, (state, action) => {})
            .addCase(fetchQuestByQuestId.fulfilled, (state, action) => {
                state.showDetail = true;
            })
            .addCase(fetchQuestByQuestId.rejected, (state, action) => {
                state.showDetail = false;
            });
        builder
            .addCase(createQuest.pending, (state, action) => {})
            .addCase(createQuest.fulfilled, (state, action) => {
                state.resultMsg = action.payload;
            })
            .addCase(createQuest.rejected, (state, action) => {});
    },
});

export const { detail } = questSlice.actions;
export default questSlice;

export const fetchQuestsByUserId = createAsyncThunk(
    "quest/fetchByUserId",
    async () => {
        const questList = await QuestRepository.getAll();
        return questList;
    }
);

export const fetchQuestByQuestId = createAsyncThunk(
    "quest/fetchQuestByQuestId",
    async (questId: string) => {
        const quest = await QuestRepository.getQuestById(questId);
        return quest;
    }
);

export const createQuest = createAsyncThunk(
    "quest/createQuest",
    async (params: CreateQuestParams, thunkApi) => {
        const response = await QuestRepository.create(params);
        if (response.result) {
            await thunkApi.dispatch(fetchQuestsByUserId());
        }
        return response;
    }
);
