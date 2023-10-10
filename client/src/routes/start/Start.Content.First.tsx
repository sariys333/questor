
import React, { Ref, RefObject, useEffect, useRef, useState } from 'react'
import { LoginComponent } from '../login/Login.Component'
import { Button, Col, ConfigProvider, Input, Layout, Row, Space, Typography, theme } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import { Link, Outlet } from 'react-router-dom'

const { Title } = Typography 

export function StartContentFirst() {
    const { token } = theme.useToken();

    return (
        <>
            <Title level={2}>당신이 이번주에 완료하고 싶은 </Title>
            <Title level={1}><span style={{color: token.colorLink}}>QUEST</span>를 지금 생성해 보세요.</Title>
            <Title level={3}>나는 이번주에 </Title>
            <Row align={"middle"} justify={"center"}>
                <Input style={{width: '30%', maxHeight: "30px", marginTop: 13, maxWidth: 400}}/>
                <Title level={3}>&nbsp; 을(를)</Title>
            </Row>
            <Title level={3}>하고 싶다.</Title>
        </>
    )
}

