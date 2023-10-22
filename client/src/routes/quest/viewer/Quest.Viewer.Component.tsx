import { Button, DatePicker, Flex, Form, Statistic } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    changeObjective,
    changePageTitle,
    changeTime,
    createQuest,
    editableQuest,
    fetchQuestByQuestId,
} from "../../../store/Quest.Slice";
import store, { AppState } from "../../../store/Store";
import { CreateQuestParams, EditableObjective } from "../types/Quest.types";
import { QuestViewerObjectiveComponent } from "./Quest.Viewer.Objective.Component";

export function QuestViewerComponent({ create }: { create: boolean }) {
    const { questId } = useParams();
    const user = useSelector((state: AppState) => state.user.user);
    const state = useSelector((state: AppState) => state.quest.viewComp);
    const { editable, quest, objectives, time, loading } = state;

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

    return (
        <div>
            {!editable ? (
                <Flex gap={"large"}>
                    <Statistic
                        title="작성자"
                        value={quest ? quest.userId : ""}
                    />
                    <Statistic
                        title="작성일"
                        value={
                            quest?.createdAt
                                ? dayjs(quest?.createdAt).format("YYYY-MM-DD")
                                : ""
                        }
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
                            defaultValue={
                                quest
                                    ? [dayjs(quest.from), dayjs(quest.to)]
                                    : undefined
                            }
                            inputReadOnly={true}
                            disabledDate={disabledDate}
                        />
                    </Form.Item>
                </Flex>

                <QuestViewerObjectiveComponent />

                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button type="primary" htmlType="submit">
                        생성
                    </Button>
                </div>
            </Form>
        </div>
    );
}
