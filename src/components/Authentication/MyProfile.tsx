'use client'
import { useAuthProvider } from '@/Providers/AuthProvider';
import axios from 'axios';
import React, { useEffect, useState } from 'react';


interface User {

    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    division?: string;
    district?: string;
    thana?: string;
    union?: string;
    postCode?: string;
    image?: string;

}
const MyProfile = () => {
    const { user, loading } = useAuthProvider()
    const [userInfo, setUserInfo] = useState<User>({})
    const [spinner, setSpinner] = useState<boolean>(true)
    useEffect(() => {
        async function getUserInfo() {
            setSpinner(true)
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/users/singleUserInfo/${user?.id}`, { withCredentials: true })
            const result = res.data
            setUserInfo(result)
            setSpinner(false)
        }

        getUserInfo()

    }, [user?.id])

    if (loading || spinner) {
        return <p className="mt-4 text-lg font-medium text-gray-700">লোড হচ্ছে...</p>
    }


    return (
        <div>

        </div>
    );
};

export default MyProfile;