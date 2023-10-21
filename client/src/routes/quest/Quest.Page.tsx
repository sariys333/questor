import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { QuestState, fetchQuestsByUserId } from "../../store/Quest.Slice";
import { Quest } from "./types/Quest.types";
import store, { AppState } from "../../store/Store";
import { Progress } from "antd";
import { error } from "console";
import { useSelector } from "react-redux";
import { stat } from "fs";

const twoColors = { "0%": "#108ee9", "100%": "#87d068" };

export function QuestPage() {
    const state = useSelector((state: AppState) => state.quest.listComp);

    useEffect(() => {
        store.dispatch(fetchQuestsByUserId());
    }, []);

    return (
        <>
            {state.list ? (
                <Outlet />
            ) : (
                <Progress percent={99.9} strokeColor={twoColors} />
            )}
        </>
    );
}
