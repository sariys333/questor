import {
    Badge,
    BadgeProps,
    Button,
    Calendar,
    CalendarProps,
    Popover,
    Tooltip,
    theme,
} from "antd";
import { Dayjs } from "dayjs";
import { useSelector } from "react-redux";
import { AppState } from "../../../store/Store";
import { Category, Quest, UserQuestDetail } from "./types/Quest.types";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

export function QuestCalendar() {
    const state = useSelector((state: AppState) => state.quest.listComp);
    const navigate = useNavigate();
    const { list, loading } = state;

    const {
        token: { colorWarning, colorError, colorSuccess },
    } = theme.useToken();

    const getListData = (value: Dayjs) => {
        if (list) {
            const end = list.filter((quest) => value.isSame(quest.to, "day"));

            const start = list.filter(
                (quest) =>
                    value.isSame(quest.from, "day") &&
                    dayjs() < dayjs(quest.from)
            );

            return {
                start,
                end,
            };
        }
    };

    const dateCellRender = (value: Dayjs) => {
        const listData = getListData(value);
        return (
            <>
                <ul
                    className="events"
                    style={{ listStyleType: "none", paddingLeft: 0 }}
                >
                    {listData ? listToData(listData.start) : ""}
                    {listData ? listToData(listData.end) : ""}
                </ul>
            </>
        );
    };

    const listToData = (list: UserQuestDetail[]) => {
        return list.map((item, index) => (
            <li
                key={item.questId}
                onClick={() => navigate(`/quest/view/${item.questId}`)}
            >
                <Button
                    size="small"
                    style={{
                        width: "90%",
                        margin: 3,
                        backgroundColor: `${
                            item.completed
                                ? colorSuccess
                                : dayjs(item.to) < dayjs()
                                ? colorError
                                : colorWarning
                        }`,
                        color: "black",
                    }}
                >
                    {item.title}
                </Button>
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
