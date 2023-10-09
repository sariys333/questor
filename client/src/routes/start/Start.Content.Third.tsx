
import React, { Ref, RefObject, useEffect, useRef, useState } from 'react'
import { Button, Card, ConfigProvider, Input, Layout, Row, Space, Typography, theme, Form } from 'antd'
import UserRepository from '../../repositories/User.Repository'
import { Credentials } from '../../repositories/Auth.Repository';

type FieldType = {
    email?: string;
    password?: string;
    pwCheck?: string;
    name?: string;
    username?: string;
};

const { Title } = Typography

export function StartContentThird() {
    const { token } = theme.useToken();

    const [bool, setBool] = useState()

    const signup = async (cred: Credentials) => {
        const res = await UserRepository.signup(cred)
        if(res == true){
            setBool(res)
        }
    }

    const onFinish = async (values: any) => {
        console.log(values.password)
        if(values.password === values.pwCheck) {
            console.log("true")
            await signup(values)
        }

    };
        
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Layout style={{alignItems: 'center', background: 'none'}}>
            <Title level={2}>계정 생성</Title>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 24 }}
                style={{ width: '40%' }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    name="email"
                >
                    <Input disabled/>
                </Form.Item>

                <Form.Item<FieldType>
                    name="password"
                    rules={[{ required: true, message: '비밀번호를 입력해주세요.' }]}
                >
                    <Input.Password placeholder='비밀번호'/>
                </Form.Item>

                <Form.Item<FieldType>
                    name="pwCheck"
                    rules={[{ required: true, message: '비밀번호 확인 입력해주세요.' }]}
                >
                    <Input.Password placeholder='비밀번호 확인'/>
                </Form.Item>

                <Form.Item<FieldType>
                    name="name"
                    rules={[{ required: true, message: '이름을 입력해주세요.' }]}
                >
                    <Input placeholder='이름' />
                </Form.Item>

                <Form.Item<FieldType>
                    name="username"
                    rules={[{ required: true, message: '닉네임을 입력해주세요.' }]}
                >
                    <Input placeholder='닉네임' />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 19, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        회원가입
                    </Button>
                </Form.Item>
            </Form>
        </Layout>
    )
}

