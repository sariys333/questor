import {
    Button,
    Checkbox,
    DatePicker,
    Flex,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Space,
    Typography,
    message,
} from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ko";
import { useState } from "react";
import { Link } from "react-router-dom";
import { createQuest } from "../store/Quest.Slice";
import store from "../store/Store";
import { CategoryEmojiMap, Quest } from "./types/Quest.types";

dayjs.locale("ko");

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
    const [timeValue, setTimeValue] = useState();
    const [day, setDay] = useState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();

    const timeChange = (e: any) => {
        setTimeValue(e);
    };

    const onCheck = (e: any) => {
        if (e.target.checked) {
            setDay(true);
        } else {
            setDay(false);
        }
    };

    const onFinish = async (e: any) => {
        console.log(e);
        if (e.time.length == 2) {
            const params = {
                content: e.content,
                category: e.category,
                from: e.time[0].toDate(),
                to: e.time[1].toDate(),
            };
            // store.dispatch(createQuest(params));
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

            <Title level={3}>퀘스트 생성</Title>

            <Form name="quest" layout="vertical" onFinish={onFinish}>
                <Space direction="vertical" style={{ marginBottom: 10 }}>
                    <Checkbox onChange={onCheck} name="today">
                        당일
                    </Checkbox>

                    <Form.Item label={"시작일 선택"} name={"time"}>
                        <DatePicker
                            size="large"
                            format="YYYY-MM-DD"
                            onChange={timeChange}
                            value={timeValue}
                        />
                    </Form.Item>
                </Space>

                <Form.Item name={"progress"} label="반복할 목표치">
                    <InputNumber
                        size="large"
                        style={{ minHeight: 40, minWidth: 165 }}
                    />
                </Form.Item>

                <Form.Item name={"content"} label="내용">
                    <Input.TextArea
                        autoSize
                        size="large"
                        style={{ minHeight: 40, maxWidth: 600 }}
                    />
                </Form.Item>

                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button type="primary" htmlType="submit">
                        생성
                    </Button>
                </div>
            </Form>
        </div>
    );
}
