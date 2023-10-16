import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { QuestState, fetchQuestsByUserId } from "../store/Quest.Slice";
import { Quest } from "./types/Quest.types";
import store from "../store/Store";
import { Progress } from "antd";
import { error } from "console";
import { useSelector } from "react-redux";

const twoColors = { "0%": "#108ee9", "100%": "#87d068" };

export function QuestPage() {
    const [quests, setQuests] = useState<Quest[]>();

    useEffect(() => {
        store
            .dispatch(fetchQuestsByUserId())
            .unwrap()
            .then((data) => {
                console.log(data);
                setQuests(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <>
            {quests ? (
                <Outlet />
            ) : (
                <Progress percent={99.9} strokeColor={twoColors} />
            )}
        </>
    );
}
