import { useSelector } from "react-redux";
import { QuestState } from "../redux/Quest.Slice";
import { Badge, BadgeProps, Calendar, CalendarProps, Tooltip } from "antd";
import { Dayjs } from "dayjs";
import { Quest, Category } from "./types/Quest.types";
import { AppState } from "../redux/Store";

export function QuestCalendar() {
    const quests = useSelector((state: AppState) => state.quest.quests);

    const getListData = (value: Dayjs) => {
        if (quests) {
            const questsTo = quests.filter((quest) =>
                value.isSame(quest.to, "day")
            );

            const questsFrom = quests.filter((quest) =>
                value.isSame(quest.from, "day")
            );

            const toList = questsTo.map((quest) => {
                const type = setEventType(quest);
                const content = quest.category;
                const tooltip = "만료";
                const questId = quest.questId;
                return {
                    type,
                    content,
                    tooltip,
                    questId,
                };
            });

            const fromList = questsFrom.map((quest) => {
                const type = setEventType(quest);
                const content = quest.category;
                const tooltip = "시작";
                const questId = quest.questId;
                return {
                    type,
                    content,
                    tooltip,
                    questId,
                };
            });

            return {
                toList,
                fromList,
            };
        }
    };

    const setEventType = (quest: Quest) => {
        let type = "warning";
        if (quest.completed) {
            type = "success";
        } else if (!quest.completed && quest.to < new Date()) {
            type = "error";
        }
        return type;
    };

    const getMonthData = (value: Dayjs) => {
        const monthList = quests.filter((quest) =>
            value.isSame(quest.to, "month")
        );
        if (value.month() === 8) {
            return 1394;
        }
    };

    const monthCellRender = (value: Dayjs) => {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    };

    const onClick = (e: any) => {
        console.log(e.target);
    };

    const dateCellRender = (value: Dayjs) => {
        const listData = getListData(value);
        return (
            <>
                <ul
                    className="events"
                    style={{ listStyleType: "none", paddingLeft: 0 }}
                >
                    {listData ? listToData(listData.fromList) : ""}
                    {listData ? listToData(listData.toList) : ""}
                </ul>
            </>
        );
    };

    const listToData = (
        list: {
            type: string;
            content: Category;
            tooltip: string;
        }[]
    ) => {
        return list.map((item, index) => (
            <li key={index} onClick={onClick}>
                <Tooltip
                    placement="top"
                    title={item.tooltip}
                    style={{ top: "3%" }}
                >
                    <Badge
                        style={{ marginRight: 5 }}
                        status={item.type as BadgeProps["status"]}
                        text={item.content}
                    />
                </Tooltip>
            </li>
        ));
    };

    const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
        if (info.type === "date") return dateCellRender(current);
        // if (info.type === "month") return monthCellRender(current);
        return info.originNode;
    };

    return (
        <div style={{ marginBottom: 30 }}>
            <Calendar cellRender={cellRender} />
        </div>
    );
}
