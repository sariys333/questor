import { Flex, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { QuestDetailComponent } from "./Quest.Detail.Component";
import { CategoryEmojiMap, Quest } from "./types/Quest.types";
import dayjs from "dayjs";
import QuestRepository from "../repositories/Quest.Repository";
import { Link } from "react-router-dom";

const { Title } = Typography;

export function QuestListComponent() {
    const [quests, setQuests] = useState<Quest[]>();

    // 컴포넌트 불러지면 실행하는 함수
    useEffect(() => {
        getApi();
    }, []);

    const getApi = async () => {
        const quests = await QuestRepository.getAll();
        setQuests(quests);
    };

    console.log(quests);
    const [now] = useState(new Date());
    const [questId, setQuestId] = useState<string>("");
    const [detail, setDetail] = useState(false);

    const onClick = (e: any) => {
        setQuestId(e.target.id);
        if (e.target.id > 0) {
            setDetail(true);
        } else {
            setDetail(false);
        }
    };

    const time = (to: any) => {
        console.log(to);
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
            <Table
                columns={[
                    {
                        key: "questId",
                        title: "내용",
                        dataIndex: "content",
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
