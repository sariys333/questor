import { Flex, Layout, Typography } from "antd";
import { QuestCalendar } from "../quest/Quest.Calendar";
import { DashboardContent } from "./Dashboard.Content";
const { Header, Content } = Layout;

export function DashboardPage() {
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
