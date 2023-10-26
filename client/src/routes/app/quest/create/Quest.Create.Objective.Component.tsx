import { Button, Flex, Form, Input, InputNumber, List, Select } from "antd";
import { useSelector } from "react-redux";
import {
    createAddObjective,
    deleteObjective,
} from "../../../../store/Quest.Slice";
import store, { AppState } from "../../../../store/Store";
import { CategoryEmojiMap, EditableObjective } from "../types/Quest.types";
import { CloseOutlined } from "@ant-design/icons";

export function QuestCreateObjectiveComponent() {
    const state = useSelector((state: AppState) => state.quest.createComp);
    const { quest } = state;

    const onLoadMore = () => {
        const newObjective: EditableObjective = {
            targetReps: 1,
        };
        store.dispatch(createAddObjective(newObjective));
    };

    const loadMore = (
        <Button size="small" type="text" onClick={onLoadMore}>
            +
        </Button>
    );

    const deleteObjectiveRow = (index: number) => {
        store.dispatch(deleteObjective(index));
    };

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
                renderItem={(data, index) => (
                    <List.Item>
                        <Flex gap={"large"} align="center">
                            <Form.Item
                                name={["objectives" + index, "category"]}
                                style={{ marginBottom: 0 }}
                            >
                                <Select
                                    size="small"
                                    placeholder="카테고리"
                                    style={{ width: 120 }}
                                    defaultActiveFirstOption
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
                                <Input placeholder="내용" size="small" />
                            </Form.Item>

                            <Form.Item
                                name={["objectives" + index, "targetReps"]}
                                style={{ marginBottom: 0 }}
                                initialValue={data.targetReps}
                            >
                                <InputNumber
                                    size="small"
                                    placeholder="반복횟수"
                                />
                            </Form.Item>
                            <Button
                                size="small"
                                style={{ width: 32 }}
                                onClick={(e) => deleteObjectiveRow(index)}
                            >
                                <CloseOutlined />
                            </Button>
                        </Flex>
                    </List.Item>
                )}
            />
        </>
    );
}
