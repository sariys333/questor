import {
    Card,
    Col,
    Flex,
    Progress,
    Row,
    Select,
    Space,
    Statistic,
    Typography,
    theme,
} from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestsByUserId, selectChange } from "../../../store/Dash.Slice";
import store, { AppState } from "../../../store/Store";

const { Title, Text } = Typography;

export const DashboardStats = () => {
    const user = useSelector((state: AppState) => state.user);
    const stats = useSelector((state: AppState) => state.dash.dashStats);
    const dispatch = useDispatch();

    const { dayOption, quests } = stats;

    const {
        token: { colorWarning, colorError, colorSuccess },
    } = theme.useToken();

    useEffect(() => {
        if (user.user) {
            store.dispatch(fetchQuestsByUserId());
        }
    }, [quests == undefined, user.user]);

    const today = dayjs();

    const nonActiveByDay = () => {
        return quests && quests.length > 0
            ? quests.filter(
                  (q) =>
                      q.completed ||
                      dayjs(q.to).add(dayOption, "day").isBefore(today)
              )
            : [];
    };
    const nonActive = nonActiveByDay().length;

    const activeByDay = () => {
        return quests && quests.length > 0
            ? quests.filter(
                  (q) =>
                      dayjs(q.to).add(dayOption, "day").isAfter(today) &&
                      !q.completed
              )
            : [];
    };
    const active = activeByDay().length;

    const completedByDay = () => {
        return quests && quests.length > 0
            ? quests.filter(
                  (q) =>
                      q.completed &&
                      dayjs(q.completedAt).add(dayOption, "day").isAfter(today)
              )
            : [];
    };
    const completed = completedByDay().length;

    const expiredByDay = () => {
        return quests && quests.length > 0
            ? quests.filter(
                  (q) =>
                      !q.completed &&
                      dayjs(q.to).add(dayOption, "day").isBefore(today)
              )
            : [];
    };
    console.log(expiredByDay());
    const expired = expiredByDay().length;

    const getPercent = (n1?: number, n2?: number) => {
        if (n1 && n2) {
            return (n1 / (n1 + n2)) * 100;
        } else {
            return 100;
        }
    };

    return (
        <>
            {stats.quests ? (
                <Row gutter={16}>
                    <Col span={16}>
                        <Card bordered={false}>
                            <Statistic
                                title="In progress.."
                                valueRender={() => {
                                    return (
                                        <Flex vertical={true}>
                                            <Flex justify="flex-end">
                                                <Select
                                                    style={{ width: "20%" }}
                                                    defaultValue={7}
                                                    onChange={(day) => {
                                                        dispatch(
                                                            selectChange(day)
                                                        );
                                                    }}
                                                    options={[
                                                        {
                                                            value: 7,
                                                            label: "7일",
                                                        },
                                                        {
                                                            value: 30,
                                                            label: "30일",
                                                        },
                                                    ]}
                                                ></Select>
                                            </Flex>
                                            <Flex justify="center">
                                                <Space>
                                                    <Title
                                                        level={3}
                                                        type="secondary"
                                                    >
                                                        {active + nonActive}
                                                    </Title>
                                                    <Title level={3}>중</Title>
                                                    <Title
                                                        level={3}
                                                        type="warning"
                                                    >
                                                        {active}
                                                    </Title>
                                                    <Title level={3}>
                                                        진행중
                                                    </Title>
                                                </Space>
                                            </Flex>
                                            <Progress
                                                percent={100}
                                                success={{
                                                    percent: getPercent(
                                                        active,
                                                        nonActive
                                                    ),
                                                }}
                                                strokeColor={[colorError]}
                                                showInfo={false}
                                            />
                                            <Flex justify="space-evenly">
                                                <Space>
                                                    <Title
                                                        level={3}
                                                        type="success"
                                                    >
                                                        {completed}
                                                    </Title>
                                                    <Title level={3}>
                                                        성공
                                                    </Title>
                                                </Space>

                                                <Space>
                                                    <Title
                                                        level={3}
                                                        type="danger"
                                                    >
                                                        {expired}
                                                    </Title>
                                                    <Title level={3}>
                                                        만료
                                                    </Title>
                                                </Space>
                                            </Flex>
                                            <Progress
                                                percent={100}
                                                success={{
                                                    percent: getPercent(
                                                        completed,
                                                        expired
                                                    ),
                                                }}
                                                strokeColor={[colorError]}
                                                showInfo={false}
                                            />
                                        </Flex>
                                    );
                                }}
                            />
                        </Card>
                    </Col>
                </Row>
            ) : (
                <></>
            )}
        </>
    );
};
