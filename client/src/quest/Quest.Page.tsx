import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { fetchQuestsByUserId } from "../redux/Quest.Slice";
import { Quest } from "./types/Quest.types";
import store from "../redux/Store";
import { Progress } from "antd";
import { error } from "console";

const twoColors = { "0%": "#108ee9", "100%": "#87d068" };

export function QuestPage() {
    const [quests, setQuests] = useState<Quest[]>([]);

    useEffect(() => {
        store
            .dispatch(fetchQuestsByUserId("asd"))
            .unwrap()
            .then((data) => {
                setQuests(data);
                console.log(data);
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
