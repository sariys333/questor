import { Flex, Table, Typography } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detail, fetchQuestByQuestId } from "../store/Quest.Slice";
import store, { AppState } from "../store/Store";
import { QuestCalendar } from "./Quest.Calendar";
import { QuestDetailComponent } from "./Quest.Detail.Component";
import { CategoryEmojiMap } from "./types/Quest.types";

const { Title } = Typography;

export function QuestListComponent() {
    // const [events, setEvents] = useState<GenericEvent[]>();

    const quests = useSelector((state: AppState) => state.quest.list.list);
    const showDetail = useSelector((state: AppState) => state.quest.showDetail);
    const dispatch = useDispatch();

    const [now, setNow] = useState<Date>();

    useEffect(() => {
        setNow(new Date());
    }, [quests || showDetail]);

    const onClick = (e: any) => {
        const questId: string = e.target.id;
        if (questId) {
            store.dispatch(fetchQuestByQuestId(questId));
        }
    };

    const time = (to: Date) => {
        if (now && to > now) {
            const formattedDate = dayjs(now.getTime()).to(to);
            return formattedDate;
        } else if (now && to < now) {
            const formattedDate = dayjs(to).from(now.getTime());
            return formattedDate;
        }
    };

    return (
        <div>
            <Flex justify="flex-end" style={{ margin: 5 }}>
                <Title level={3}>
                    <Link to={"/quest/create"}>CREATE</Link>
                </Title>
            </Flex>
            {/* <QuestCalendar /> */}
            <Table
                columns={[
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
                        title: "카테고리",
                        dataIndex: "category",
                        render: (text, r) => CategoryEmojiMap.get(text),
                    },
                    {
                        key: "questId",
                        title: "진행 상태",
                        dataIndex: "completed",
                        render: (v, r, i) => {
                            // console.log(v);
                            // console.log(r);
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
                loading={quests == undefined}
                dataSource={quests}
                pagination={{
                    defaultPageSize: 5,
                }}
            />
            {showDetail ? <QuestDetailComponent /> : <></>}
        </div>
    );
}
