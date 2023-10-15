import { configureStore } from "@reduxjs/toolkit";
import { questSlice } from "./Quest.Slice";
import { userSlice } from "./User.Slice";

const rootReducer = {
    quest: questSlice.reducer,
    user: userSlice.reducer,
};

const store = configureStore({
    reducer: rootReducer,
});
export default store;
