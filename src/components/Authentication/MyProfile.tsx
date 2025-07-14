'use client'
import { useAuthProvider } from '@/Providers/AuthProvider';
import React from 'react';

const MyProfile = () => {
    const{user, loading}=useAuthProvider()

    if (loading) {
        return  <p className="mt-4 text-lg font-medium text-gray-700">লোড হচ্ছে...</p>
    }
    return (
        <div>
            
        </div>
    );
};

export default MyProfile;