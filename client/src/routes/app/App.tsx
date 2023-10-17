import { UserOutlined } from "@ant-design/icons";
import {
    Affix,
    Avatar,
    Badge,
    Button,
    Flex,
    Layout,
    Menu,
    Typography,
    theme,
} from "antd";
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import UserRepository from "../../repositories/User.Repository";
import { User } from "../login/types/User.typs";
import { useSelector } from "react-redux";
import store, { AppState } from "../../store/Store";
import { getCurrentUser } from "../../store/User.Slice";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

export function App() {
    // const [user, setUser] = useState<User>();
    useEffect(() => {
        store.dispatch(getCurrentUser());
    }, []);
    const user = useSelector((state: AppState) => state.user.user);

    const navigate = useNavigate();
    const {
        token: { colorBgContainer, colorBorder },
    } = theme.useToken();

    // const getCurrentUser = async () => {

    //     // const currentUser = await UserRepository.findCurrentUser();
    //     // setUser(currentUser);
    // };
    // const dispatch = useDispatch();

    // if (user) {
    //     console.log(user.name);
    // }
    // console.log(user);

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
                                    title: "퀘스트",
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
                            style={{
                                fontFamily: "Young Serif",
                                marginBottom: 10,
                            }}
                        >
                            {user ? (
                                <Badge count={99} overflowCount={10}>
                                    <Avatar
                                        shape="square"
                                        size={"large"}
                                        icon={<UserOutlined />}
                                    ></Avatar>
                                </Badge>
                            ) : (
                                "login"
                            )}
                        </Link>
                    </Flex>
                </Affix>
            </Sider>
            <Layout>
                {/* <Header
                    style={{ padding: 0, background: "transparent" }}
                ></Header> */}
                <Content
                    style={{
                        // margin: "24px 16px",
                        padding: 24,
                        // minHeight: 280,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}

export default App;
