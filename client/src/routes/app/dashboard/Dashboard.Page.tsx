import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Progress, Layout, Flex, Typography } from "antd";
import { error } from "console";
import { useSelector } from "react-redux";
import store from "../../../store/Store";
import { DashboardContent } from "./Dashboard.Content";
const { Header, Content } = Layout;

const twoColors = { "0%": "#108ee9", "100%": "#87d068" };

export function DashboardPage() {
    useEffect(() => {}, []);

    return (
        <>
            <Layout>
                <Header
                    style={{
                        marginBottom: 16,
                        backgroundColor: "transparent",
                        // borderBottom: "1px solid #ffffff88",
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
