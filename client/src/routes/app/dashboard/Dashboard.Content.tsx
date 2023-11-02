import { useSelector } from "react-redux";
import { getQuestsByPersonal } from "../../../store/Quest.Slice";
import store, { AppState } from "../../../store/Store";
import { DashboardStats } from "./Dashboard.Stats";
import { useEffect } from "react";

export const DashboardContent = () => {
    const user = useSelector((state: AppState) => state.user);

    // useEffect(() => {
    //     if (user.user) {
    //         store.dispatch(getQuestsByPersonal(user.user.userId));
    //     }
    // }, []);

    return (
        <>
            <DashboardStats />
        </>
    );
};
