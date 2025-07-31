'use client'
import Loading from '@/app/loading';
import OpinionTable from '@/components/Dashboard/OpinionTable';
import { useAuthProvider } from '@/Providers/AuthProvider';
import React from 'react';

const Page = () => {
    const { user, loading } = useAuthProvider()

    if (loading) {
        
        return <Loading/>
    }
    return (
        <div>
            <OpinionTable userEmail={user?.email} />
        </div>
    );
};

export default Page;









