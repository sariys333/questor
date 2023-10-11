import React, { useEffect, useState } from 'react'
import {Avatar, Button, Card, Modal, Tooltip, Typography} from 'antd'
import Meta from 'antd/es/card/Meta'
import { EditOutlined, EllipsisOutlined, LockOutlined, LogoutOutlined } from '@ant-design/icons';
import UserRepository from '../../repositories/User.Repository';
import { User } from '../login/types/User.typs';
import { key } from 'localforage';


export function UserSettingComponent() {

    const [user, setUser] = useState<User>()
    const [index, setIndex] = useState<number>(0);
    const [open, setOpen] = useState(false);

    // 컴포넌트 불러지면 실행하는 함수
    useEffect(() => {
        getApi();
    }, []);

    const getApi = async () => {
        const response = await UserRepository.findCurrentUser();
        setUser(response)
        console.log(response)
    }

    const onClickEdit = () => {
        setIndex(1)
    }
    
    const onClickSetting = () => {
        setIndex(2)
    }

    const onClickLogout = () => {
        setIndex(3)
    }

    const showModal = () => {
        setOpen(true);
      };
      const handleOk = () => {
        setOpen(false);
      };
    
      const handleCancel = () => {
        setOpen(false);
      };

    return (
        <>
            <Card
                style={{ width: "100%" }}
                
                actions={[
                    <Tooltip placement="bottom" title="프로필 설정">
                        <EditOutlined key="edit" onClick={onClickEdit} />
                    </Tooltip>,
                    <Tooltip placement="bottom" title="비밀번호 변경">
                        <LockOutlined key="pwReset" onClick={onClickSetting} />
                    </Tooltip>,
                    <Tooltip placement="bottom" title="로그아웃">
                        <LogoutOutlined key="logout" onClick={() => {
                            Modal.confirm({
                                title: 'Confirm',
                                content: 'Bla bla ...',
                                footer: (_, { OkBtn, CancelBtn }) => (
                                    <>
                                        <Button>Custom Button</Button>
                                        <CancelBtn />
                                        <OkBtn />
                                    </>
                                ),
                                });
                            }} />
                    </Tooltip>,
                ]}
            >
                <Meta
                    title={user?.name}
                    description={user?.username}
                />
            </Card>

            {index == 1 ?
                <Card style={{marginTop: 50}}>
                    <>user profile edit</>
                </Card>
            : <></>}

            {index == 2 ?
                <Card style={{marginTop: 50}}>
                    <>user password reset</>
                </Card>
            : <></>}

            {/* <Modal
                open={open}
                title="Title"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={(_, { OkBtn, CancelBtn }) => (
                <>
                    <Button>Custom Button</Button>
                    <CancelBtn />
                    <OkBtn />
                </>
                )}
                >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal> */}
            
            
        </>
    )
}

