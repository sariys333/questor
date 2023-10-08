
import React, { Ref, RefObject, useEffect, useRef, useState } from 'react'
import { LoginComponent } from '../login/Login.Component'
import { Button, ConfigProvider, Layout, Row, Space, Typography, theme } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import { Link, Outlet } from 'react-router-dom'

const { Title } = Typography 

export function StartContentFirst() {
    const { token } = theme.useToken();

    return (
        <>
            <Title level={1}>당신이 이번주에 완료하고 싶은 </Title>
            <Title level={1}><span style={{color: token.colorLink}}>QUEST</span>를 지금 생성해 보세요.</Title>
            <Title level={3}>나는 이번주에 </Title>
            <Title level={3}>을 </Title>
            <Title level={3}>하고 싶다.</Title>
        </>
    )
}

