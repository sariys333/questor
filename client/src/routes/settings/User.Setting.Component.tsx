import { EditOutlined, LockOutlined, LogoutOutlined } from "@ant-design/icons";
import { Card, Tooltip, Typography } from "antd";
import { useEffect, useState } from "react";
import cookie from "react-cookie";
import UserRepository from "../../repositories/User.Repository";
import { User } from "../login/types/User.typs";
import { useSelector } from "react-redux";
import { AppState } from "../../store/Store";

const { Title } = Typography;

export function UserSettingComponent() {
    const state = useSelector((state: AppState) => state.user);
    const [index, setIndex] = useState<number>(0);
    const [open, setOpen] = useState(false);

    const { user } = state;

    useEffect(() => {
        getApi();
    }, []);

    const getApi = async () => {
        await UserRepository.findCurrentUser();
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
                        <Title level={3} style={{ marginLeft: 20 }}>
                            {user?.username}
                        </Title>
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
