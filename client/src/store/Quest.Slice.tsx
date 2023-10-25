import {
    SliceCaseReducers,
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";
import QuestRepository from "../repositories/Quest.Repository";
import {
    CreateQuestParam,
    EditableObjective,
    Objective,
    Quest,
    UserQuestDetail,
} from "../routes/app/quest/types/Quest.types";

export type QuestState = {
    listComp: {
        loading: boolean;
        list?: UserQuestDetail[];
    };
    viewComp: {
        quest?: UserQuestDetail;
        editing: boolean;
        loading: boolean;
    };
    createComp: {
        quest?: Partial<CreateQuestParam>;
    };
    calendarComp: {
        list: UserQuestDetail[];
        loading: boolean;
    };
};

const initialState = {
    listComp: {
        loading: true,
        list: [],
    },
    createComp: {
        quest: {
            objectives: [
                {
                    content: "",
                    category: "",
                    targetReps: 1,
                },
            ],
        },
    },
    viewComp: {
        editing: false,
        loading: false,
    },
    calendarComp: {
        list: [],
        loading: true,
    },
};

const questSlice = createSlice<QuestState, SliceCaseReducers<QuestState>>({
    name: "quest",
    initialState: initialState,
    reducers: {
        createAddObjective: (state, action) => {
            state.viewComp.quest?.objectives.push(action.payload);
        },
        changeObjective: (state, action) => {
            state.viewComp.quest &&
                (state.viewComp.quest.objectives = action.payload);
            console.log(action.payload);
        },
        toggleEditQuest: (state) => {
            state.viewComp.editing = !!state.viewComp.editing;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllQuests.fulfilled, (state, action) => {
            state.listComp.list = action.payload;
        });
        builder
            .addCase(fetchQuestsByUserId.pending, (state, action) => {
                state.listComp.loading = true;
            })
            .addCase(fetchQuestsByUserId.fulfilled, (state, action) => {
                // console.log(action.payload);
                state.listComp.list = action.payload;
            })
            .addCase(fetchQuestsByUserId.rejected, (state, action) => {
                state.listComp.loading = false;
            });
        builder
            .addCase(fetchQuestByQuestId.pending, (state, action) => {
                state.viewComp.loading = true;
            })
            .addCase(fetchQuestByQuestId.fulfilled, (state, action) => {
                if (action.payload) {
                    state.viewComp.quest = action.payload;
                    // state.viewComp.objectives = action.payload.objectives;
                    state.viewComp.loading = false;
                }
            })
            .addCase(fetchQuestByQuestId.rejected, (state, action) => {});
        builder
            .addCase(createQuest.pending, (state, action) => {})
            .addCase(createQuest.fulfilled, (state, action) => {})
            .addCase(createQuest.rejected, (state, action) => {});
        builder.addCase(getQuestsByPersonal.fulfilled, (state, action) => {
            console.log(action);
        });
        builder
            .addCase(increaseObjectiveReps.pending, (state, action) => {
                state.viewComp.loading = true;
            })
            .addCase(increaseObjectiveReps.fulfilled, (state, action) => {
                state.viewComp.loading = false;
            });
    },
});

export default questSlice;

export const {
    createAddObjective,
    editableQuest,
    changeTime,
    changeObjective,
    showDetail,
} = questSlice.actions;

export const fetchAllQuests = createAsyncThunk(
    "quest/fetchAllQuests",
    async () => {
        const questList = await QuestRepository.getAll();
        return questList;
    }
);

export const fetchQuestsByUserId = createAsyncThunk(
    "quest/fetchByUserId",
    async (userId: string | undefined) => {
        if (userId) {
            const questList = await QuestRepository.getAllByUserId(userId);
            return questList;
        }
    }
);

export const fetchQuestByQuestId = createAsyncThunk(
    "quest/fetchQuestByQuestId",
    async (questId: string) => {
        const quest = await QuestRepository.getQuestById(questId);
        // console.log(quest);
        return quest;
    }
);

export const createQuest = createAsyncThunk(
    "quest/createQuest",
    async (param: CreateQuestParam, thunkApi) => {
        const response = await QuestRepository.create(param);

        // if (response.result) {
        //     await thunkApi.dispatch(fetchQuestsByUserId());
        // }
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

export const increaseObjectiveReps = createAsyncThunk(
    "quest/increaseObjectiveReps",
    async (objectiveId: string) => {
        const response = await QuestRepository.increaseObjectiveReps(
            objectiveId
        );
        return response;
    }
);
