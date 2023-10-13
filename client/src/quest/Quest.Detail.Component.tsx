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
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useMemo, useState } from "react";
import QuestRepository from "../repositories/Quest.Repository";
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

export function QuestDetailComponent({ questId }: { questId: string }) {
    const [quest, setQuset] = useState<Quest>();
    const [createdAt, setCreatedAt] = useState<string>();
    const [completedAt, setCompletedAt] = useState<string>();
    const [to, setTo] = useState<string>();
    const [from, setFrom] = useState<string>();

    const [showArrow, setShowArrow] = useState(true);
    const [arrowAtCenter, setArrowAtCenter] = useState(false);
    const mergedArrow = useMemo(() => {
        if (arrowAtCenter) return { pointAtCenter: true };
        return showArrow;
    }, [showArrow, arrowAtCenter]);

    useEffect(() => {
        getApi();
    }, [questId]);

    const getApi = async () => {
        const response = await QuestRepository.getQuestById(questId);
        if (response) {
            if (response.createdAt) {
                setCreatedAt(dateFormat(response.createdAt));
            }
            if (response.from) {
                setFrom(dateFormat(response.from));
            }
            if (response.to) {
                setTo(dateFormat(response.to));
            }
            if (response.completedAt) {
                setCompletedAt(dateFormat(response.completedAt));
            }
            setQuset(response);
        }
    };

    const dateFormat = (time: Date) => {
        return dayjs(new Date(time)).format("YY/MM/DD HH:mm");
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
                title="걷기"
                style={{ marginTop: 30 }}
                extra={
                    <>
                        {!quest?.completed ? (
                            <Button onClick={showModal}>수정</Button>
                        ) : (
                            <></>
                        )}
                        {!quest?.completed ? (
                            <Button onClick={completeQuest}>완료</Button>
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
                                        content={createdAt}
                                        arrow={mergedArrow}
                                    >
                                        <a href="#">생성일</a>
                                    </Popover>
                                ),
                            },
                            {
                                title: (
                                    <Popover
                                        placement="top"
                                        content={from}
                                        arrow={mergedArrow}
                                    >
                                        <a href="#">시작일</a>
                                    </Popover>
                                ),
                            },
                            {
                                title: (
                                    <Popover
                                        placement="top"
                                        content={to}
                                        arrow={mergedArrow}
                                    >
                                        <a href="#">만료일</a>
                                    </Popover>
                                ),
                            },
                            {
                                title: (
                                    <Popover
                                        placement="top"
                                        content={completedAt}
                                        arrow={mergedArrow}
                                    >
                                        <a href="#">완료일</a>
                                    </Popover>
                                ),
                            },
                            {
                                title: (
                                    <a href="#">
                                        {quest?.completed
                                            ? "완료됨"
                                            : "완료안됨"}
                                    </a>
                                ),
                            },
                        ]}
                    />
                    <Typography.Title level={3} style={{ textAlign: "center" }}>
                        {quest?.content}
                    </Typography.Title>
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
                            {
                                Array.from(CategoryEmojiMap.entries()).map(([category, value]) => {
                                    return <Radio.Button value={category}>
                                        <>{value}</>
                                    </Radio.Button>
                                })  
                            }
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
                            <Button
                                type="primary"
                                htmlType="submit"
                                value={questId}
                            >
                                적용
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
