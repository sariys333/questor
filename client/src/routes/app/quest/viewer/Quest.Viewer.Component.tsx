import {
    Breadcrumb,
    Button,
    DatePicker,
    Divider,
    Flex,
    Form,
    Modal,
    Spin,
    Tooltip,
    Typography,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    completingQuest,
    deleteQuest,
    editQuest,
    fetchQuestByQuestId,
    fetchUserObjetives,
    fetchUserQuestByQuestId,
    toggleEditQuest,
    viewCompTitleChange,
} from "../../../../store/Quest.Slice";
import store, { AppState } from "../../../../store/Store";
import { QuestViewerObjectiveComponent } from "./Quest.Viewer.Objective.Component";
import { CloseOutlined } from "@ant-design/icons";
import { CreateQuestParam, EditQuestParam } from "../types/Quest.types";

const { Title } = Typography;

export function QuestViewerComponent() {
    const { questId } = useParams();
    const user = useSelector((state: AppState) => state.user.user);
    const state = useSelector((state: AppState) => state.quest.viewComp);
    const { quest, loading, editing, success } = state;
    const [form] = Form.useForm();
    const [modal, contextHolder] = Modal.useModal();
    const navigate = useNavigate();

    const editable = user && user.userId == quest?.userId;

    useEffect(() => {
        dispatchAll();
    }, [questId, user, success]);

    const dispatchAll = () => {
        if (questId) {
            store.dispatch(fetchQuestByQuestId(questId)).then(() => {
                if (user) {
                    store.dispatch(fetchUserQuestByQuestId(questId));
                    store.dispatch(fetchUserObjetives(questId));
                }
            });
        }
    };

    const onFinish = (e: any) => {
        if (!quest) return;
        console.log(e);
        const objectives = Object.keys(e)
            .filter((key) => key.startsWith("objectives"))
            .map((key) => e[key])
            .filter((obj) => obj.category && obj.content && obj.targetReps);

        const editQuestParams: EditQuestParam = {
            questId: quest.questId,
            title: quest.title,
            from: e.time[0].toDate(),
            to: e.time[1].toDate(),
            objectives: objectives,
            createdAt: quest.createdAt,
        };

        store.dispatch(editQuest(editQuestParams)).then(() => {
            dispatchAll();
            store.dispatch(toggleEditQuest(""));
        });
    };

    const disabledDate = (days: Dayjs) => {
        if (!editable) {
            return days.year() == dayjs(days).year();
        }
        return days.year() < dayjs().year();
    };

    if (loading || !quest) {
        return (
            <Spin tip="Loading" size="large" style={{ top: "40%" }}>
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

    const titleChange = (e: any) => {
        store.dispatch(viewCompTitleChange(e));
    };

    const openModal = () => {
        modal.confirm({
            title: "주의!",
            content: "삭제시 모든 내용은 복구가 불가능합니다.",
            okText: "삭제",
            cancelText: "취소",
            onOk: applyDelete,
        });
    };

    const applyDelete = () => {
        questId &&
            store.dispatch(deleteQuest(questId)).then((res) => {
                if (res) navigate("/quest");
            });
    };

    return (
        <div>
            <Flex gap={"large"} justify="space-between">
                <Typography.Title
                    editable={{
                        editing: editing ? true : false,
                        onChange: titleChange,
                        triggerType: ["text"],
                    }}
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
                <Flex gap={"large"} justify="space-between">
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
                    {!editing && <Link to={"/quest"}>목록으로</Link>}
                </Flex>

                <QuestViewerObjectiveComponent />

                <Flex justify="end" gap={"small"}>
                    {quest.completed ? (
                        <Button type="dashed" disabled>
                            완료됨
                        </Button>
                    ) : editable ? (
                        editing ? (
                            <>
                                <Button htmlType="submit">적용</Button>
                                <Button onClick={toggleEditing}>취소</Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    disabled={
                                        checkObjectivesStatus() ? false : true
                                    }
                                    onClick={completeQuest}
                                >
                                    완료
                                </Button>
                                <Button onClick={toggleEditing}>수정</Button>
                                <Button onClick={openModal}>삭제</Button>
                            </>
                        )
                    ) : (
                        <></>
                    )}
                </Flex>
            </Form>
            {contextHolder}
        </div>
    );
}
