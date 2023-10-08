import React, { useState } from 'react'
import { LoginComponent } from '../login/Login.Component'
import { Button, Carousel, ConfigProvider, Layout, Row, Space, Steps, Typography, message, theme } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import { Link, Outlet } from 'react-router-dom'
import { StartContentFirst } from './Start.Content.First'

const steps = [
    {
        title: 'First',
        content: 'First-content',
    },
    {
        title: 'Second',
        content: 'Second-content',
    },
    {
        title: 'Last',
        content: 'Last-content',
    },
];
export function StartContent() {
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);
  
    const next = () => {
      setCurrent(current + 1);
    };
  
    const prev = () => {
      setCurrent(current - 1);
    };
  
    const items = steps.map((item) => ({ key: item.title, title: item.title }));
  
    const contentStyle: React.CSSProperties = {
        //lineHeight: '260px',
        margin: "24px",
        width: "100%",
        textAlign: 'center',
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
    };

    return (
        <>
            <div style={{width: "100%", height: "100%", display: "flex", flexFlow:"column"}}>
                <Row style={{width: "100%", flex: 1}}>
                    <div style={contentStyle}>
                        <StartContentFirst/>
                    </div>
                </Row>
            </div>
        </>
    )
}

