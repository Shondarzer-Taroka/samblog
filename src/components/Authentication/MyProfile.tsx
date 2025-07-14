'use client'
import { useAuthProvider } from '@/Providers/AuthProvider';
import React from 'react';

const MyProfile = () => {
    const{user}=useAuthProvider()
    return (
        <div>
            
        </div>
    );
};

export default MyProfile;