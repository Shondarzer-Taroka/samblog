'use client'
import { useAuthProvider } from '@/Providers/AuthProvider';
import React from 'react';

const CreateOpinion = () => {
    const { loading, user } = useAuthProvider()
    return (
        <div>

        </div>
    );
};

export default CreateOpinion;