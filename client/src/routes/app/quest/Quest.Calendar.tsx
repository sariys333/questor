import {
    Badge,
    BadgeProps,
    Button,
    Calendar,
    CalendarProps,
    Tooltip,
} from "antd";
import { Dayjs } from "dayjs";
import { useSelector } from "react-redux";
import { AppState } from "../../../store/Store";
import { UserQuestDetail } from "./types/Quest.types";
import { useNavigate } from "react-router-dom";

export function QuestCalendar() {
    const state = useSelector((state: AppState) => state.quest.listComp);
    const navigate = useNavigate();

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
                const title = quest.title;
                const tooltip = "만료";
                const questId = quest.questId;
                return {
                    type,
                    title,
                    tooltip,
                    questId,
                };
            });

            const fromList = questsFrom.map((quest) => {
                const type = setEventType(quest);
                const title = quest.title;
                const tooltip = "시작";
                const questId = quest.questId;
                return {
                    type,
                    title,
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
            title: string;
            tooltip: string;
            questId: string;
        }[]
    ) => {
        return list.map((item, index) => (
            <li
                key={index}
                onClick={() => navigate(`/quest/view/${item.questId}`)}
            >
                {/* <Tooltip
                    placement="top"
                    title={item.tooltip}
                    style={{ top: "3%" }}
                > */}
                <Button
                    size="small"
                    style={{
                        width: "100%",
                        border: 0,
                        boxShadow: "none",
                        marginBottom: 1,
                    }}
                >
                    {item.title}
                </Button>
                {/* </Tooltip> */}
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
