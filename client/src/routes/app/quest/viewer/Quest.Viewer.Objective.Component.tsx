import { CheckOutlined, LikeFilled } from "@ant-design/icons";
import {
    Button,
    Flex,
    Form,
    Input,
    InputNumber,
    List,
    Select,
    Spin,
    Tag,
    Typography,
} from "antd";
import { useSelector } from "react-redux";
import {
    createAddObjective,
    increaseObjectiveReps,
} from "../../../../store/Quest.Slice";
import store, { AppState } from "../../../../store/Store";
import { CategoryEmojiMap, EditableObjective } from "../types/Quest.types";

export function QuestViewerObjectiveComponent() {
    const state = useSelector((state: AppState) => state.quest.viewComp);
    const user = useSelector((state: AppState) => state.user.user);

    const { editing, loading, quest } = state;

    const onLoadMore = () => {
        const newObjective: EditableObjective = {};
        store.dispatch(createAddObjective(newObjective));
    };

    const loadMore = editing ? (
        <Button size="small" type="text" onClick={onLoadMore}>
            +
        </Button>
    ) : null;

    const increaseReps = (index: number) => {
        const { objectives } = { ...quest };
        if (objectives) {
            const targetObjective = objectives[index];
            console.log(targetObjective);
            store.dispatch(increaseObjectiveReps(targetObjective));
        }
    };

    if (loading) {
        return (
            <Spin tip="Loading" size="large">
                <div className="content" />
            </Spin>
        );
    }

    return (
        <>
            <List
                className="objective"
                itemLayout="vertical"
                split={false}
                grid={{
                    gutter: 0,
                    column: 1,
                }}
                loadMore={loadMore}
                dataSource={quest?.objectives}
                id="objectiveId"
                renderItem={(data, index) =>
                    editing ? (
                        <List.Item>
                            <Flex gap={"large"}>
                                <Form.Item
                                    name={["objectives" + index, "category"]}
                                    style={{ marginBottom: 0 }}
                                    initialValue={data.category}
                                >
                                    <Select
                                        size="small"
                                        style={{ width: 120 }}
                                        options={Array.from(
                                            CategoryEmojiMap.entries()
                                        ).map(([cat, emoji]) => ({
                                            value: cat,
                                            label: `${cat}`,
                                        }))}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name={["objectives" + index, "content"]}
                                    style={{ marginBottom: 0 }}
                                    initialValue={data.content}
                                >
                                    <Input size="small" />
                                </Form.Item>

                                <Form.Item
                                    name={["objectives" + index, "targetReps"]}
                                    style={{ marginBottom: 0 }}
                                    initialValue={data.targetReps}
                                >
                                    <InputNumber size="small" />
                                </Form.Item>
                            </Flex>
                        </List.Item>
                    ) : (
                        <List.Item>
                            <Flex style={{ maxWidth: 480 }}>
                                <Tag style={{ textAlign: "center", width: 60 }}>
                                    {data.category}
                                </Tag>
                                <Typography.Text style={{ flex: 1 }}>
                                    {data.content}
                                </Typography.Text>

                                <Typography.Text
                                    type={
                                        data.currentReps === 0
                                            ? "secondary"
                                            : "success"
                                    }
                                    style={{
                                        width: 32,
                                        textAlign: "end",
                                        paddingRight: 8,
                                    }}
                                >
                                    {data.currentReps}
                                </Typography.Text>
                                <Typography.Text style={{ width: 32 }}>
                                    / {data.targetReps}
                                </Typography.Text>
                                {data.userId == user?.userId ? (
                                    data.currentReps === data.targetReps ? (
                                        <LikeFilled style={{ width: 32 }} />
                                    ) : (
                                        <Button
                                            size="small"
                                            style={{ width: 32 }}
                                            onClick={(e) => increaseReps(index)}
                                        >
                                            <CheckOutlined />
                                        </Button>
                                    )
                                ) : (
                                    <></>
                                )}
                            </Flex>
                        </List.Item>
                    )
                }
            />
        </>
    );
}
