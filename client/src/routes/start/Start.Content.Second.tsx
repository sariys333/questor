
import React, { Ref, RefObject, useEffect, useRef, useState } from 'react'
import { LoginComponent } from '../login/Login.Component'
import { Button, ConfigProvider, Input, Layout, Row, Space, Typography, theme, Form } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import { Link, Outlet } from 'react-router-dom'
import UserRepository from '../../repositories/User.Repository'
import { User } from '../login/types/User.typs'
import { Credentials } from '../../repositories/Auth.Repository'
import { CheckOutlined } from '@ant-design/icons';
import Item from 'antd/es/list/Item';

const { Title } = Typography

export function StartContentSecond() {
    const { token } = theme.useToken();
    const [ bool, setBool ] = useState<boolean>(false)
    const [ email, setEmail ] = useState<string>()

    const checkEmail = async (cred: Credentials) => {
        const data =  await UserRepository.checkEmail(cred)
        if(data == true) {
            setBool(data)
            setEmail(cred.email)
        }
    }

    const onFinish = async (values: any) => {
        await checkEmail(values)
    };
        
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const rename = () => {
        setBool(false)
    }

    return (
        <div>
            <Title level={2}>계속 진행하시고 싶으시다면 </Title>
            <Title level={2}>계정을 생성해주세요!</Title>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 24 }}
                style={{ width: '100%' }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Space.Compact style={{width: '100%', justifyContent: 'center', maxWidth: 1000}}>
                    <Form.Item<string>
                        name="email"
                        rules={[{ required: true, message: '이메일을 입력해주세요.' }]}
                        style={{width: '40%'}}
                    >
                        {!bool ? <Input size='large' placeholder='이메일' style={{borderRadius: 0}}/> 
                        : <Input size='large' placeholder='이메일' style={{borderRadius: 0}} disabled/> }
                    </Form.Item>
                    {!bool ? <Button type="primary" size='large' htmlType='submit' style={{borderRadius: 0}}>중복 확인</Button>
                    : <><Button type="default" size='large' htmlType='submit' style={{borderRadius: 0}} disabled><CheckOutlined/></Button>
                        <Button type='primary' size='large' htmlType='button' style={{borderRadius: 0}} onClick={rename}>재입력</Button></>}
                </Space.Compact>
            </Form>
        </div>
    )
}

