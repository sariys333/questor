import React, { Ref, RefObject, useEffect, useRef, useState } from 'react'
import { LoginComponent } from '../login/Login.Component'
import { Button, ConfigProvider, Layout, Row, Space, Typography, theme } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import { Link, Outlet } from 'react-router-dom'
import { StartContent } from './Start.Content'

const { Title } = Typography


export function StartPage() {

    const {
        token: { colorBgBase },
    } = theme.useToken();

    return (
        <Layout style={{ height: "100vh"}}>
            <Header style={{ backgroundColor: colorBgBase }}>
                <Row justify={"space-between"}>
                    <Title level={5}><Link to={"/quest"}>QUESTOR</Link></Title>
                    <Space>
                        <Typography>이미 진행중인 QUEST가 있다면?</Typography>
                        <Button><Link to={"/login"}>로그인</Link></Button>
                    </Space>
                </Row>
            </Header>
            <Content
                style={{
                    margin: '24px',
                    padding: '24px, 300px',
                    height: "100%",
                }}
            >
                <StartContent/>
            </Content>
        </Layout>
    )
}

