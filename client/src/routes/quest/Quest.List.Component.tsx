import { Flex, Table, Typography } from "antd";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    changePageTitle,
    fetchQuestByQuestId,
    fetchQuestsByUserId,
} from "../../store/Quest.Slice";
import store, { AppState } from "../../store/Store";
import { CategoryEmojiMap } from "./types/Quest.types";
import { useEffect } from "react";

const { Title } = Typography;

export function QuestListComponent() {
    // const [events, setEvents] = useState<GenericEvent[]>();

    const state = useSelector((state: AppState) => state.quest.listComp);
    const user = useSelector((state: AppState) => state.user.user);
    const { list, loading, combined } = state;

    const now = new Date(Date.now());

    useEffect(() => {
        store.dispatch(changePageTitle("목록"));
        store.dispatch(fetchQuestsByUserId(user?.userId));
    }, []);

    console.log(combined);

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

    return (
        <div>
            {/* <Flex justify="flex-end" style={{ margin: 5 }}>
                <Title level={3}>
                <Link to={"/quest/create"}>CREATE</Link>
                </Title>
            </Flex> */}
            {/* <QuestCalendar /> */}
            <Table
                loading={loading == undefined}
                dataSource={list}
                pagination={{
                    defaultPageSize: 5,
                }}
                columns={[
                    {
                        key: "questId",
                        title: "카테고리",
                        dataIndex: "category",
                        render: (text, r) => CategoryEmojiMap.get(text),
                    },
                    {
                        key: "questId",
                        title: "내용",
                        dataIndex: "content",
                        ellipsis: true,
                        render: (text, r) => (
                            <a onClick={onClick} id={`${r.questId}`}>
                                {text}
                            </a>
                        ),
                    },
                    {
                        key: "questId",
                        title: "진행 상태",
                        dataIndex: "completed",
                        render: (v, r, i) => {
                            return v ? (
                                <>{r.completedAt}</>
                            ) : (
                                <>
                                    {now && r.to < now ? (
                                        <>기간 만료 : {time(r.to)}</>
                                    ) : (
                                        <>남은시간 : {time(r.to)}</>
                                    )}
                                </>
                            );
                        },
                    },
                ]}
            />
        </div>
    );
}
