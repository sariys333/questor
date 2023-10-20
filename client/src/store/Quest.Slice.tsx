import {
    SliceCaseReducers,
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";
import { Category, CreateQuestParams, Quest } from "../quest/types/Quest.types";
import QuestRepository from "../repositories/Quest.Repository";

export type QuestState = {
    listComp: {
        loading: boolean;
        list: Quest[];
    };
    detailComp: {
        list: Quest[];
        quest?: Quest;
        showDetail: boolean;
        loading: boolean;
    };
    calendarComp: {
        list: Quest[];
        quest?: Quest;
        showDetail: boolean;
        loading: boolean;
    };
    createComp: {
        quest?: Quest;
        loading: boolean;
    };
};

const initialState = {
    listComp: {
        loading: true,
        list: [],
    },
    detailComp: {
        list: [],
        showDetail: false,
        loading: true,
    },
    calendarComp: {
        list: [],
        showDetail: false,
        loading: true,
    },
    createComp: {
        loading: true,
    },
};

const questSlice = createSlice<QuestState, SliceCaseReducers<QuestState>>({
    name: "quest",
    initialState: initialState,
    reducers: {
        detail: (state, action) => {
            state.detailComp.showDetail = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuestsByUserId.pending, (state, action) => {
                state.listComp.loading = true;
            })
            .addCase(fetchQuestsByUserId.fulfilled, (state, action) => {
                console.log(action);
                state.listComp.list = action.payload;
                state.listComp.loading = false;
            })
            .addCase(fetchQuestsByUserId.rejected, (state, action) => {
                console.log(action);
                state.listComp.loading = false;
            });
        builder
            .addCase(fetchQuestByQuestId.pending, (state, action) => {})
            .addCase(fetchQuestByQuestId.fulfilled, (state, action) => {
                if (action.payload) {
                    state.detailComp.quest = action.payload;
                    state.detailComp.showDetail = true;
                } else {
                    state.detailComp.showDetail = false;
                }
            })
            .addCase(fetchQuestByQuestId.rejected, (state, action) => {
                state.detailComp.showDetail = false;
            });
        builder
            .addCase(createQuest.pending, (state, action) => {})
            .addCase(createQuest.fulfilled, (state, action) => {})
            .addCase(createQuest.rejected, (state, action) => {});
        builder.addCase(getQuestsByPersonal.fulfilled, (state, action) => {
            console.log(action);
        });
    },
});

export default questSlice;

export const fetchQuestsByUserId = createAsyncThunk(
    "quest/fetchByUserId",
    async (userId: string | undefined) => {
        if (userId) {
            const questList = await QuestRepository.getAllByUserId(userId);
            return questList;
        } else {
            const questList = await QuestRepository.getAll();
            return questList;
        }
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

export const getQuestsByPersonal = createAsyncThunk(
    "quest/fetchQuestsByPersonal",
    async (userId: string) => {
        const response = await QuestRepository.getQuestsByPersonal(userId);
        return response;
    }
);
