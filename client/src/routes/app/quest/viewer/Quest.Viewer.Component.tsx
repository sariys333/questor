import {
    Breadcrumb,
    Button,
    DatePicker,
    Divider,
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
    completingQuest,
    fetchQuestByQuestId,
    fetchUserObjetives,
    fetchUserQuestByQuestId,
    toggleEditQuest,
} from "../../../../store/Quest.Slice";
import store, { AppState } from "../../../../store/Store";
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
            store.dispatch(fetchQuestByQuestId(questId)).then(() => {
                if (user) {
                    store.dispatch(fetchUserQuestByQuestId(questId));
                    store.dispatch(fetchUserObjetives(questId));
                }
            });
        }
    }, [questId, user]);

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

    const checkObjectivesStatus = () => {
        const checked = quest.objectives.filter((obj) => {
            return obj.currentReps === obj.targetReps;
        });
        if (checked.length == quest.objectives.length) {
            return true;
        }
        return false;
    };

    const completeQuest = () => {
        store.dispatch(completingQuest(quest));
    };

    const toggleEditing = () => {
        store.dispatch(toggleEditQuest(""));
    };

    return (
        <div>
            <Flex gap={"large"} justify="space-between">
                <Typography.Title
                    editable={editing ? true : false}
                    level={2}
                    style={{ margin: 0 }}
                >
                    {quest?.title || "제목"}
                </Typography.Title>
                {!editing ? (
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
                ) : undefined}
            </Flex>
            <Divider style={{ marginTop: 8 }} />

            <Form name="quest" layout="vertical" onFinish={onFinish}>
                <Flex gap={"large"}>
                    <Form.Item
                        name={"time"}
                        initialValue={[dayjs(quest.from), dayjs(quest.to)]}
                    >
                        <DatePicker.RangePicker
                            bordered={editing}
                            size="small"
                            format="YYYY-MM-DD"
                            inputReadOnly={true}
                            disabledDate={disabledDate}
                            allowClear={false}
                        />
                    </Form.Item>
                </Flex>

                <QuestViewerObjectiveComponent />

                <Flex justify="end" gap={"small"}>
                    {quest.completed ? (
                        <Button type="dashed">완료됨</Button>
                    ) : (
                        <Button
                            disabled={checkObjectivesStatus() ? false : true}
                            onClick={completeQuest}
                        >
                            완료
                        </Button>
                    )}
                    {editable ? (
                        editing ? (
                            <>
                                <Button>완료</Button>
                                <Button onClick={toggleEditing}>취소</Button>
                            </>
                        ) : (
                            <Button onClick={toggleEditing}>수정</Button>
                        )
                    ) : (
                        <></>
                    )}
                </Flex>
            </Form>
        </div>
    );
}
