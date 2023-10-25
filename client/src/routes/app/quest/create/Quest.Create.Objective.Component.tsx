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
import { createAddObjective } from "../../../../store/Quest.Slice";
import store, { AppState } from "../../../../store/Store";
import {
    CategoryEmojiMap,
    EditableObjective,
    Objective,
} from "../types/Quest.types";
import { Typography } from "antd";
import { CheckOutlined } from "@ant-design/icons";

export function QuestCreateObjectiveComponent() {
    const state = useSelector((state: AppState) => state.quest.createComp);
    const { quest } = state;

    const onLoadMore = () => {
        const newObjective: Partial<Objective> = {};
        store.dispatch(createAddObjective(newObjective));
    };

    const loadMore = (
        <Button size="small" type="text" onClick={onLoadMore}>
            +
        </Button>
    );

    const deleteRow = (e: any) => {};

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
                        <Flex gap={"large"}>
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
                            >
                                <InputNumber size="small" />
                            </Form.Item>
                            <Button onClick={deleteRow} id={`${index}`}>
                                -
                            </Button>
                        </Flex>
                    </List.Item>
                )}
            />
        </>
    );
}
