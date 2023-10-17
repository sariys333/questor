import {
    SliceCaseReducers,
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";
import { Category, CreateQuestParams, Quest } from "../quest/types/Quest.types";
import QuestRepository from "../repositories/Quest.Repository";
import { ConsoleSqlOutlined } from "@ant-design/icons";

export type QuestState = {
    list: {
        loading: boolean;
        list: Quest[];
    };
    detail: Quest;
    showDetail: boolean;
};

const initialState = {
    list: {
        loading: true,
        list: [],
    },
    showDetail: false,
    detail: {
        questId: "",
        userId: "",
        category: Category.walk,
        content: "",
        completed: false,
        completedAt: new Date(),
        createdAt: new Date(),
        from: new Date(),
        to: new Date(),
    },
};

const questSlice = createSlice<QuestState, SliceCaseReducers<QuestState>>({
    name: "quest",
    initialState: initialState,
    reducers: {
        detail: (state, action) => {
            state.showDetail = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuestsByUserId.pending, (state, action) => {
                state.list.loading = true;
            })
            .addCase(fetchQuestsByUserId.fulfilled, (state, action) => {
                console.log(action);
                state.list.list = action.payload;
                state.list.loading = true;
            })
            .addCase(fetchQuestsByUserId.rejected, (state, action) => {
                console.log(action);
                state.list.loading = false;
            });
        builder
            .addCase(fetchQuestByQuestId.pending, (state, action) => {})
            .addCase(fetchQuestByQuestId.fulfilled, (state, action) => {
                if (action.payload) {
                    state.detail = action.payload;
                    state.showDetail = true;
                } else {
                    state.showDetail = false;
                }
            })
            .addCase(fetchQuestByQuestId.rejected, (state, action) => {
                state.showDetail = false;
            });
        builder
            .addCase(createQuest.pending, (state, action) => {})
            .addCase(createQuest.fulfilled, (state, action) => {})
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
