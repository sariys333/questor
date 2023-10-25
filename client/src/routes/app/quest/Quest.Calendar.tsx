import { Badge, BadgeProps, Calendar, CalendarProps, Tooltip } from "antd";
import { Dayjs } from "dayjs";
import { useSelector } from "react-redux";
import { AppState } from "../../store/Store";
import { Category, Quest, UserQuestDetail } from "./types/Quest.types";

export function QuestCalendar() {
    const state = useSelector((state: AppState) => state.quest.calendarComp);

    const getListData = (value: Dayjs) => {
        if (state.list) {
            const questsTo = state.list.filter((quest) =>
                value.isSame(quest.to, "day")
            );

            const questsFrom = state.list.filter((quest) =>
                value.isSame(quest.from, "day")
            );

            const toList = questsTo.map((quest) => {
                const type = setEventType(quest);
                // const content = quest.category;
                const tooltip = "만료";
                const questId = quest.questId;
                return {
                    type,
                    // content,
                    tooltip,
                    questId,
                };
            });

            const fromList = questsFrom.map((quest) => {
                const type = setEventType(quest);
                // const content = quest.category;
                const tooltip = "시작";
                const questId = quest.questId;
                return {
                    type,
                    // content,
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

    const setEventType = (quest: UserQuestDetail) => {
        let type = "warning";
        if (quest.completed) {
            type = "success";
        } else if (!quest.completed && quest.to < new Date()) {
            type = "error";
        }
        return type;
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
                    {/* {listData ? listToData(listData.fromList) : ""}
                    {listData ? listToData(listData.toList) : ""} */}
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
        return info.originNode;
    };

    return (
        <div style={{ marginBottom: 30 }}>
            <Calendar cellRender={cellRender} />
        </div>
    );
}
