import {
    SliceCaseReducers,
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";
import QuestRepository from "../repositories/Quest.Repository";
import {
    CreateQuestParam,
    Objective,
    Quest,
    UserQuestDetail,
} from "../routes/app/quest/types/Quest.types";
import store from "./Store";

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
            state.createComp.quest?.objectives?.push(action.payload);
        },
        deleteObjective: (state, action) => {
            if (action.payload.length > 1) {
                state.createComp.quest?.objectives?.pop();
            }
        },
        changeObjective: (state, action) => {
            state.viewComp.quest &&
                (state.viewComp.quest.objectives = action.payload);
            console.log(action.payload);
        },
        toggleEditQuest: (state) => {
            state.viewComp.editing = !state.viewComp.editing;
        },
        questTitleChange: (state, action) => {
            state.createComp.quest = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllQuests.fulfilled, (state, action) => {
            state.listComp.list = action.payload;
        });
        builder
            .addCase(fetchUserQuestsByUserId.pending, (state, action) => {
                state.listComp.loading = true;
            })
            .addCase(fetchUserQuestsByUserId.fulfilled, (state, action) => {
                state.listComp.list = action.payload;
            })
            .addCase(fetchUserQuestsByUserId.rejected, (state, action) => {
                state.listComp.loading = false;
            });

        builder
            .addCase(fetchQuestByQuestId.pending, (state, action) => {
                state.viewComp.loading = true;
            })
            .addCase(fetchQuestByQuestId.fulfilled, (state, action) => {
                if (action.payload) {
                    // console.log(action.payload);
                    state.viewComp.quest = action.payload;
                    state.viewComp.loading = false;
                }
            });
        builder.addCase(fetchUserQuestByQuestId.fulfilled, (state, action) => {
            if (state.viewComp.quest) {
                const userQuest = {
                    ...state.viewComp.quest,
                    ...action.payload,
                };
                state.viewComp.quest = userQuest;
            }
        });
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
        builder
            .addCase(fetchUserObjetives.pending, (state, action) => {
                state.viewComp.loading = true;
            })
            .addCase(fetchUserObjetives.fulfilled, (state, action) => {
                if (state.viewComp.quest) {
                    const userObjectives = state.viewComp.quest.objectives.map(
                        (objective) => {
                            const { objectiveId, ...others } = objective;
                            const userObj = action.payload.find(
                                (obj) => objectiveId === obj.objectiveId
                            );
                            const userObjective = {
                                objectiveId,
                                ...others,
                                ...userObj,
                            };
                            return userObjective;
                        }
                    );
                    state.viewComp.quest = {
                        ...state.viewComp.quest,
                        objectives: userObjectives,
                    };
                }
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
    toggleEditQuest,
    deleteObjective,
    questTitleChange,
} = questSlice.actions;

export const fetchAllQuests = createAsyncThunk(
    "quest/fetchAllQuests",
    async () => {
        const questList = await QuestRepository.getAll();
        return questList;
    }
);

export const fetchUserQuestsByUserId = createAsyncThunk(
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

export const fetchUserQuestByQuestId = createAsyncThunk(
    "quest/fetchUserQuestByQuestId",
    async (questId: string) => {
        const quest = await QuestRepository.getUserQuestById(questId);
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
    async (objective: Objective) => {
        const response = await QuestRepository.increaseObjectiveReps(objective);
        return response;
    }
);

export const fetchUserObjetives = createAsyncThunk(
    "quest/fetchUserObjetives",
    async (questId: string) => {
        const response = await QuestRepository.getUserObjetives(questId);
        return response;
    }
);

export const completingQuest = createAsyncThunk(
    "quest/completingQuest",
    async (quest: Quest) => {
        const response = await QuestRepository.completingQuest(quest);
        return response;
    }
);
