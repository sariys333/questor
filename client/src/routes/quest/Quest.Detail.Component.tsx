import {
    Breadcrumb,
    Button,
    Card,
    Checkbox,
    DatePicker,
    Form,
    Input,
    Modal,
    Popover,
    Radio,
    Space,
    TimePicker,
    Typography,
} from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import { Meta } from "antd/es/list/Item";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { QuestState, fetchQuestByQuestId } from "../../store/Quest.Slice";
import store, { AppState } from "../../store/Store";
import QuestRepository from "../../repositories/Quest.Repository";
import { CategoryEmojiMap, EditQuestParams, Quest } from "./types/Quest.types";

const range = (value: number) => {
    const result = [];
    for (let i = 0; i < 60; i++) {
        if (!(i % value == 0)) {
            result.push(i);
        }
    }
    return result;
};

const disabledRangeTime: RangePickerProps["disabledTime"] = (_, type) => {
    return {
        disabledMinutes: () => range(5),
    };
};

export class EditForm {
    quest: Quest;
    time: Date[] = [];
    // questId: string;

    constructor(form: FormValues) {
        this.quest = form.quest;
        this.time = form.time.map((item) => item.toDate());
        // this.questId = form.questId;
    }
}

type FormValues = {
    quest: Quest;
    time: Dayjs[];
    // questId: string;
};

export function QuestDetailComponent() {
    const state = useSelector((state: AppState) => state.quest.viewComp);

    const dateFormat = (time: Date) => {
        if (time) {
            return dayjs(new Date(time)).format("YY/MM/DD HH:mm");
        }
    };

    const completeQuest = () => {};

    const deleteQuest = () => {};

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState("");
    const showModal = () => {
        setModalText("수정");
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    // const [category] = useState<Category>(new Category());
    const [categoryLabel, setCategoryLabel] = useState<string>("선택");
    const [timeLabel, setTimeLabel] = useState<string>("기간 선택");
    const [timeValue, setTimeValue] = useState();
    const [day, setDay] = useState<boolean>(false);

    const onCategoryChange = (e: any) => {
        setCategoryLabel(e.target.value);
    };

    const timeChange = (e: any) => {
        setTimeValue(e);
    };

    const onCheck = (e: any) => {
        setTimeValue(undefined);
        if (e.target.checked) {
            setDay(true);
            setTimeLabel("시간 선택");
        } else {
            setDay(false);
            setTimeLabel("기간 선택");
        }
    };

    const onFinish = async (e: any) => {
        setModalText("수정중 ....");
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
        if (e.time.length == 2) {
            await editQuest(e);
        }
    };

    const editQuest = async (params: EditQuestParams) => {
        const res = await QuestRepository.edit(params);
        console.log(res);
    };

    return (
        <>
            <Card
                title={state.quest?.category}
                style={{ marginTop: 30 }}
                extra={
                    <>
                        {!state.quest?.completed ? (
                            <Button onClick={showModal}>수정</Button>
                        ) : (
                            <></>
                        )}

                        <Button onClick={deleteQuest}>삭제</Button>
                    </>
                }
            >
                <>
                    <Breadcrumb
                        style={{
                            marginTop: 5,
                            textAlign: "end",
                            display: "flex",
                            justifyContent: "end",
                        }}
                        items={[
                            {
                                title: (
                                    <Popover
                                        placement="top"
                                        content={
                                            state.quest
                                                ? dateFormat(
                                                      state.quest.createdAt
                                                  )
                                                : undefined
                                        }
                                    >
                                        <a href="#">생성일</a>
                                    </Popover>
                                ),
                            },
                            {
                                title: (
                                    <Popover
                                        placement="top"
                                        content={
                                            state.quest
                                                ? dateFormat(state.quest.from)
                                                : undefined
                                        }
                                    >
                                        <a href="#">시작일</a>
                                    </Popover>
                                ),
                            },
                            {
                                title: (
                                    <Popover
                                        placement="top"
                                        content={
                                            state.quest
                                                ? dateFormat(state.quest.to)
                                                : undefined
                                        }
                                    >
                                        <a href="#">만료일</a>
                                    </Popover>
                                ),
                            },
                            {
                                title: (
                                    <a href="#">
                                        {state.quest?.completed ? (
                                            <Popover
                                                placement="top"
                                                content={
                                                    state.quest
                                                        ? dateFormat(
                                                              state.quest
                                                                  .completedAt
                                                          )
                                                        : undefined
                                                }
                                            >
                                                <a href="#">완료일</a>
                                            </Popover>
                                        ) : (
                                            "완료안됨"
                                        )}
                                    </a>
                                ),
                            },
                        ]}
                    />
                    <Typography.Title level={3} style={{ textAlign: "center" }}>
                        {state.quest?.content}
                    </Typography.Title>
                    <Meta
                        avatar={<Button onClick={completeQuest}>완료</Button>}
                        style={{}}
                    />
                </>
            </Card>
            <Modal
                title={modalText}
                open={open}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                centered={true}
                width={550}
                footer={[]}
            >
                <hr />
                <Form name="quest" layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label={categoryLabel}
                        name={["quest", "category"]}
                    >
                        <Radio.Group
                            onChange={onCategoryChange}
                            style={{ borderRadius: 0 }}
                        >
                            {Array.from(CategoryEmojiMap.entries()).map(
                                ([category, value]) => {
                                    return (
                                        <Radio.Button value={category}>
                                            <>{value}</>
                                        </Radio.Button>
                                    );
                                }
                            )}
                        </Radio.Group>
                    </Form.Item>

                    <Space direction="vertical">
                        <Checkbox onChange={onCheck} name="today">
                            당일
                        </Checkbox>

                        <Form.Item label={timeLabel} name="time">
                            {day ? (
                                <TimePicker.RangePicker
                                    format="HH:mm"
                                    minuteStep={5}
                                    size="large"
                                    onChange={timeChange}
                                    value={timeValue}
                                />
                            ) : (
                                <></>
                            )}
                            {!day ? (
                                <DatePicker.RangePicker
                                    size="large"
                                    format="YYYY-MM-DD HH:mm"
                                    disabledTime={disabledRangeTime}
                                    showTime={{ hideDisabledOptions: true }}
                                    onChange={timeChange}
                                    value={timeValue}
                                />
                            ) : (
                                <></>
                            )}
                        </Form.Item>
                    </Space>

                    <Form.Item name={["quest", "content"]} label="내용">
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item name={["quest", "questId"]}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                적용
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
