import React, { useEffect, useState } from 'react'
import { QuestListComponent } from './Quest.List.Component'
import QuestRepository from './Quest.Repository';
import { Quest } from './types/Quest.types';
// import { Quest } from './Quest.Item.Props';

export function QuestPage({ id }: { id: number }) {

    const [quests, setQuests] = useState<Quest[]>([]);

    // 컴포넌트 불러지면 실행하는 함수
    useEffect(() => {
        getApi();
    }, []);

    const getApi = async () => {
        const quests = await QuestRepository.getAll()
        setQuests(quests)
    }

    console.log(quests)

    return (
        <QuestListComponent quests={quests} />
    )
}

