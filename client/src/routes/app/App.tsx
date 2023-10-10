
import { Layout, Menu, Space, theme } from "antd"
import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from "react";
import UserRepository from "../../repositories/User.Repository";
import { User } from "../login/types/User.typs";
import { Link } from "react-router-dom";
import { QuestPage } from '../../quest/Quest.Page';

const { Header, Sider, Content } = Layout;
export function App() {
    const [collapsed, setCollapsed] = useState(false);
    const [user, setUser] = useState<User>();

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const getCurrentUser = async () => {
        const currentUser = await UserRepository.findCurrentUser()
        setUser(currentUser)
    }
    
    if(user) {
        console.log(user.name)
    }
    console.log(user)

    useEffect(() => {
        getCurrentUser()
    }, [])

    return <Layout style={{ height: "100vh"}}>
        <Sider trigger={null} collapsible collapsed={collapsed} style={{ background: colorBgContainer}}>
            <div className="demo-logo-vertical" />
            <Menu
                style={{height: "100%"}}
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
            <Header  style={{ padding: 0, background: colorBgContainer }}>
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
                    {user ? <a>{user.name}</a> : <a href="/login">LOGIN</a>}
                </Space>
            </Header>
            <Content
                style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                }}
            >
                <QuestPage />

            </Content>
        </Layout>
    </Layout>
}

export default App