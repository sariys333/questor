import { Button, Card, Input, Space, Form, Checkbox } from 'antd'
import React, { useState } from 'react'
import {
    UserOutlined,
    LockOutlined,
} from '@ant-design/icons';
import Item from 'antd/es/list/Item';
import { User } from './types/User.typs';
import AuthRepository, { Credentials } from '../../repositories/Auth.Repository';
import { Navigate } from 'react-router-dom';

type FieldType = {
    email?: string;
    password?: string;
    remember?: string;
};


export function LoginComponent() {
    const [user, setUser] = useState<User>()

    const login = async (cred: Credentials) => {
        const result = await AuthRepository.login(cred)
        if (result.status == "ok") {
            setUser(result.user)
        } else {
            
        }
    }

    const onFinish = async (values: any) => {
        await login(values)
    };
        
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Card title="로그인" extra={<a href="/signup">SIGNUP</a>} style={{width: "100%"}}>
            {user && (
                <Navigate to="/" replace={true} />
            )}
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 24 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    name="email"
                    rules={[{ required: true, message: '이메일을 입력해주세요.' }]}
                >
                    <Input prefix={<UserOutlined />} placeholder='이메일' />
                </Form.Item>

                <Form.Item<FieldType>
                    name="password"
                    rules={[{ required: true, message: '비밀번호를 입력해주세요.' }]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder='비밀번호'/>
                </Form.Item>

                <Form.Item<FieldType>
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{span: 16 }}
                >
                    <Checkbox>로그인 상태 유지</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 16, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        로그인
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

