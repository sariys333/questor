import { configureStore } from "@reduxjs/toolkit";
import questSlice, { QuestState } from "./Quest.Slice";
import userSlice, { UserState } from "./User.Slice";
import dashSlice, { DashState } from "./Dash.Slice";

export type AppState = {
    user: UserState;
    quest: QuestState;
    dash: DashState;
};

const store = configureStore({
    reducer: {
        quest: questSlice.reducer,
        user: userSlice.reducer,
        dash: dashSlice.reducer,
    },
});
export default store;
