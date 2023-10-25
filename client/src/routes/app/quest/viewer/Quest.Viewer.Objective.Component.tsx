import {
    Button,
    Flex,
    Form,
    Input,
    InputNumber,
    List,
    Select,
    Spin,
} from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
    createAddObjective,
    fetchObjectivesByQuest,
} from "../../../../store/Quest.Slice";
import store, { AppState } from "../../../../store/Store";
import { CategoryEmojiMap, EditableObjective } from "../types/Quest.types";
import { Typography } from "antd";

export function QuestViewerObjectiveComponent() {
    const state = useSelector((state: AppState) => state.quest.viewComp);
    const user = useSelector((state: AppState) => state.user.user);

    const { editable, objectives, loading, quest } = state;

    const onLoadMore = () => {
        const newObjective: EditableObjective = {};
        store.dispatch(createAddObjective(newObjective));
    };

    useEffect(() => {
        if (user && quest) {
            const questId = quest.questId;
            store.dispatch(fetchObjectivesByQuest(questId));
        }
    }, [quest]);

    const loadMore = editable ? (
        <Button size="small" type="text" onClick={onLoadMore}>
            +
        </Button>
    ) : null;

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
                            {editable ? (
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
                            ) : (
                                <Typography>{data.category}</Typography>
                            )}

                            {editable ? (
                                <Form.Item
                                    name={["objectives" + index, "content"]}
                                    style={{ marginBottom: 0 }}
                                >
                                    <Input
                                        size="small"
                                        value={data ? data.content : ""}
                                    />
                                </Form.Item>
                            ) : (
                                <Typography>{data.content}</Typography>
                            )}

                            {editable ? (
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
                            ) : (
                                <>
                                    <Typography>{data.currentReps}</Typography>
                                    <Typography>{data.targetReps}</Typography>
                                </>
                            )}
                        </Flex>
                    </List.Item>
                )}
            />
        </>
    );
}
