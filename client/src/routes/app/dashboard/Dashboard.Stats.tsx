import react, { useEffect } from "react";
import { Row, Col, Card, Statistic, Space, Typography } from "antd";
import { ArrowDownOutlined, ExclamationOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { AppState } from "../../../store/Store";
import store from "../../../store/Store";
import { userQuests } from "../../../store/User.Slice";
import dayjs from "dayjs";

export const DashboardStats = () => {
    const user = useSelector((state: AppState) => state.user);

    useEffect(() => {
        console.log(user);
        if (user.user != undefined) {
            store.dispatch(userQuests());
        }
    }, [user.quests == undefined]);

    const today = dayjs();
    const active = user?.quests?.filter(
        (q) => !q.completed && dayjs(q.to).isAfter(today)
    );

    const recentlyExpired = user?.quests?.filter(
        (q) => !q.completed && dayjs(q.to).isBefore(today)
    );

    const recentlyCompleted = user?.quests?.filter(
        (q) => q.completed && dayjs(q.completedAt).add(7, "day").isAfter(today)
    );
    console.log(active);
    return (
        <>
            <Row gutter={16}>
                <Col span={6}>
                    <Card bordered={false}>
                        <Statistic
                            title="In progress.."
                            valueRender={() => {
                                return (
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
                                );
                            }}
                            // valueStyle={{ color#3f860: "0" }}
                            // prefix={<ExclamationOutlined />}
                            // suffix="개 진행중"
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card bordered={false}>
                        <Statistic
                            title="Last 7 days"
                            valueRender={() => {
                                return (
                                    <Space>
                                        <Typography.Title
                                            level={3}
                                            type="success"
                                        >
                                            {recentlyCompleted?.length}
                                        </Typography.Title>
                                        <Typography.Title level={3}>
                                            done
                                        </Typography.Title>
                                        <Typography.Title
                                            level={3}
                                            type="danger"
                                        >
                                            {recentlyExpired?.length}
                                        </Typography.Title>
                                        <Typography.Title level={3}>
                                            Expired
                                        </Typography.Title>
                                    </Space>
                                );
                            }}
                        />
                    </Card>
                </Col>
            </Row>
        </>
    );
};
