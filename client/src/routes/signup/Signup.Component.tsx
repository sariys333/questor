import { Button, Card, Form, Input, Space } from "antd";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Credentials } from "../../repositories/Auth.Repository";
import UserRepository from "../../repositories/User.Repository";
import { useSelector } from "react-redux";
import store, { AppState } from "../../store/Store";
import { userSignup } from "../../store/User.Slice";

type FieldType = Pick<
    Credentials,
    "email" | "password" | "name" | "username"
> & { pwCheck: string };

export function SignupComponent() {
    const navigate = useNavigate();

    // const user = useSelector((state: AppState) => state.user.user);

    const onFinish = (values: FieldType) => {
        console.log(values.password);
        if (values.password === values.pwCheck) {
            store.dispatch(userSignup(values)).then((result) => {
                if (result.payload) {
                    navigate("/login");
                }
            });
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <Card
            title="회원가입"
            extra={<a href="/login">LOGIN</a>}
            style={{ width: "100%" }}
        >
            {/* {success && <Navigate to="/login" replace={true} />} */}
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 24 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    name="email"
                    rules={[
                        { required: true, message: "이메일을 입력해주세요." },
                    ]}
                >
                    <Space.Compact style={{ width: "100%" }}>
                        <Input placeholder="이메일" />
                        <Button>중복확인</Button>
                    </Space.Compact>
                </Form.Item>

                <Form.Item<FieldType>
                    name="password"
                    rules={[
                        { required: true, message: "비밀번호를 입력해주세요." },
                    ]}
                >
                    <Input.Password placeholder="비밀번호" />
                </Form.Item>

                <Form.Item<FieldType>
                    name="pwCheck"
                    rules={[
                        {
                            required: true,
                            message: "비밀번호 확인 입력해주세요.",
                        },
                    ]}
                >
                    <Input.Password placeholder="비밀번호 확인" />
                </Form.Item>

                <Form.Item<FieldType>
                    name="name"
                    rules={[
                        { required: true, message: "이름을 입력해주세요." },
                    ]}
                >
                    <Input placeholder="이름" />
                </Form.Item>

                <Form.Item<FieldType>
                    name="username"
                    rules={[
                        { required: true, message: "닉네임을 입력해주세요." },
                    ]}
                >
                    <Input placeholder="닉네임" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        회원가입
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}
