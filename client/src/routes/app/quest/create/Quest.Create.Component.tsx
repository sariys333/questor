import {
    Button,
    DatePicker,
    Divider,
    Flex,
    Form,
    Typography,
    message,
} from "antd";
import { useSelector } from "react-redux";
import store, { AppState } from "../../../../store/Store";
import { CreateQuestParam } from "../types/Quest.types";
import { QuestCreateObjectiveComponent } from "./Quest.Create.Objective.Component";
import { useNavigate } from "react-router-dom";
import { createQuest } from "../../../../store/Quest.Slice";

export function QuestCreateComponent() {
    const state = useSelector((state: AppState) => state.quest.createComp);
    const { quest, createResult } = state;
    const { success, msg } = createResult;

    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = (e: any) => {
        console.log(e);
        const objectives = Object.keys(e)
            .filter((key) => key.startsWith("objectives"))
            .map((key) => e[key])
            .filter((obj) => obj.category && obj.content && obj.targetReps);
        console.log(objectives);

        const params: CreateQuestParam = {
            title: e.title,
            from: e.time[0].toDate(),
            to: e.time[1].toDate(),
            objectives: objectives,
        };

        console.log(params);
        store.dispatch(createQuest(params)).then(() => {
            if (success) {
                navigate("/quest");
            } else {
                messageApi.open({
                    type: "error",
                    content: msg,
                });
            }
        });
    };

    const titleChange = (e: any) => {
        form.setFieldsValue({ title: e });
    };

    return (
        <div>
            {contextHolder}
            <Form
                name="quest"
                layout="vertical"
                onFinish={onFinish}
                form={form}
            >
                <Flex gap={"large"} justify="space-between">
                    <Form.Item name={"title"}>
                        <Typography.Title
                            editable={{ editing: true, onChange: titleChange }}
                            level={2}
                            style={{ margin: 0 }}
                        >
                            {quest?.title || "제목"}
                        </Typography.Title>
                    </Form.Item>
                </Flex>
                <Divider style={{ marginTop: 8 }} />
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
                    <Button type="link" onClick={() => navigate("/quest")}>
                        취소
                    </Button>
                </Flex>
            </Form>
        </div>
    );
}
