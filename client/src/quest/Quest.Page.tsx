import React, {useEffect, useState} from 'react'
import {QuestListComponent} from './Quest.List.Component'
import QuestRepository from '../repositories/Quest.Repository';
import {Quest} from './types/Quest.types';
import {QuestCreateComponent} from './Quest.Create.Component';
import {Link} from 'react-router-dom';

// import { Quest } from './Quest.Item.Props';

export function QuestPage() {

    const [quests, setQuests] = useState<Quest[]>([]);
    const [status, setStatus] = useState(0);

    // 컴포넌트 불러지면 실행하는 함수
    useEffect(() => {
        // getApi();
    }, []);

    const getApi = async () => {
        const quests = await QuestRepository.getAll()
        setQuests(quests)
    }

    const create = () => {
        setStatus(1)
    }

    const cancel = () => {
        setStatus(0)
    }


    console.log(quests)

    return (
        <>
            {status == 0 ? <Link to={"/quest/create"} onClick={create}>CREATE</Link> : <Link to={"/quest/"} onClick={cancel}>CANCEL</Link>}
            {status == 0 ? <QuestListComponent quests={quests} /> : <QuestCreateComponent />}
        </>
    )
}

