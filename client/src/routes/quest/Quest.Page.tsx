import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { fetchQuestsByUserId } from "../../store/Quest.Slice";
import store, { AppState } from "../../store/Store";
import { Typography } from "antd";
import { useSelector } from "react-redux";

const { Title } = Typography;

export function QuestPage() {
    const state = useSelector((state: AppState) => state.quest);

    const { pageTitle } = state;

    return (
        <>
            <Title level={3}>{pageTitle}</Title>
            <Outlet />
        </>
    );
}
