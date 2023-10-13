import { Table } from "antd";
import { useState } from "react";
import { QuestDetailComponent } from "./Quest.Detail.Component";
import { Quest } from "./types/Quest.types";

export function QuestListComponent({ quests }: { quests: Quest[] }) {
    const [now] = useState(new Date());
    const [questId, setQuestId] = useState<number>(0);
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
        if (to > now) {
            const formattedDate = new Intl.DateTimeFormat("ko-KR", {
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
            }).format(now.getTime() - to);
            return formattedDate;
        }
    };

    return (
        <div>
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
                                        <>기간 만료</>
                                    ) : (
                                        <>남은시간 : {time(r.to)}</>
                                    )}
                                </>
                            );
                        },
                    },
                ]}
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
