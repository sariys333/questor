import { configureStore } from "@reduxjs/toolkit";
import questSlice, { QuestState } from "./Quest.Slice";
import userSlice, { UserState } from "./User.Slice";

export type AppState = {
    user: UserState;
    quest: QuestState;
};

const store = configureStore({
    reducer: { quest: questSlice.reducer, user: userSlice.reducer },
});
export default store;
