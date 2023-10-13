import {
    Button,
    Checkbox,
    DatePicker,
    Flex,
    Form,
    Input,
    Radio,
    Space,
    TimePicker,
    Typography,
} from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import { Dayjs } from "dayjs";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import QuestRepository from "../repositories/Quest.Repository";
import { CategoryEmojiMap, Quest } from "./types/Quest.types";

const { Title } = Typography;

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

type FormValues = Pick<Quest, "content" | "category"> & {
    time: Dayjs[];
};

export function QuestCreateComponent() {
    const [categoryLabel, setCategoryLabel] = useState<string>("선택");
    const [createStep, setCreateStep] = useState<number>(0);
    const [timeLabel, setTimeLabel] = useState<string>("");
    const [timeValue, setTimeValue] = useState();
    const [day, setDay] = useState<boolean>(false);
    const [result, setResult] = useState<boolean>(false);

    const onCategoryChange = (e: any) => {
        setCategoryLabel(e.target.value);
        if (createStep < 1) {
            setCreateStep(1);
        }
        if (timeLabel === "") {
            setTimeLabel("기간 선택");
        }
    };

    const timeChange = (e: any) => {
        setTimeValue(e);
        if (e[1]) {
            console.log("next");
            setCreateStep(2);
        } else {
            setCreateStep(1);
        }
    };

    const onCheck = (e: any) => {
        setTimeValue(undefined);
        setCreateStep(1);
        if (e.target.checked) {
            setDay(true);
            setTimeLabel("시간 선택");
        } else {
            setDay(false);
            setTimeLabel("기간 선택");
        }
    };

    const onFinish = async (e: any) => {
        // console.log(timeValue)

        if (e.time.length == 2) {
            await createQuest(e);
        }
    };

    const createQuest = async ({ content, category, time }: FormValues) => {
        console.log(time);
        const res = await QuestRepository.create({
            content,
            category,
            from: time[0].toDate(),
            to: time[1].toDate(),
        });
        console.log(res);
        if (res) {
            setResult(res);
        }
    };

    return (
        <div>
            <Flex justify="flex-end" style={{ margin: 5 }}>
                <Title level={3}>
                    <Link to={"/"}>CANCEL</Link>
                </Title>
            </Flex>

            <Form name="quest" layout="vertical" onFinish={onFinish}>
                <Form.Item label={categoryLabel} name={"category"}>
                    <Radio.Group
                        onChange={onCategoryChange}
                        size="large"
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
                    {createStep > 0 ? (
                        <Checkbox onChange={onCheck} name="today">
                            당일
                        </Checkbox>
                    ) : (
                        <></>
                    )}
                    <Form.Item label={timeLabel} name={"time"}>
                        {createStep > 0 && day ? (
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
                        {createStep > 0 && !day ? (
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

                <Form.Item name={"content"} label="내용">
                    <Input.TextArea />
                </Form.Item>

                {createStep > 1 ? (
                    <div
                        style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                        <Button type="primary" htmlType="submit">
                            생성
                        </Button>
                    </div>
                ) : (
                    <></>
                )}

                {result && <Navigate to="/" replace={true} />}
            </Form>
        </div>
    );
}
