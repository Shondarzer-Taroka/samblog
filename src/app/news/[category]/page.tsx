import Category from '@/components/Category/Category';
import React from 'react';

const page = async ({ params }: { params: Promise<{ category: string }> }) => {

    const { category } = await params
    console.log(category);

    return (
        <div>
            <Category />
        </div>
    );
};

export default page;