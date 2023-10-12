import { Button, Checkbox, DatePicker, Form, Input, Radio, Space, TimePicker } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import { useState } from 'react';
import { Category, Quest } from './types/Quest.types';
import { Dayjs } from 'dayjs';
import QuestRepository from '../repositories/Quest.Repository';


const range = (value: number) => {
    const result = [];
    for (let i = 0; i < 60; i++) {
        if(!(i % value == 0)) {
            result.push(i);
        }
    }
    return result;
};

const disabledRangeTime: RangePickerProps['disabledTime'] = (_, type) => {
    return {
        disabledMinutes: () => range(5),
    };
};

export type CreateCred = {
    quest: Quest
    time: Dayjs[]
}

export function QuestCreateComponent() {

    const [category] = useState<Category>(new Category())
    const [categoryLabel, setCategoryLabel] = useState<string>("선택")
    const [createStep, setCreateStep] = useState<number>(0)
    const [timeLabel, setTimeLabel] = useState<string>("");
    const [timeValue, setTimeValue] = useState();
    const [day, setDay] = useState<boolean>(false);


    const onCategoryChange = (e: any) => {
        setCategoryLabel(e.target.value)
        setCreateStep(1)
        if(timeLabel === "") {
            setTimeLabel("기간 선택")
        }
    }

    const timeChange = (e: any) => {
        setTimeValue(e)
        if(e[1]) {
            console.log("next")
            setCreateStep(2)
        } else {
            setCreateStep(1)
        }
    }


    const onCheck = (e: any) => {
        setTimeValue(undefined)
        setCreateStep(1)
        if(e.target.checked) {
            setDay(true)
            setTimeLabel("시간 선택")
        } else {
            setDay(false)
            setTimeLabel("기간 선택")
        }
    }

    const onFinish = async (e: any) => {
        // console.log(timeValue)
        // console.log(e)
        if(e.time.length == 2) {
            await createQuest(e)
        }
    };

    const createQuest = async (data: CreateCred) => {
        const res = await QuestRepository.create(data);
        console.log(res)
    }
    
    return (
        <div>
            <Form
                name="quest"
                layout="vertical"
                onFinish={onFinish}
                >
                <Form.Item label={categoryLabel} name={['quest', 'category']}>
                    <Radio.Group onChange={onCategoryChange} size='large' style={{borderRadius: 0}}>
                        <Radio.Button value="걷기">{category.walk} 걷기</Radio.Button>
                        <Radio.Button value="달리기">{category.run} 달리기</Radio.Button>
                        <Radio.Button value="헬스">{category.gym} 헬스</Radio.Button>
                        <Radio.Button value="공부">{category.study} 공부</Radio.Button>
                        <Radio.Button value="독서">{category.read} 독서</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                
                <Space direction='vertical'>
                    {createStep > 0 ? <Checkbox onChange={onCheck} name="today">당일</Checkbox> : <></>}
                    <Form.Item label={timeLabel} name="time">
                        {createStep > 0 && day ? <TimePicker.RangePicker format="HH:mm" minuteStep={5} size="large" onChange={timeChange} value={timeValue} />: <></>}
                        {createStep > 0 && !day ?
                            <DatePicker.RangePicker size="large" format="YYYY-MM-DD HH:mm" disabledTime={disabledRangeTime} showTime={{hideDisabledOptions: true}} onChange={timeChange} value={timeValue} />
                            : <></>}
                    </Form.Item>
                </Space>

                <Form.Item name={['quest', 'content']} label="내용">
                    <Input.TextArea />
                </Form.Item>

                {createStep > 1 ?
                    <div style={{display: "flex", justifyContent: "flex-end"}}>
                        <Button type='primary' htmlType='submit'>생성</Button>
                    </div>
                : <></>}
                
            </Form>
        </div>
    )
}
