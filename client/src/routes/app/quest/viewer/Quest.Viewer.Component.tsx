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
    changePageTitle,
    changeTime,
    createQuest,
    editableQuest,
    fetchQuestByQuestId,
} from "../../../../store/Quest.Slice";
import store, { AppState } from "../../../../store/Store";
import { CreateQuestParams, EditableObjective } from "../types/Quest.types";
import { QuestViewerObjectiveComponent } from "./Quest.Viewer.Objective.Component";

const { Title } = Typography;

export function QuestViewerComponent({ create }: { create: boolean }) {
    const { questId } = useParams();
    const user = useSelector((state: AppState) => state.user.user);
    const state = useSelector((state: AppState) => state.quest.viewComp);
    const { editable, quest, time, loading } = state;

    useEffect(() => {
        if (!create && questId) {
            store.dispatch(fetchQuestByQuestId(questId));
            console.log(quest);
            checkUserId();
        }
    }, [questId]);

    const checkUserId = () => {
        console.log(user);
        if (user && user.userId == quest?.userId) {
            store.dispatch(editableQuest(true));
            store.dispatch(changePageTitle("수정"));
        } else {
            store.dispatch(editableQuest(false));
            store.dispatch(changePageTitle("상세"));
        }
    };

    if (create) {
        console.log(create);
        store.dispatch(editableQuest(true));
        store.dispatch(changePageTitle("생성"));
    }

    const timeChange = (e: any) => {
        const time = {
            from: e[0].valueOf(),
            to: e[1].valueOf(),
        };
        store.dispatch(changeTime(time));
    };

    const onFinish = (e: any) => {
        console.log(e);
        const objectives: EditableObjective[] = Object.keys(e)
            .filter((key) => key.startsWith("objectives"))
            .map((key) => e[key]);
        console.log(objectives);

        const params: CreateQuestParams = {
            from: e.time[0].toDate(),
            to: e.time[1].toDate(),
        };
        console.log(params);
        store.dispatch(createQuest({ params: params, objectives: objectives }));
    };

    const disabledDate = (days: Dayjs) => {
        if (!editable) {
            return days.year() == dayjs(days).year();
        }
        return days.year() < dayjs().year();
    };

    if (loading) {
        return (
            <Spin tip="Loading" size="large">
                <div className="content" />
            </Spin>
        );
    }

    return (
        <div>
            {!editable ? (
                <Flex gap={"large"} justify="flex-end">
                    <Breadcrumb
                        items={[
                            //
                            {
                                title: (
                                    <Tooltip placement="top" title={"작성자"}>
                                        <a href="#">
                                            {quest ? user?.username : ""}
                                        </a>
                                    </Tooltip>
                                ),
                            },
                            {
                                title: (
                                    <Tooltip placement="top" title={"작성일"}>
                                        <a href="#">
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
            ) : (
                <></>
            )}

            <Form name="quest" layout="vertical" onFinish={onFinish}>
                <Flex gap={"large"}>
                    <Form.Item name={"time"}>
                        <DatePicker.RangePicker
                            bordered={editable}
                            size="small"
                            format="YYYY-MM-DD"
                            onChange={timeChange}
                            value={
                                quest
                                    ? [dayjs(quest.from), dayjs(quest.to)]
                                    : undefined
                            }
                            defaultValue={
                                quest
                                    ? [dayjs(quest.from), dayjs(quest.to)]
                                    : undefined
                            }
                            inputReadOnly={true}
                            disabledDate={disabledDate}
                            allowClear={false}
                        />
                    </Form.Item>
                </Flex>

                <QuestViewerObjectiveComponent />

                {editable ? (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Button type="primary" htmlType="submit">
                            {create ? "생성" : "수정"}
                        </Button>
                    </div>
                ) : (
                    <></>
                )}
            </Form>
        </div>
    );
}
