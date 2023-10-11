import React from 'react'
import {Layout, theme, Typography} from 'antd'
import {Content, Header} from 'antd/es/layout/layout'
import {Link} from "react-router-dom";
import {UserSettingComponent} from "./User.Setting.Component";

const { Title } = Typography

export function UserSettingPage() {

    const {
        token: { colorBgBase },
    } = theme.useToken();

    return (
        <Layout style={{ height: "100vh"}}>
            <Header style={{ backgroundColor: colorBgBase }}>
                <Title level={5}><Link to="/">QUESTOR</Link></Title>
            </Header>
            <Content
                style={{
                    margin: '24px auto',
                    padding: '24px',
                    minHeight: 280,
                }}
                >
                <UserSettingComponent />

            </Content>
        </Layout>
    )
}

