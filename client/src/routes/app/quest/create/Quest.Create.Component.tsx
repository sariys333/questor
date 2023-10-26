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
import { useSelector } from "react-redux";
import { createQuest } from "../../../../store/Quest.Slice";
import store, { AppState } from "../../../../store/Store";
import { CreateQuestParam, Objective } from "../types/Quest.types";
import { QuestCreateObjectiveComponent } from "./Quest.Create.Objective.Component";
import { useEffect } from "react";

export function QuestCreateComponent() {
    const state = useSelector((state: AppState) => state.quest.viewComp);
    const { quest } = state;

    const onFinish = (e: any) => {
        console.log(e);
        const objectives: Pick<
            Objective,
            "category" | "content" | "targetReps"
        >[] = Object.keys(e)
            .filter((key) => key.startsWith("objectives"))
            .map((key) => e[key]);
        console.log(objectives);

        const params: CreateQuestParam = {
            title: e.title,
            from: e.time[0].toDate(),
            to: e.time[1].toDate(),
            objectives,
        };
        store.dispatch(createQuest(params));
    };

    return (
        <div>
            <Flex gap={"large"} justify="space-between">
                <Typography.Title
                    editable={{ editing: true }}
                    level={2}
                    style={{ margin: 0 }}
                >
                    {quest?.title || "제목"}
                </Typography.Title>
            </Flex>
            <Divider style={{ marginTop: 8 }} />
            <Form name="quest" layout="vertical" onFinish={onFinish}>
                <Flex gap={"large"}>
                    <Form.Item name={"time"}>
                        <DatePicker.RangePicker
                            size="small"
                            format="YYYY-MM-DD"
                            inputReadOnly={true}
                            allowClear={false}
                        />
                    </Form.Item>
                </Flex>

                <QuestCreateObjectiveComponent />

                <Flex justify="end">
                    <Button>생성</Button>
                </Flex>
            </Form>
        </div>
    );
}
