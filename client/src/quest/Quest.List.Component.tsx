import { Flex, Table, Typography } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { QuestState } from "../redux/Quest.Slice";
import { QuestCalendar } from "./Quest.Calendar";
import { QuestDetailComponent } from "./Quest.Detail.Component";
import { CategoryEmojiMap, Quest } from "./types/Quest.types";

const { Title } = Typography;

export function QuestListComponent() {
    // const [events, setEvents] = useState<GenericEvent[]>();

    const quests = useSelector((state: QuestState) => {
        console.log(state);
        return state.quests;
    });

    const [now] = useState(new Date());
    const [questId, setQuestId] = useState<string>("");
    const [detail, setDetail] = useState(false);

    const onClick = (e: any) => {
        setQuestId(e.target.id);
        if (e.target.id) {
            setDetail(true);
        } else {
            setDetail(false);
        }
    };

    const time = (to: any) => {
        // console.log(to);
        if (to > now) {
            const formattedDate = dayjs(now.getTime()).to(to);
            return formattedDate;
        } else {
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
            <QuestCalendar />
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
                                    {r.to < now ? (
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
            <div>
                {detail ? <QuestDetailComponent questId={questId} /> : <></>}
            </div>
        </div>
    );
}
