import React from 'react'
import { Button, Table } from 'antd';
import { Quest } from './types/Quest.types';

export function QuestListComponent({ quests }: { quests: Quest[] }) {

    return (
        <div>
            <Table
                columns={[{
                    key: "questId",
                    title: "내용",
                    dataIndex: "content"
                }, {
                    key: "questId",
                    title: "",
                    dataIndex: "completed",
                    render: (v, r, i) => {
                        console.log(v)
                        console.log(r)
                        return v ? <>{r.completedAt}</> : <>진행중</>
                    }
                }]}
                dataSource={quests}
                pagination={{
                    defaultPageSize: 5
                }}
            />
        </div>
    )
}
