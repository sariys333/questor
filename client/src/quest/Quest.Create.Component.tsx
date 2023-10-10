import React, { useState } from 'react'
import { Breadcrumb, Button, Form, Input, Radio, Select, Table, Tag, TimePicker, theme } from 'antd';
import { Category, Quest } from './types/Quest.types';


export function QuestCreateComponent() {

    const [form] = Form.useForm();
    
    const [category, setCategory] = useState<Category>(new Category())
    const [categoryLabel, setCategoryLabel] = useState<string>("선택");
    const [createStep, setCreateStep] = useState(0);

    const onCategoryChange = (e: any) => {
        console.log(e.target)
        setCategoryLabel(e.target.value)
        setCreateStep(1)
    }

    return (
        <div>
            <Form
                form={form}
                layout="vertical"
                >
                <Form.Item label={categoryLabel} name="category">
                    <Radio.Group onChange={onCategoryChange} size='large' style={{borderRadius: 0}}>
                        <Radio.Button value="걷기">{category.walk}</Radio.Button>
                        <Radio.Button value="달리기">{category.run}</Radio.Button>
                        <Radio.Button value="헬스">{category.gym}</Radio.Button>
                        <Radio.Button value="공부">{category.study}</Radio.Button>
                        <Radio.Button value="독서">{category.read}</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                {createStep > 0 ?
                    <Form.Item label="timeLabel" name="">
                        <TimePicker minuteStep={5} hourStep={1} format={"HH:mm"} size='large' placeholder='시간 입력' autoComplete='false'/>
                        
                    </Form.Item>
                 : <></>}
                
                
            </Form>
        </div>
    )
}
