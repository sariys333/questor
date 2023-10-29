import { Button, DatePicker, Divider, Flex, Form, Typography } from "antd";
import { useSelector } from "react-redux";
import { AppState } from "../../../../store/Store";
import { CreateQuestParam } from "../types/Quest.types";
import { QuestCreateObjectiveComponent } from "./Quest.Create.Objective.Component";

export function QuestCreateComponent() {
    const state = useSelector((state: AppState) => state.quest.viewComp);
    const { quest } = state;

    const onFinish = (e: any) => {
        console.log(e);
        const objectives = Object.keys(e)
            .filter((key) => key.startsWith("objectives"))
            .map((key) => e[key]);
        console.log(objectives);

        const params: CreateQuestParam = {
            title: e.title,
            from: e.time[0].toDate(),
            to: e.time[1].toDate(),
            objectives: objectives,
        };

        console.log(params);
        // store.dispatch(createQuest(params));
    };

    const titleChange = () => {};

    return (
        <div>
            <Flex gap={"large"} justify="space-between">
                <Typography.Title
                    editable={{ editing: true, onChange: titleChange }}
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
                    <Button htmlType="submit">생성</Button>
                </Flex>
            </Form>
        </div>
    );
}
