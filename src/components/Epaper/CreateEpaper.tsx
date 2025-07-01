'use client'

import { useAuthProvider } from '@/Providers/AuthProvider';
import React from 'react';

const CreateEpaper = () => {
    const { user, loading } = useAuthProvider()
    return (
        <div>
            <form action="">
                <input type="text" name="" id="" />
            </form>
        </div>
    );
};

export default CreateEpaper;