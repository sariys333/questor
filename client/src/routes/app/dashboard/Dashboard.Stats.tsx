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

    const active = stats?.quests?.filter(
        (q) => !q.completed && dayjs(q.to).isAfter(today)
    );

    const completedByDay = () => {
        return stats?.quests?.filter(
            (q) =>
                q.completed &&
                dayjs(q.completedAt).add(stats.dayOption, "day").isAfter(today)
        );
    };

    const expiredByDay = () => {
        return stats?.quests?.filter(
            (q) =>
                !q.completed &&
                dayjs(q.to).add(stats.dayOption, "day").isAfter(today)
        );
    };

    console.log(today);

    const activatePercent = () => {
        if (stats.quests && active) {
            return (active.length / stats.quests.length) * 100;
        } else {
            return 0;
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
                                        <Space>
                                            <Typography.Title
                                                level={3}
                                                type="warning"
                                            >
                                                {active?.length}
                                            </Typography.Title>
                                            <Typography.Title level={3}>
                                                active quests
                                            </Typography.Title>
                                        </Space>
                                        <Progress
                                            percent={activatePercent()}
                                            showInfo={false}
                                            strokeColor={[MyTheme.warning]}
                                        />
                                        <Flex
                                            justify="flex-end"
                                            style={{ marginTop: 20 }}
                                        >
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
                                        <Flex justify="space-evenly">
                                            <Space>
                                                <Typography.Title
                                                    level={3}
                                                    type="success"
                                                >
                                                    {completedByDay()?.length}
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
                                                    {expiredByDay()?.length}
                                                </Typography.Title>
                                                <Typography.Title level={3}>
                                                    expired
                                                </Typography.Title>
                                            </Space>
                                        </Flex>
                                        <Progress
                                            percent={100}
                                            success={{
                                                percent:
                                                    completedByDay()?.length,
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
