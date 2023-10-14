import React, { useEffect, useState } from "react";
import { QuestListComponent } from "./Quest.List.Component";
import QuestRepository from "../repositories/Quest.Repository";
import { Quest } from "./types/Quest.types";
import { QuestCreateComponent } from "./Quest.Create.Component";
import { Link, Outlet } from "react-router-dom";

// import { Quest } from './Quest.Item.Props';
import { WeeklyCalendar } from "antd-weekly-calendar";
import { GenericEvent } from "antd-weekly-calendar/dist/components/types";

export function QuestCalendar({ quests }: { quests: Quest[] }) {
    const events: GenericEvent[] = quests.map((quest) => ({
        eventId: quest.questId,
        startTime: quest.from,
        endTime: quest.to,
        title: quest.category,
        backgroundColor: quest.completed ? "green" : "#d87a16",
    }));

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                marginBottom: 20,
            }}
        >
            <WeeklyCalendar
                events={events}
                weekends={true}
                onEventClick={(event) => console.log(event)}
            />
        </div>
    );
}
