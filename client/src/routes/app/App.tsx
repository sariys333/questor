
import { Button, Layout, Menu, Space } from "antd"
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { QuestPage } from "../../quest/Quest.Page";

const { Header, Sider, Content } = Layout;
export function App() {
    const [collapsed, setCollapsed] = useState(false);

    return <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical" />
            <Menu
                // theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={[
                    {
                        key: '1',
                        icon: <UserOutlined />,
                        label: 'nav 1',
                    },
                    {
                        key: '2',
                        icon: <VideoCameraOutlined />,
                        label: 'nav 2',
                    },
                    {
                        key: '3',
                        icon: <UploadOutlined />,
                        label: 'nav 3',
                    },
                ]}
            />
        </Sider>
        <Layout>
            <Header style={{ padding: 0 }}>
                <Space style={{ justifyContent: "space-between" }}>
                    {/* <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    /> */}
                    <a href="/login">LOGIN</a>
                </Space>


            </Header>
            <Content
                style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                }}
            >
                {/* <QuestPage id={0} /> */}
                {/* <Routes>
                    <Route path="login" element={<QuestPage />} />
                </Routes> */}
                <Outlet />
            </Content>
        </Layout>
    </Layout>
}

export default App