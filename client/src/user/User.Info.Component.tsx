import React, { useEffect, useState } from 'react'
import UserRepository from './User.Repository';
import { User } from './types/User.typs';

export function UserLoginComponent() {

    const [user, setUser] = useState<User[]>([]);

    // 컴포넌트 불러지면 실행하는 함수
    useEffect(() => {
        getApi();
    }, []);

    const getApi = async () => {
        const user = await UserRepository.getInfoById()
        setUser(user)
    }

    console.log(user)

    return (
        <div></div>
    )
}

