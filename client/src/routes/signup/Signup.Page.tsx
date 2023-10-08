import React, { useState } from 'react'
import { LoginComponent } from '../login/Login.Component'
import { ConfigProvider, Layout, Space, theme } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import { Outlet } from 'react-router-dom'
import { SignupComponent } from './Signup.Component'


export function Signup() {

    return (
        <Layout>
            <Header>
                    <a href="/">HOME</a>
            
            </Header>
            <Content
                    style={{
                        margin: '24px 16px',
                        padding: '24px, 300px',
                        minHeight: 280,
                    }}
                >
                <SignupComponent/>
            </Content>
        </Layout>
    )
}

