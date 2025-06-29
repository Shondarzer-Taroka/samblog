import Category from '@/components/Category/Category';
import React from 'react';

const page = async ({ params }: { params: Promise<{ category: string }> }) => {

    const { category } = await params

    return (
        <div>
            <Category category={category} />
        </div>
    );
};

export default page;