/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useAuthProvider } from '@/Providers/AuthProvider';
import { useToast } from '@/hooks/useToast';
import Toast from '@/share/Toast';
import { useState, useEffect } from 'react';
import NewsForm from '@/components/NewsForm/NewsForm';
import { useParams } from 'next/navigation';

export default function UpdateOpinionForm() {
  const { user } = useAuthProvider();
  const { toast, showToast, hideToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [opinionData, setOpinionData] = useState<any>(null);
  const searchParams = useParams();
  const opinionId = searchParams.id

console.log(opinionData,opinionData);

  useEffect(() => {
    const fetchOpinion = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/opinion/getSingleOpinion/${opinionId}`,
        );
        const data = await res.json();
        if (res.ok) {
          setOpinionData(data?.data);
        } else {
          showToast('error', '❌ ডেটা লোড ব্যর্থ হয়েছে');
        }
      } catch (error) {
        showToast('failed', '⚠️ সার্ভারে সমস্যা হয়েছে');
        console.error('Fetch error:', error);
      }
    };

    if (opinionId) fetchOpinion();
  }, [opinionId]);

  const handleSubmit = async (data: any) => {
    if (!user || !user.id) {
      showToast('error', '❌ লগইন করা হয়নি');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        ...data,
        authorId: user.id,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/opinion/update/${opinionId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();
      console.log(result);

      if (res.ok) {
        showToast('success', '✅ মতামত সফলভাবে আপডেট হয়েছে');
       
      } else {
        showToast('error', '❌ আপডেট ব্যর্থ হয়েছে');
      }
    } catch (error) {
      showToast('failed', '⚠️ সার্ভারে সমস্যা হয়েছে');
      console.error('Submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      {opinionData && (
        <NewsForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          user={user}
          initialData={opinionData}
        />
      )}

      {toast && (
        <Toast type={toast.type} message={toast.message} onClose={hideToast} />
      )}
    </div>
  );
}
