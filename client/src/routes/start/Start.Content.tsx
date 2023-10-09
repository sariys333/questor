import React, { useState } from 'react'
import { LoginComponent } from '../login/Login.Component'
import { Button, Carousel, ConfigProvider, FloatButton, Grid, Layout, Row, Space, Steps, Typography, message, theme } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import { Link, Outlet } from 'react-router-dom'
import { StartContentFirst } from './Start.Content.First'
import { StartContentSecond } from './Start.Content.Second'
import { StartContentThird } from './Start.Content.Third'
import { RightOutlined, LeftOutlined, CheckOutlined } from '@ant-design/icons';
import Item from 'antd/es/list/Item';

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
        if(current > 2) {
            setCurrent(2)
        }
    };
  
    const prev = () => {
        setCurrent(current - 1);
        if(current < 0) {
            setCurrent(0)
        }
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
        display: 'grid',
        alignContent: 'center'
    };

    return (
        <>
            <div style={{width: "100%", height: "100%", display: "flex", flexFlow:"column"}}>
                <Row style={{width: "100%", flex: 1}}>
                    <div style={contentStyle}>
                        {current == 0 ? <StartContentFirst /> : <FloatButton type="default" icon={<LeftOutlined/>} style={{ right: 120, bottom: 70}} onClick={prev} />}
                        {current == 1 ? <StartContentSecond /> : <></>}
                        {current == 2 ? <StartContentThird /> : <FloatButton type="primary" icon={<RightOutlined/>} style={{ right: 70, bottom: 70}} onClick={next} />}
                    </div>
                </Row>
            </div>
        </>
    )
}

