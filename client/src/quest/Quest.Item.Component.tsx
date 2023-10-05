import React from 'react'
import { Quest } from './Quest.Item.Props';

export function QuestItemComponent(prop: Quest) {

    return (
        <div>
            <div>{prop.userId}</div>
            <div>{prop.questId}</div>
            <div>{prop.content}</div>
            <div>{prop.completed}</div>
            <div>{prop.completedAt}</div>
            <div>{prop.from}</div>
            <div>{prop.to}</div>
        </div>
    )
}

