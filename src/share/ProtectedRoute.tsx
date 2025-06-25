/* eslint-disable @typescript-eslint/no-explicit-any */
// components/ProtectedRoute.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ProtectedRoute = ({ user, children }: { user: any; children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [router, user]);

  if (!user) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
