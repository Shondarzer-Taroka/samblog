/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useAuthProvider } from '@/Providers/AuthProvider';
import { useToast } from '@/hooks/useToast';
import Toast from '@/share/Toast';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import NewsForm from '@/components/NewsForm/NewsForm';

export default function UpdateNewsPage() {
  const { id } = useParams();
  const { user } = useAuthProvider();
  const { toast, showToast, hideToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/news/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch news');
        }
        const data = await res.json();
        setInitialData(data);
      } catch (error) {
        console.error('Error fetching news:', error);
        showToast('error', 'Failed to load news data');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchNews();
    }
  }, [id, showToast]);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/news/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log(result);
      

      if (res.ok) {
        showToast('success', 'সংবাদ আপডেট হয়েছে');
      } else {
        showToast('error', '❌ সংবাদ আপডেট ব্যর্থ হয়েছে');
      }
    } catch (error) {
      showToast('failed', '⚠️ সার্ভার সমস্যা হয়েছে');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-10">লোড হচ্ছে...</div>;
  }

  if (!initialData) {
    return <div className="text-center py-10">সংবাদ পাওয়া যায়নি</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <NewsForm 
        initialData={initialData}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        user={user}
      />
      
      {toast && (
        <Toast type={toast.type} message={toast.message} onClose={hideToast} />
      )}
    </div>
  );
}