import { Layout, Typography, theme } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { Link } from "react-router-dom";
import { LoginComponent } from "./Login.Component";

const { Title } = Typography;

export function Login() {
    const {
        token: { colorBgBase },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Header style={{ backgroundColor: colorBgBase }}>
                {/* <Title level={5}>
                    <Link to="/">&lt; 메인으로</Link>
                </Title> */}
            </Header>
            <Content
                style={{
                    margin: "24px auto",
                    padding: "24px",
                    width: "100%",
                    maxWidth: 500,
                }}
            >
                <LoginComponent />
            </Content>
        </Layout>
    );
}
