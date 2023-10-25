import {
    Button,
    Flex,
    Form,
    Input,
    InputNumber,
    List,
    Select,
    Space,
    Spin,
    Tag,
    theme,
} from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
    createAddObjective,
    increaseObjectiveReps,
} from "../../../../store/Quest.Slice";
import store, { AppState } from "../../../../store/Store";
import { CategoryEmojiMap, EditableObjective } from "../types/Quest.types";
import { Typography } from "antd";
import { CheckOutlined } from "@ant-design/icons";

export function QuestViewerObjectiveComponent() {
    const state = useSelector((state: AppState) => state.quest.viewComp);

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

    const increaseReps = (e: any) => {
        store.dispatch(increaseObjectiveReps(e.target.id));
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
                renderItem={(data, index) =>
                    editing ? (
                        <List.Item>
                            <Flex gap={"large"}>
                                <Form.Item
                                    name={["objectives" + index, "category"]}
                                    style={{ marginBottom: 0 }}
                                >
                                    <Select
                                        size="small"
                                        defaultValue={
                                            data ? data.category : "-"
                                        }
                                        style={{ width: 120 }}
                                        value={data.category}
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
                                >
                                    <Input
                                        size="small"
                                        value={data ? data.content : ""}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name={["objectives" + index, "targetReps"]}
                                    style={{ marginBottom: 0 }}
                                >
                                    <InputNumber
                                        defaultValue={
                                            data ? data.targetReps : ""
                                        }
                                        size="small"
                                    />
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
                                <Button
                                    size="small"
                                    style={{ width: 32 }}
                                    onClick={increaseReps}
                                    id={`${data.objectiveId}`}
                                >
                                    <CheckOutlined id={`${data.objectiveId}`} />
                                </Button>
                            </Flex>
                        </List.Item>
                    )
                }
            />
        </>
    );
}
