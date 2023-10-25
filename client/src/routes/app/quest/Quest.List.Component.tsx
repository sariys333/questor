import { Flex, Table, TableColumnsType, Typography } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
    changePageTitle,
    fetchQuestByQuestId,
    fetchQuestsByUserId,
} from "../../../store/Quest.Slice";
import store, { AppState } from "../../../store/Store";
import { Objective, UserQuestDetail } from "./types/Quest.types";
import { Link } from "react-router-dom";

const { Title } = Typography;

export function QuestListComponent() {
    const state = useSelector((state: AppState) => state.quest.listComp);
    const user = useSelector((state: AppState) => state.user.user);
    const { list, loading } = state;

    const now = new Date(Date.now());

    useEffect(() => {
        store.dispatch(changePageTitle("목록"));
        store.dispatch(fetchQuestsByUserId(user?.userId));
    }, []);

    const onClick = (e: any) => {
        const questId: string = e.target.id;
        if (questId) {
            store.dispatch(fetchQuestByQuestId(questId));
        }
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
            dataIndex: "title",
        },
        {
            title: "만든이",
            dataIndex: "mastername",
        },
        {
            title: "만료여부",
            width: 130,
            render: (record: UserQuestDetail) =>
                record && record.to < now
                    ? `${time(record.to)} 만료`
                    : `${time(record.to)} 만료`,
        },
        {
            title: "완료한 목표",
            width: 110,
            render: (record: UserQuestDetail) =>
                Object.values(record.objectives).filter(
                    (obj) => obj.currentReps === obj.targetReps
                ).length,
        },
        {
            title: "목표개수",
            width: 110,
            render: (record: UserQuestDetail) =>
                Object.values(record.objectives).length,
        },
    ];

    // 역할: 확장되는 로우를 만들어줌.
    const expandedRowRender = (record: UserQuestDetail, index: number) => {
        const columns: TableColumnsType<Objective> = [
            { title: "종류", dataIndex: "category" },
            { title: "내용", dataIndex: "content" },
            { title: "현재", dataIndex: "currentReps", width: 110 },
            { title: "목표", dataIndex: "targetReps", width: 110 },
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
            <Flex justify="flex-end" style={{ margin: 5 }}>
                <Title level={3}>
                    <Link to={"/quest/create"}>CREATE</Link>
                </Title>
            </Flex>
            <Table
                rowKey={(record) => record.questId}
                loading={loading == undefined}
                dataSource={list}
                pagination={{
                    defaultPageSize: 5,
                }}
                columns={columns}
                expandable={{
                    expandedRowRender,
                    rowExpandable,
                    defaultExpandedRowKeys: ["0"],
                }}
            />
        </div>
    );
}
