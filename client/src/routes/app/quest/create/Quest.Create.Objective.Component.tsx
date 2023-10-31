import { Button, Flex, Form, Input, InputNumber, List, Select } from "antd";
import { useSelector } from "react-redux";
import {
    createAddObjective,
    deleteObjective,
} from "../../../../store/Quest.Slice";
import store, { AppState } from "../../../../store/Store";
import { CategoryEmojiMap, EditableObjective } from "../types/Quest.types";

export function QuestCreateObjectiveComponent() {
    const state = useSelector((state: AppState) => state.quest.createComp);
    const { quest } = state;

    const onLoadMore = () => {
        const newObjective: EditableObjective = {
            targetReps: 1,
        };
        store.dispatch(createAddObjective(newObjective));
    };

    const deleteObjectiveRow = () => {
        quest &&
            quest.objectives &&
            quest.objectives.length > 1 &&
            store.dispatch(deleteObjective("create"));
    };

    const loadMore = (
        <Flex justify="space-between" style={{ maxWidth: 430 }}>
            <Button size="small" type="text" onClick={onLoadMore}>
                +
            </Button>
            <Button size="small" type="text" onClick={deleteObjectiveRow}>
                x
            </Button>
        </Flex>
    );

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
                        </Flex>
                    </List.Item>
                )}
            />
        </>
    );
}
