import { configureStore } from "@reduxjs/toolkit";
import questSlice from "./Quest.Slice";

const store = configureStore({
    reducer: questSlice.reducer,
    // user: userSlice.reducer,
});
export default store;
