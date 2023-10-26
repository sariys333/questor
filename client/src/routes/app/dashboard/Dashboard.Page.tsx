import { Flex, Layout, Typography } from "antd";
import { useEffect } from "react";
import { DashboardContent } from "./Dashboard.Content";
const { Header, Content } = Layout;

export function DashboardPage() {
    useEffect(() => {}, []);

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
                </Content>
            </Layout>
        </>
    );
}
