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
} from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MyTheme } from "../../..";
import { fetchQuestsByUserId, selectChange } from "../../../store/Dash.Slice";
import store, { AppState } from "../../../store/Store";
import { userQuests } from "../../../store/User.Slice";

export const DashboardStats = () => {
    const user = useSelector((state: AppState) => state.user);
    const stats = useSelector((state: AppState) => state.dash.dashStats);
    const dispatch = useDispatch();

    useEffect(() => {
        // console.log(user);
        if (user.user != undefined) {
            store.dispatch(fetchQuestsByUserId(user.user.userId));
            // store.dispatch(userQuests());
        }
    }, [stats.quests == undefined]);

    console.log(user.quests);
    console.log(stats.quests);
    console.log(stats.dayOption);

    const today = dayjs().valueOf();

    const nonActiveByDay = () => {
        return stats?.quests?.filter(
            (q) =>
                q.completed ||
                dayjs(q.to).add(stats.dayOption, "day").isBefore(today)
        );
    };
    const nonActive = nonActiveByDay()?.length;

    const activeByDay = () => {
        return stats?.quests?.filter(
            (q) =>
                !q.completed &&
                dayjs(q.to).add(stats.dayOption, "day").isAfter(today)
        );
    };
    const active = activeByDay()?.length;

    const completedByDay = () => {
        return stats?.quests?.filter(
            (q) =>
                q.completed &&
                dayjs(q.completedAt).add(stats.dayOption, "day").isAfter(today)
        );
    };
    const completed = completedByDay()?.length;

    const expiredByDay = () => {
        return stats?.quests?.filter(
            (q) =>
                !q.completed &&
                dayjs(q.to).add(stats.dayOption, "day").isAfter(today)
        );
    };
    const expired = expiredByDay()?.length;

    const getPercent = (left?: number, right?: number) => {
        if (left && right) {
            return (left / right) * 100;
        } else {
            return 100;
        }
    };

    return (
        <>
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
                                                    dispatch(selectChange(day));
                                                }}
                                                options={[
                                                    { value: 7, label: "7일" },
                                                    {
                                                        value: 30,
                                                        label: "30일",
                                                    },
                                                ]}
                                            ></Select>
                                        </Flex>
                                        <Space>
                                            <Typography.Title
                                                level={3}
                                                type="warning"
                                            >
                                                {active}
                                            </Typography.Title>
                                            <Typography.Title level={3}>
                                                active quests
                                            </Typography.Title>
                                        </Space>
                                        <Progress
                                            percent={getPercent(
                                                nonActive,
                                                active
                                            )}
                                            showInfo={false}
                                            strokeColor={[MyTheme.warning]}
                                        />
                                        <Flex justify="space-evenly">
                                            <Space>
                                                <Typography.Title
                                                    level={3}
                                                    type="success"
                                                >
                                                    {completed}
                                                </Typography.Title>
                                                <Typography.Title level={3}>
                                                    done
                                                </Typography.Title>
                                            </Space>

                                            <Space>
                                                <Typography.Title
                                                    level={3}
                                                    type="danger"
                                                >
                                                    {expired}
                                                </Typography.Title>
                                                <Typography.Title level={3}>
                                                    expired
                                                </Typography.Title>
                                            </Space>
                                        </Flex>
                                        <Progress
                                            percent={getPercent(
                                                expired,
                                                completed
                                            )}
                                            success={{
                                                percent: completed,
                                            }}
                                            strokeColor={[MyTheme.error]}
                                            showInfo={false}
                                        />
                                    </Flex>
                                );
                            }}
                        />
                    </Card>
                </Col>
            </Row>
        </>
    );
};
