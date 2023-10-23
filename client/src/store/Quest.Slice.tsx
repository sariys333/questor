import {
    SliceCaseReducers,
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";
import QuestRepository from "../repositories/Quest.Repository";
import {
    CreateQuestParams,
    EditableObjective,
    Objective,
    Quest,
} from "../routes/quest/types/Quest.types";

export type QuestState = {
    pageTitle: string;
    listComp: {
        loading: boolean;
        list: Quest[];
        combined?: {
            [questId: string]: Quest & {
                [objectiveId: string]: Partial<Objective>;
            };
        };
    };
    viewComp: {
        quest?: Quest;
        objectives: EditableObjective[];
        editable: boolean;
        loading: boolean;
        show: boolean;
        time?: {
            from?: Date | number;
            to?: Date | number;
        };
        combined?: { [objectiveId: string]: Objective };
    };
    calendarComp: {
        list: Quest[];
        quest?: Quest;
        showDetail: boolean;
        loading: boolean;
    };
};

const initialState = {
    pageTitle: "목록",
    listComp: {
        loading: true,
        list: [],
    },
    viewComp: {
        objectives: [{}],
        editable: true,
        loading: true,
        show: false,
    },
    calendarComp: {
        list: [],
        showDetail: false,
        loading: true,
    },
};

const questSlice = createSlice<QuestState, SliceCaseReducers<QuestState>>({
    name: "quest",
    initialState: initialState,
    reducers: {
        createAddObjective: (state, action) => {
            state.viewComp.objectives.push(action.payload);
        },
        changeObjective: (state, action) => {
            state.viewComp.objectives = action.payload;
            console.log(action.payload);
        },
        editableQuest: (state, action) => {
            state.viewComp.editable = action.payload;
            state.viewComp.loading = false;
        },
        changeTime: (state, action) => {
            console.log(action.payload);
            state.viewComp.time = {
                from: action.payload.from,
                to: action.payload.to,
            };
        },
        changePageTitle: (state, action) => {
            state.pageTitle = action.payload;
        },
        showDetail: (state, action) => {
            state.viewComp.show = action.payload;
        },
        combineObjectives: (state, action) => {
            const combineObj: { [id: string]: Objective } = {};
            for (const userObj of action.payload) {
                combineObj[userObj.objectiveId] = userObj;
                for (const obj of state.viewComp.objectives) {
                    if (obj && userObj.objectiveId == obj.objectiveId) {
                        if (combineObj[userObj.objectiveId]) {
                            combineObj[userObj.objectiveId].category =
                                obj.category || "";
                            combineObj[userObj.objectiveId].content =
                                obj.content || "";
                            combineObj[userObj.objectiveId].targetReps =
                                obj.targetReps || 0;
                        }
                    }
                }
            }
            state.viewComp.combined = combineObj;
            console.log(combineObj);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuestsByUserId.pending, (state, action) => {
                state.listComp.loading = true;
            })
            .addCase(fetchQuestsByUserId.fulfilled, (state, action) => {
                console.log(action.payload);
                state.listComp.combined = action.payload;
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
                    state.viewComp.quest = action.payload.quest;
                    state.viewComp.objectives = action.payload.objectives;
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
    },
});

export default questSlice;

export const {
    createAddObjective,
    editableQuest,
    changeTime,
    changeObjective,
    changePageTitle,
    showDetail,
    combineObjectives,
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
        console.log(quest);
        return quest;
    }
);

export const fetchObjectivesByQuest = createAsyncThunk(
    "quest/fetchObjectivesByQuest",
    async (questId: string, thunkApi) => {
        const objectives = await QuestRepository.getObjectivesByQuest(questId);
        thunkApi.dispatch(combineObjectives(objectives));
        return objectives;
    }
);

export const createQuest = createAsyncThunk(
    "quest/createQuest",
    async (
        {
            params,
            objectives,
        }: {
            params: CreateQuestParams;
            objectives: EditableObjective[];
        },
        thunkApi
    ) => {
        console.log(objectives);

        if (!objectives) {
            return;
        }
        const response = await QuestRepository.create({ params, objectives });

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

// const obj = {
//     questid : {
//         from,
//         to,
//         isPrivate,
//         ...
//         objectId: {
//             content,
//             category
//         },
//         ...
//     }
// }
