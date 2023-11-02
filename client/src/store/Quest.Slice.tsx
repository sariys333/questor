import {
    SliceCaseReducers,
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";
import QuestRepository from "../repositories/Quest.Repository";
import {
    CreateQuestParam,
    EditQuestParam,
    Objective,
    Quest,
    UserObjective,
    UserQuest,
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
        success: boolean;
    };
    createComp: {
        quest?: Partial<CreateQuestParam>;
        createResult: {
            success: boolean;
            msg?: string;
        };
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
        createResult: {
            success: false,
        },
    },
    viewComp: {
        editing: false,
        loading: false,
        success: false,
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
            if (action.payload === "create") {
                state.createComp.quest?.objectives?.pop();
            }
            if (action.payload === "view") {
                state.viewComp.quest?.objectives.pop();
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
        viewCompTitleChange: (state, action) => {
            if (state.viewComp.quest && state.viewComp.quest.title) {
                state.viewComp.quest.title = action.payload;
            }
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
            .addCase(createQuest.fulfilled, (state, action) => {
                state.createComp.createResult.success = action.payload.result;
            })
            .addCase(createQuest.rejected, (state, action) => {
                state.createComp.createResult = {
                    success: false,
                    msg: "퀘스트 생성에 실패하였습니다.",
                };
            });
        builder.addCase(getQuestsByPersonal.fulfilled, (state, action) => {
            console.log(action);
        });
        builder
            .addCase(increaseObjectiveReps.pending, (state, action) => {
                state.viewComp.loading = true;
            })
            .addCase(increaseObjectiveReps.fulfilled, (state, action) => {
                if (state.viewComp.quest?.objectives && action.payload) {
                    const { objectiveId, currentReps } = action.payload;
                    const updated = state.viewComp.quest.objectives.map(
                        (obj) => {
                            if (objectiveId == obj.objectiveId) {
                                return {
                                    ...obj,
                                    currentReps: currentReps,
                                };
                            }
                            return obj;
                        }
                    );
                    state.viewComp.quest.objectives = [...updated];
                }
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
        builder.addCase(editQuest.fulfilled, (state, action) => {
            if (action.payload.result) state.viewComp.success = true;
        });
        builder.addCase(completingQuest.fulfilled, (state, action) => {
            if (action.payload?.completed) state.viewComp.success = true;
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
    viewCompTitleChange,
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
    async () => {
        const questList = await QuestRepository.getAllByUserId();
        console.log(questList);
        return questList;
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
    async (param: CreateQuestParam) => {
        const response = await QuestRepository.createQuest(param);
        console.log(response);
        return response;
    }
);

export const editQuest = createAsyncThunk(
    "quest/editQuest",
    async (param: EditQuestParam) => {
        const response = await QuestRepository.editQuest(param);
        return response;
    }
);

export const deleteQuest = createAsyncThunk(
    "quest/deleteQuest",
    async (questId: string) => {
        const response = await QuestRepository.deleteQuest(questId);
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
    async (objective: UserObjective) => {
        const response = await QuestRepository.increaseObjectiveReps(objective);
        console.log(response);
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
    async (quest: UserQuest) => {
        const response = await QuestRepository.completingQuest(quest);
        console.log(response);
        return response;
    }
);
