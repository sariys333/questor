import {
    Button,
    Flex,
    Form,
    Input,
    InputNumber,
    List,
    Select,
    Typography,
} from "antd";
import { useSelector } from "react-redux";
import { createAddObjective } from "../../../store/Quest.Slice";
import store, { AppState } from "../../../store/Store";
import { CategoryEmojiMap, EditableObjective } from "../types/Quest.types";

export function QuestViewerObjectiveComponent() {
    const state = useSelector((state: AppState) => state.quest.viewComp);

    const { editable, objectives, loading, quest } = state;

    // console.log(editable);
    // console.log(objectives);

    const onLoadMore = () => {
        const newObjective: EditableObjective = {};
        store.dispatch(createAddObjective(newObjective));
    };

    const loadMore = editable ? (
        <Button size="small" type="text" onClick={onLoadMore}>
            +
        </Button>
    ) : null;

    return (
        <List
            className="objective"
            itemLayout="horizontal"
            split={false}
            grid={{
                gutter: 0,
                column: 0,
            }}
            loadMore={loadMore}
            dataSource={objectives}
            renderItem={(data, index) => (
                <List.Item>
                    <Flex gap={"large"}>
                        <Form.Item
                            name={["objectives" + index, "category"]}
                            style={{ marginBottom: 0 }}
                        >
                            <Select
                                size="small"
                                defaultValue={data ? data.category : "-"}
                                style={{ width: 120 }}
                                value={data.category}
                                options={Array.from(
                                    CategoryEmojiMap.entries()
                                ).map(([cat, emoji]) => ({
                                    value: cat,
                                    label: `${cat}`,
                                    disabled: !editable,
                                }))}
                                bordered={editable}
                            />
                        </Form.Item>
                        <Form.Item
                            name={["objectives" + index, "content"]}
                            style={{ marginBottom: 0 }}
                        >
                            <Input
                                size="small"
                                value={data ? data.content : ""}
                                bordered={editable}
                                readOnly={!editable}
                            />
                        </Form.Item>

                        {editable ? <></> : <Typography>5</Typography>}

                        <Form.Item
                            name={["objectives" + index, "targetReps"]}
                            style={{ marginBottom: 0 }}
                        >
                            <InputNumber
                                defaultValue={data ? data.targetReps : ""}
                                size="small"
                                bordered={editable}
                                readOnly={!editable}
                            />
                        </Form.Item>
                    </Flex>
                </List.Item>
            )}
        />
    );
}
