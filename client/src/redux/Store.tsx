import { configureStore } from "@reduxjs/toolkit";
import { User } from "../routes/login/types/User.typs";
import questSlice, { QuestState } from "./Quest.Slice";
import userSlice from "./User.Slice";

export type AppState = {
    user: User;
    quest: QuestState;
};

const store = configureStore({
    reducer: { quest: questSlice.reducer, user: userSlice.reducer },
});
export default store;
