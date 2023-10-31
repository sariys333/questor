import {
    Badge,
    BadgeProps,
    Button,
    Calendar,
    CalendarProps,
    Flex,
    Popover,
    Tooltip,
    Typography,
    theme,
} from "antd";
import { Dayjs } from "dayjs";
import { useSelector } from "react-redux";
import { AppState } from "../../../store/Store";
import { Category, Quest, UserQuestDetail } from "./types/Quest.types";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

export function QuestCalendar() {
    const state = useSelector((state: AppState) => state.quest.listComp);
    const navigate = useNavigate();
    const { list, loading } = state;

    const {
        token: { colorWarning, colorError, colorSuccess },
    } = theme.useToken();

    const getListData = (value: Dayjs) => {
        if (list) {
            const end =
                list && list.length > 0
                    ? list.filter((quest) => value.isSame(quest.to, "day"))
                    : [];

            const start =
                list && list.length > 0
                    ? list.filter(
                          (quest) => value.isSame(quest.from, "day")
                          // && dayjs() < dayjs(quest.from)
                      )
                    : [];

            return {
                start,
                end,
            };
        }
    };

    const getMonthData = (value: Dayjs) => {
        if (list) {
            const expired =
                list && list.length > 0
                    ? list.filter(
                          (quest) =>
                              !quest.completed &&
                              value.isSame(quest.to, "month") &&
                              dayjs(quest.to).isBefore(dayjs())
                      )
                    : [];
            const active =
                list && list.length > 0
                    ? list.filter(
                          (quest) =>
                              !quest.completed &&
                              value.isSame(quest.to, "month") &&
                              dayjs(quest.to).isAfter(dayjs())
                      )
                    : [];

            const compelted =
                list && list.length > 0
                    ? list.filter(
                          (quest) =>
                              quest.completed &&
                              value.isSame(quest.completedAt, "month")
                      )
                    : [];

            return {
                expired,
                active,
                compelted,
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

    const monthCellRender = (value: Dayjs) => {
        const monthData = getMonthData(value);
        return monthData ? (
            <Flex vertical>
                {monthData.active.length != 0 && (
                    <Button
                        size="small"
                        style={{
                            width: "90%",
                            margin: 3,
                            backgroundColor: colorWarning,
                            color: "black",
                        }}
                    >
                        {monthData.active.length} 진행중
                    </Button>
                )}
                {monthData.expired.length != 0 && (
                    <Button
                        size="small"
                        style={{
                            width: "90%",
                            margin: 3,
                            backgroundColor: colorError,
                            color: "black",
                        }}
                    >
                        {monthData.expired.length} 만료
                    </Button>
                )}
                {monthData.compelted.length != 0 && (
                    <Button
                        size="small"
                        style={{
                            width: "90%",
                            margin: 3,
                            backgroundColor: colorSuccess,
                            color: "black",
                        }}
                    >
                        {monthData.compelted.length} 성공
                    </Button>
                )}
            </Flex>
        ) : null;
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
        if (info.type === "month") return monthCellRender(current);
        return info.originNode;
    };

    return (
        <div style={{ marginBottom: 30, marginTop: 30 }}>
            <Calendar cellRender={cellRender} />
        </div>
    );
}
