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
import { createQuest } from "../../store/Quest.Slice";
import store from "../../store/Store";
import { CategoryEmojiMap, CreateQuestParams, Objective, Quest } from "./types/Quest.types";
import { QuestObjectiveComponent } from "./Quest.Objective.Component";
import { create } from "domain";

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

// export type FormValues = {
//     from: Dayjs, to: Dayjs
// };

export function QuestCreateComponent() {
    const [timeValue, setTimeValue] = useState();


    const timeChange = (e: any) => {
        setTimeValue(e);
    };

    const onFinish = async (e: any) => {
        console.log(e)
        // const objArray: Pick<Objective, "category" | "content" | "targetReps"> = Object.values(e).map((objective, index) => {
        //     return objective
        // })

        // console.log(objArray)

        // const params: CreateQuestParams = {
        //     from: e.from.toDate(),
        //     to: e.from.toDate(),
        //     objectives: objArray
        // }
        // store.dispatch(createQuest(params))
    };

    return (
        <div>
            {/* {contextHolder} */}
            <Flex justify="flex-end" style={{ margin: 5 }}>
                <Title level={3}>
                    <Link to={"/"}>CANCEL</Link>
                </Title>
            </Flex>

            <Title level={3}>퀘스트 생성</Title>

            <Form name="quest" layout="vertical" onFinish={onFinish}>

                <Flex gap={"large"}>

                    <Form.Item label={"시작일 선택"} name={"from"}>
                        <DatePicker
                            size="large"
                            format="YYYY-MM-DD"
                            onChange={timeChange}
                            value={timeValue}
                        />
                    </Form.Item>

                    <Form.Item label={"마감일 선택"} name={"to"}>
                        <DatePicker
                            size="large"
                            format="YYYY-MM-DD"
                            onChange={timeChange}
                            value={timeValue}
                        />
                    </Form.Item>

                </Flex>


                <QuestObjectiveComponent />



                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button type="primary" htmlType="submit">
                        생성
                    </Button>
                </div>
            </Form>
        </div>
    );
}
