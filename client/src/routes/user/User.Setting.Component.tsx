import { EditOutlined, LockOutlined, LogoutOutlined } from "@ant-design/icons";
import { Card, Tooltip, Typography } from "antd";
import { useEffect, useState } from "react";
import UserRepository from "../../repositories/User.Repository";
import { User } from "../login/types/User.typs";

const { Title } = Typography;

export function UserSettingComponent() {
    const [user, setUser] = useState<User>();
    const [index, setIndex] = useState<number>(0);
    const [open, setOpen] = useState(false);

    // 컴포넌트 불러지면 실행하는 함수
    useEffect(() => {
        getApi();
    }, []);

    const getApi = async () => {
        const response = await UserRepository.findCurrentUser();
        setUser(response);
        console.log(response);
    };

    const onClickEdit = () => {
        setIndex(1);
    };

    const onClickSetting = () => {
        setIndex(2);
    };

    const onClickLogout = () => {};

    return (
        <>
            <Card
                cover={
                    <>
                        <Title level={1} style={{ marginLeft: 20 }}>
                            {user?.name}
                        </Title>
                        <Title level={3}>{user?.username}</Title>
                    </>
                }
                style={{ width: "100%", maxWidth: 500 }}
                actions={[
                    <Tooltip placement="bottom" title="프로필 설정">
                        <EditOutlined key="edit" onClick={onClickEdit} />
                    </Tooltip>,
                    <Tooltip placement="bottom" title="비밀번호 변경">
                        <LockOutlined key="pwReset" onClick={onClickSetting} />
                    </Tooltip>,
                    <Tooltip placement="bottom" title="로그아웃">
                        <LogoutOutlined key="logout" onClick={onClickLogout} />
                    </Tooltip>,
                ]}
            ></Card>

            {index == 1 ? (
                <Card style={{ marginTop: 50 }}>
                    <>user profile edit</>
                </Card>
            ) : (
                <></>
            )}

            {index == 2 ? (
                <Card style={{ marginTop: 50 }}>
                    <>user password reset</>
                </Card>
            ) : (
                <></>
            )}
        </>
    );
}
