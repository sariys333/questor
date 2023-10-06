import React, { useState } from 'react';
import './App.css';
import { QuestPage } from './quest/Quest.Page';
import { Button, ConfigProvider, Layout, Menu, theme } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token,
  } = theme.useToken();

  console.log(token)

  return (
    <ConfigProvider
      theme={{
        "token": {
          "colorPrimary": "#FA8C16",
          "colorInfo": "#FA8C16",
          "colorSuccess": "#8ff95a",
          "colorWarning": "#faf814"
        },
        "algorithm": theme.darkAlgorithm
      }}
    >
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            // theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <UserOutlined />,
                label: 'nav 1',
              },
              {
                key: '2',
                icon: <VideoCameraOutlined />,
                label: 'nav 2',
              },
              {
                key: '3',
                icon: <UploadOutlined />,
                label: 'nav 3',
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0 }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <QuestPage id={0} />

          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>

  );
}

export default App;
