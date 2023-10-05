import React from 'react'
import { QuestItemComponent } from './Quest.Item.Component';
import { Quest } from './Quest.Item.Props';

export function QuestListComponent({quest} : QuestProps) {

    return (
        <div>
            {quest.map((item: Quest, index: number) => (
                <QuestItemComponent 
                    key={index}
                    userId={item.userId}
                    questId={item.questId}
                    content={item.content}
                    completed={item.completed}
                    completedAt={item.completedAt}
                    from={item.from}
                    to={item.to}/>
            ))}
        </div>
    )
}

type QuestProps = {
    quest: Quest[]
}