// src/middleware/AuthMiddleware.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthProvider } from '@/Providers/AuthProvider';


type Props = {
  children: React.ReactNode;
};

const AuthMiddleware = ({ children }: Props) => {
  const router = useRouter();
  const { user, loading } = useAuthProvider();

  useEffect(() => {
    // Only redirect if loading is done and user is null
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  if (loading) return <p className="text-center py-10">লোড হচ্ছে...</p>;

  return <>{children}</>;
};

export default AuthMiddleware;
