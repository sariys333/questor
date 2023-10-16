import {
    Affix,
    Button,
    Flex,
    Layout,
    Menu,
    Space,
    Typography,
    theme,
} from "antd";
import {
    HomeFilled,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import UserRepository from "../../repositories/User.Repository";
import { User } from "../login/types/User.typs";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { QuestPage } from "../../quest/Quest.Page";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

export function App() {
    const [collapsed, setCollapsed] = useState(false);
    const [user, setUser] = useState<User>();

    const navigate = useNavigate();
    const {
        token: { colorBgContainer, colorBorder },
    } = theme.useToken();

    const getCurrentUser = async () => {
        const currentUser = await UserRepository.findCurrentUser();
        setUser(currentUser);
    };

    if (user) {
        console.log(user.name);
    }
    console.log(user);

    useEffect(() => {
        getCurrentUser();
    }, []);

    return (
        <Layout style={{ height: "100%", minHeight: "100vh" }}>
            <Sider
                trigger={null}
                collapsible
                collapsed={true}
                style={{
                    background: colorBgContainer,
                    borderRight: "1px solid",
                    borderColor: colorBorder,
                }}
            >
                <Affix offsetTop={0} style={{ minHeight: "100%" }}>
                    <Flex
                        justify="space-between"
                        vertical
                        style={{ height: "100vh", textAlign: "center" }}
                    >
                        <Typography
                            style={{
                                marginTop: 8,
                                marginBottom: 8,
                                fontFamily: "'Young Serif'",
                            }}
                        >
                            Questor
                        </Typography>
                        <Menu
                            onSelect={(selected) => {
                                // console.log(selected);
                                navigate(selected.key);
                            }}
                            style={{ height: "100%", border: "none" }}
                            // theme="dark"
                            mode="inline"
                            defaultSelectedKeys={["/"]}
                            items={[
                                {
                                    title: "홈",
                                    key: "/",
                                    style: {
                                        padding: 0,
                                        height: 50,
                                    },
                                    icon: (
                                        <Button
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                            }}
                                            size={"large"}
                                        >
                                            <Typography
                                                style={{
                                                    marginTop: 0,
                                                    marginBottom: 0,
                                                    fontFamily: "'Young Serif'",
                                                }}
                                            >
                                                Home
                                            </Typography>
                                        </Button>
                                    ),
                                },
                                {
                                    title: "내 퀘스트",
                                    key: "/quest/create",
                                    style: {
                                        padding: 0,
                                        height: 50,
                                    },
                                    icon: (
                                        <Button
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                            }}
                                            size={"large"}
                                        >
                                            <Typography
                                                style={{
                                                    margin: 0,
                                                    fontFamily: "'Young Serif'",
                                                }}
                                            >
                                                Create
                                            </Typography>
                                        </Button>
                                    ),
                                },
                                {
                                    title: "test",
                                    key: "test",
                                    style: {
                                        padding: 0,
                                        height: 50,
                                    },
                                    icon: (
                                        <Button
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                            }}
                                            size={"large"}
                                        >
                                            <Typography
                                                style={{
                                                    margin: 0,
                                                    fontFamily: "'Young Serif'",
                                                }}
                                            >
                                                Something
                                            </Typography>
                                        </Button>
                                    ),
                                },
                            ]}
                        />

                        <Link
                            to={user ? "/setting" : "/login"}
                            style={{ margin: 10, fontFamily: "Young Serif" }}
                        >
                            {user ? "SETTINGS" : "login"}
                        </Link>
                    </Flex>
                </Affix>
            </Sider>
            <Layout>
                <Header
                    style={{ padding: 0, background: "transparent" }}
                ></Header>
                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}

export default App;
