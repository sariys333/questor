import React, { useEffect, useState } from 'react'
import { QuestListComponent } from './Quest.List.Component'
import { Quest } from './Quest.Item.Props';

export function QuestPage({id}: {id:number}) {

    const baseUrl = 'http://localhost:3001/quest/'+id+'/list?limit=';

    // 빈 배열로 초기화
    const [quests, setQuests] = useState<Quest[]>([]);
    // url 초기화
    const [url, setUrl] = useState<string>(baseUrl+5);
    // 5로 초기화
    const [selValue, setSelValue] = useState<string>('5');

    const onSelChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setSelValue(e.target.value);
        setUrl(baseUrl+selValue)
    }

    // 컴포넌트 불러지면 실행하는 함수
    useEffect (() => {
        console.log("baseUrl : " + baseUrl)
        console.log("selValue : " + selValue)
        console.log("url : " + url)
        getApi(baseUrl+selValue);
    },
    // url 값이 변경될때마다 실행하는 조건 걸기
    [url]);

    const getApi = async (url: string) => {
        const response = await fetch
        (url,{
            method: 'get',
            headers: {'Content-Type': 'application/json'},
           }
        )
        const data = await response.json()
        console.log(data)
        setQuests(data)
    }

    console.log(quests)

    return (
        <div>
            <select value={selValue} onChange={onSelChange}>
                <option>개수 선택</option>
                <option value={5}>5</option>
                <option value={10}>10</option>
            </select>
            <QuestListComponent quest={quests}/>
        </div>
    )
}

