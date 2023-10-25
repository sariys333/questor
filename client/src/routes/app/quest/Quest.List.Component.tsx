import { Table, TableColumnsType, Typography } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
    changePageTitle,
    fetchQuestByQuestId,
    fetchQuestsByUserId,
} from "../../store/Quest.Slice";
import store, { AppState } from "../../store/Store";
import {
    EditableObjective,
    Objective,
    UserQuestDetail,
} from "./types/Quest.types";

const { Title } = Typography;

export function QuestListComponent() {
    // const [events, setEvents] = useState<GenericEvent[]>();

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
            title: "Title",
            dataIndex: "title",
        },
        {
            title: "Completed",
            dataIndex: "completed",
        },
        {
            title: "from",
            dataIndex: "from",
        },
    ];

    // if (list) {
    //     data.push(
    //         ...array.map((item) => {
    //             // const children = Object.values(item.objectives).map(
    //             //     (obj: Object) => {

    //             //     })
    //             // );
    //             return {
    //                 questId: item.questId,
    //                 title: item.title,
    //                 objectives: Object.values(item.objectives).length,
    //                 completed:
    //                     item.to < now
    //                         ? `${time(item.to)} 만료`
    //                         : `${time(item.to)} 만료`,
    //                 children: [
    //                     {
    //                         categoty: item.objectives.category,
    //                     },
    //                 ],
    //             };
    //         })
    //     );
    // }

    // 역할: 확장되는 로우를 만들어줌.
    const expandedRowRender = (record: UserQuestDetail, index: number) => {
        const columns: TableColumnsType<Objective> = [
            { title: "Category", dataIndex: "category" },
            { title: "Content", dataIndex: "content" },
            //   { title: 'Current', dataIndex: 'currentReps'},
        ];
        const data: Objective[] = [];

        // 1. column prop생성
        // 2. 전체 >
        // return Table Component (Objective가 있는 퀘스트들에게 해당 오브젝티브들의 내용)

        Object.entries(record.objectives).forEach((obj) => {
            const [objectiveId, others] = obj;
            data.push(others);
        });
        return <Table columns={columns} dataSource={data} pagination={false} />;
    };

    // 1. 문서 꼼꼼히 안읽음
    // 2. 자신이 멀 만들어야하는지 정의 못 내림
    // 3. 뒤죽박죽으로 코드를 봄
    // 4. 타입을 신경쓰지않음

    const rowExpandable = (data: UserQuestDetail) => {
        if (data.objectives) {
            return true;
        }
        return false;
    };

    return (
        <div>
            {/* <Flex justify="flex-end" style={{ margin: 5 }}>
                <Title level={3}>
                <Link to={"/quest/create"}>CREATE</Link>
                </Title>
            </Flex> */}
            {/* <QuestCalendar /> */}
            <Table
                rowKey={"questId"}
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

// 조건 1. datasource {a: boolean, b: boolean} 의 a와 b가 모두 true
// 조건 2. datasource {c: number, d: number} 의 a의 제곱이 b보다 작으면 true
// 조건 3. datasource "a" 의 A면 true a는 false

const datasourceA = [
    { a: true, b: false },
    { a: true, b: true },
    { a: true, b: false },
    { a: false, b: false },
];

const datasourceB = [
    { a: 0, b: 1 },
    { a: 1, b: 2 },
    { a: 2, b: 4 },
    { a: 5, b: 4 },
];
const datasourceC = ["A", "a", "A", "a", "A"];

const conditionA = (data: { a: boolean; b: boolean }) => {
    return data.a && data.b;
};

const conditionB = (data: { a: number; b: number }) => {
    return data.a * data.a > data.b;
};

const conditionC = (a: number, b: number) => {
    return a * a < b;
};

const test: <T>(datasource: T[], c: (t: T) => boolean) => any = (
    datasource,
    condition
) => {
    return (
        <div>
            {datasource.map((item: any) => {
                let x: boolean = false;
                x = condition(item);
                return <div>{x ? "성공" : "실패"}</div>;
            })}
        </div>
    );
};

test(datasourceA, conditionA);
test(datasourceB, conditionB);
