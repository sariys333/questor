import React, { useState } from 'react'
import { LoginComponent } from '../login/Login.Component'
import { ConfigProvider, Layout, Space, Typography, theme } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import { Link, Outlet } from 'react-router-dom'
import { SignupComponent } from './Signup.Component'

const { Title } = Typography

export function Signup() {

    const {
        token: { colorBgBase },
    } = theme.useToken();

    return (
        <Layout style={{height: "100vh"}}>
            <Header  style={{backgroundColor: colorBgBase}}>
                <Title level={5}><Link to="/">&lt; 메인으로</Link></Title>
            </Header>
            <Content
                style={{
                    margin: '24px auto',
                    padding: '24px',
                    minHeight: 280,
                    width: "35%",
                    minWidth: 340
                }}
            >
            <SignupComponent/>
            </Content>
        </Layout>
    )
}

