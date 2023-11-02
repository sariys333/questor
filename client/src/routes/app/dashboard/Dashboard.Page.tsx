import { Flex, Layout, Typography } from "antd";
import { useEffect } from "react";
import { DashboardContent } from "./Dashboard.Content";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { stat } from "fs";
import store, { AppState } from "../../../store/Store";
import { QuestCalendar } from "../quest/Quest.Calendar";
import { getCurrentUser } from "../../../store/User.Slice";
const { Header, Content } = Layout;

export function DashboardPage() {
    const state = useSelector((state: AppState) => state.user);
    const navigate = useNavigate();

    const { user } = state;

    useEffect(() => {
        store
            .dispatch(getCurrentUser())
            .unwrap()
            .then((response) => {
                if (!response) {
                    navigate("/login");
                }
            });
    }, []);

    return (
        <>
            <Layout>
                <Header
                    style={{
                        marginBottom: 16,
                        backgroundColor: "transparent",
                    }}
                >
                    <Flex>
                        <Typography.Title
                            level={3}
                            style={{
                                fontFamily: "'Young Serif'",
                            }}
                        >
                            Dashboard
                        </Typography.Title>
                    </Flex>
                </Header>
                <Content>
                    <DashboardContent />
                    <QuestCalendar />
                </Content>
            </Layout>
        </>
    );
}
