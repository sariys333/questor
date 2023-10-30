import { Flex, Progress, Table, TableColumnsType, Typography } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
    fetchAllQuests,
    fetchQuestByQuestId,
    fetchUserQuestsByUserId,
} from "../../../store/Quest.Slice";
import store, { AppState } from "../../../store/Store";
import { Objective, UserQuestDetail } from "./types/Quest.types";
import { QuestCalendar } from "./Quest.Calendar";

const { Title } = Typography;

export function QuestListComponent() {
    const state = useSelector((state: AppState) => state.quest.listComp);
    const user = useSelector((state: AppState) => state.user.user);
    const navigate = useNavigate();
    const { list, loading } = state;

    console.log(list);

    const now = new Date(Date.now());

    useEffect(() => {
        if (user) {
            store.dispatch(fetchUserQuestsByUserId());
        } else {
            // store.dispatch(fetchAllQuests());
        }
    }, [user]);

    const onClick = (e: any) => {
        const questId: string = e.target.id;
        if (questId) {
            store.dispatch(fetchQuestByQuestId(questId));
        }
    };

    const getPercetage = (record: UserQuestDetail) => {
        const current = Object.values(record.objectives).filter(
            (obj) => obj.currentReps === obj.targetReps
        ).length;
        const target = Object.values(record.objectives).length;
        return (current / target) * 100;
    };

    const time = (to: Date) => {
        if (now && to > now) {
            return dayjs(now.getTime()).to(to);
        } else if (now && to < now) {
            return dayjs(to).from(now.getTime());
        }
    };

    const columns = [
        {
            title: "제목",
            render: (record: UserQuestDetail) => (
                <Link to={`view/${record.questId}`}>{record.title}</Link>
            ),
        },
        {
            title: "만든이",
            dataIndex: "mastername",
        },
        {
            title: "만료여부",
            width: 130,
            render: (record: UserQuestDetail) =>
                record.completed ? (
                    <Typography.Text type="success">
                        {time(record.completedAt)} 달성
                    </Typography.Text>
                ) : record.to < now ? (
                    <Typography.Text type="danger">
                        {time(record.to)} 만료
                    </Typography.Text>
                ) : (
                    <Typography.Text type="warning">
                        {time(record.to)} 만료
                    </Typography.Text>
                ),
        },
        {
            title: "목표까지",
            width: 350,
            render: (record: UserQuestDetail) => (
                <Progress
                    type="line"
                    percent={getPercetage(record)}
                    format={(percent) =>
                        percent == 100
                            ? "완료"
                            : percent
                            ? `${Math.floor(percent)}%`
                            : ""
                    }
                />
            ),

            // Object.values(record.objectives).filter(
            //     (obj) => obj.currentReps === obj.targetReps
            // ).length,
        },
        // {
        //     title: "목표개수",
        //     width: 110,
        //     render: (record: UserQuestDetail) =>
        //         Object.values(record.objectives).length,
        // },
    ];

    // 역할: 확장되는 로우를 만들어줌.
    const expandedRowRender = (record: UserQuestDetail, index: number) => {
        const columns: TableColumnsType<Objective> = [
            { title: "종류", dataIndex: "category" },
            { title: "내용", dataIndex: "content" },
            {
                title: "목표",
                width: 250,
                render: (r: Objective) => `${r.currentReps} / ${r.targetReps}`,
            },
        ];
        const data: Objective[] = [];

        Object.entries(record.objectives).forEach((obj) => {
            const [objectiveId, others] = obj;
            data.push(others);
        });
        return (
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                key={record.questId}
            />
        );
    };

    const rowExpandable = (data: UserQuestDetail) => {
        if (Object.values(data.objectives).length > 0) {
            return true;
        }
        return false;
    };

    return (
        <div>
<<<<<<< HEAD
            <QuestCalendar />
            <Title level={3}>목록</Title>
            <Flex justify="flex-end" style={{ margin: 5 }}>
                {/* <Title level={3}>
=======
            <Flex justify="space-between" style={{ margin: 5 }}>
                <Title level={3}>목록</Title>
                <Title level={3}>
>>>>>>> a158a01f6a2fbba0dd37e8bc70274f1b579edfb3
                    <Link to={"/quest/create"}>CREATE</Link>
                </Title>
            </Flex>
            <Table
                rowKey={(record) => record.questId}
                loading={loading == undefined}
                dataSource={list}
                pagination={{
                    defaultPageSize: 10,
                }}
                columns={columns}
                expandable={{
                    expandedRowRender,
                    rowExpandable,
                    // defaultExpandedRowKeys: ["0"],
                }}
            />
            <QuestCalendar />
        </div>
    );
}
