import {
    Breadcrumb,
    Button,
    DatePicker,
    Flex,
    Form,
    Spin,
    Tooltip,
    Typography,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    changeTime,
    createQuest,
    fetchQuestByQuestId,
} from "../../../../store/Quest.Slice";
import store, { AppState } from "../../../../store/Store";
import { CreateQuestParam, EditableObjective } from "../types/Quest.types";
import { QuestViewerObjectiveComponent } from "./Quest.Viewer.Objective.Component";

const { Title } = Typography;

export function QuestViewerComponent() {
    const { questId } = useParams();
    const user = useSelector((state: AppState) => state.user.user);
    const state = useSelector((state: AppState) => state.quest.viewComp);
    const { quest, loading, editing } = state;

    const editable = user && user.userId == quest?.userId;

    useEffect(() => {
        if (questId) {
            store.dispatch(fetchQuestByQuestId(questId));
        }
    }, [questId]);

    const onFinish = (e: any) => {};

    const disabledDate = (days: Dayjs) => {
        if (!editable) {
            return days.year() == dayjs(days).year();
        }
        return days.year() < dayjs().year();
    };

    if (loading || !quest) {
        return (
            <Spin tip="Loading" size="large">
                <div className="content" />
            </Spin>
        );
    }

    return (
        <div>
            {!editing ? (
                <Flex gap={"large"} justify="space-between">
                    <Typography.Title level={2}>
                        {quest?.title}
                    </Typography.Title>
                    <Breadcrumb
                        items={[
                            {
                                title: (
                                    <Tooltip placement="top" title={"작성자"}>
                                        <a>{quest?.username}</a>
                                    </Tooltip>
                                ),
                            },
                            {
                                title: (
                                    <Tooltip placement="top" title={"작성일"}>
                                        <a>
                                            {quest?.createdAt
                                                ? dayjs(
                                                      quest?.createdAt
                                                  ).format("YYYY-MM-DD")
                                                : ""}
                                        </a>
                                    </Tooltip>
                                ),
                            },
                        ]}
                    />
                </Flex>
            ) : undefined}
            <Form name="quest" layout="vertical" onFinish={onFinish}>
                <Flex gap={"large"}>
                    <Form.Item name={"time"}>
                        <DatePicker.RangePicker
                            bordered={editing}
                            size="small"
                            format="YYYY-MM-DD"
                            value={[dayjs(quest?.from), dayjs(quest?.to)]}
                            inputReadOnly={true}
                            disabledDate={disabledDate}
                            allowClear={false}
                        />
                    </Form.Item>
                </Flex>

                <QuestViewerObjectiveComponent />

                {editable ? (
                    <Flex justify="end">
                        <Button> 수정</Button>
                    </Flex>
                ) : (
                    <></>
                )}
            </Form>
        </div>
    );
}
