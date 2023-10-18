import {
    DashboardOutlined,
    PlayCircleOutlined,
    PlusCircleOutlined,
    QuestionCircleOutlined,
} from "@ant-design/icons";
import {
    Affix,
    Avatar,
    Badge,
    Flex,
    Layout,
    Menu,
    Typography,
    theme,
} from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import store, { AppState } from "../../store/Store";
import { getCurrentUser } from "../../store/User.Slice";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

export function App() {
    useEffect(() => {
        store.dispatch(getCurrentUser());
    }, []);
    const user = useSelector((state: AppState) => state.user);

    const navigate = useNavigate();
    const {
        token: { colorBgContainer, colorBorder },
    } = theme.useToken();

    const getMenu = () => {
        // console.log(user);
        if (user.user == undefined) {
            // console.log("publicMenu");
            return publicMenu;
        }
        // console.log("userMenu");
        return userMenu;
    };
    // console.log(user);

    const createMenuItem = (title: string, key: string, icon: JSX.Element) => {
        return {
            style: { paddingLeft: 22, paddingTop: 5 },
            title,
            key,
            icon: icon,
        };
    };

    const publicMenu = [
        createMenuItem(
            "시작",
            "/start",
            <PlayCircleOutlined style={{ fontSize: 30 }} />
        ),
        createMenuItem(
            "퀘스트",
            "/quest",
            <QuestionCircleOutlined style={{ fontSize: 30 }} />
        ),
    ];

    const userMenu = [
        createMenuItem(
            "홈",
            "/",
            <DashboardOutlined style={{ fontSize: 30 }} />
        ),
        createMenuItem(
            "내 퀘스트",
            "/quest",
            <QuestionCircleOutlined style={{ fontSize: 30 }} />
        ),
        createMenuItem(
            "퀘스트 생성",
            "/quest/create",
            <PlusCircleOutlined style={{ fontSize: 30 }} />
        ),
    ];

    const today = dayjs();
    const active = user?.quests?.filter(
        (q) => !q.completed && dayjs(q.to).isAfter(today)
    );

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
                                navigate(selected.key);
                            }}
                            style={{ height: "100%", border: "none" }}
                            mode="inline"
                            inlineCollapsed={true}
                            defaultSelectedKeys={["/"]}
                            items={getMenu()}
                        />
                        <Link
                            to={user.user ? "/setting" : "/login"}
                            style={{
                                fontFamily: "Young Serif",
                                marginBottom: 10,
                            }}
                        >
                            {user.user ? (
                                <Badge
                                    count={active?.length}
                                    overflowCount={99}
                                    color="yellow"
                                >
                                    <Avatar
                                        shape="square"
                                        size={"large"}
                                        style={{ fontSize: 20 }}
                                    >
                                        {user.user?.username?.charAt(0)}
                                    </Avatar>
                                </Badge>
                            ) : (
                                "login"
                            )}
                        </Link>
                    </Flex>
                </Affix>
            </Sider>
            <Layout>
                <Content
                    style={{
                        padding: 24,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}

export default App;
