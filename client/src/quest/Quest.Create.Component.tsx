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
    message,
} from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import { Dayjs } from "dayjs";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { ResultMsg, createQuest } from "../redux/Quest.Slice";
import store, { AppState } from "../redux/Store";
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

export type FormValues = Pick<Quest, "content" | "category"> & {
    time: Dayjs[];
};

export function QuestCreateComponent() {
    const [categoryLabel, setCategoryLabel] = useState<string>("선택");
    const [createStep, setCreateStep] = useState<number>(0);
    const [timeLabel, setTimeLabel] = useState<string>("");
    const [timeValue, setTimeValue] = useState();
    const [day, setDay] = useState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();

    const resultMsg = useSelector((state: AppState) => state.quest.resultMsg);

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
        if (e.time.length == 2) {
            const params = {
                content: e.content,
                category: e.category,
                from: e.time[0].toDate(),
                to: e.time[1].toDate(),
            };
            const response = await store.dispatch(createQuest(params)).unwrap();
            printMsg(response);
        }
    };

    const printMsg = (response: ResultMsg) => {
        console.log(response);
        if (!response.result) {
            messageApi.open({
                type: "error",
                content: response.msg,
                style: { marginTop: 20 },
            });
        } else if (response.result) {
            messageApi.open({
                type: "success",
                content: response.msg,
                style: { marginTop: 20 },
            });
        }
    };

    return (
        <div>
            {contextHolder}
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
            </Form>
        </div>
    );
}
