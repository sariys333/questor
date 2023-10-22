import { Button, Flex, Form, Input, InputNumber, List, Select } from "antd";
import { useSelector } from "react-redux";
import { createAddObjective } from "../../store/Quest.Slice";
import store, { AppState } from "../../store/Store";
import { CategoryEmojiMap, EditableObjective } from "./types/Quest.types";

const inputStyle = {
    minHeight: 40, width: "100%"
}


export function QuestObjectiveComponent() {

    const state = useSelector((state: AppState) => state.quest.createComp)

    const { editable, objectives, loading } = state

    const onLoadMore = () => {
        // 새로운 Objective를 만들어서 Objectives에 푸쉬
        // dispatch
        const newObjective: EditableObjective = {}
        store.dispatch(createAddObjective(newObjective))
    };

    const loadMore =
        editable ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button onClick={onLoadMore}>목표 추가</Button>
            </div>
        ) : null;

    return (
        <List
            className="objective"
            itemLayout="horizontal"

            loadMore={loadMore}
            dataSource={objectives}
            renderItem={(data, index) => (
                <List.Item>
                    <Flex gap={"large"}>
                        <Form.Item name={["objectives" + index, "category"]}>
                            <Select
                                size="large"
                                defaultValue={"-"}
                                style={{ width: 120 }}
                                // onChange={handleChange}
                                options={Array.from(CategoryEmojiMap.entries()).map(([cat, emoji]) => ({ value: cat, label: `${emoji} - ${cat}` }))}
                            />
                        </Form.Item>

                        <Form.Item name={["objectives" + index, "objective"]} >
                            <Input.TextArea
                                autoSize
                                size="large"
                                style={inputStyle}
                            />
                        </Form.Item>

                        <Form.Item name={["objectives" + index, "progress"]} >
                            <InputNumber
                                defaultValue={0}
                                size="large"
                                style={inputStyle}
                            />
                        </Form.Item>

                    </Flex>

                </List.Item>
            )}
        />
    )
}

