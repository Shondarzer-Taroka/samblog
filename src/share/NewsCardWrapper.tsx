'use client';
import Link from 'next/link';
import { incrementNewsView } from '@/utils/incrementNewsView';
import { ReactNode } from 'react';

interface Props {
  id: string;
  href: string;
  children: ReactNode;
}

const NewsCardWrapper = ({ id, href, children }: Props) => {
  const handleClick = async () => {
    await incrementNewsView(id);
  };

  return (
    <Link href={href} onClick={handleClick}>
      {children}
    </Link>
  );
};

export default NewsCardWrapper;
