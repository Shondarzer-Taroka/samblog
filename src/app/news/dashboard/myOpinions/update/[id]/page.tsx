// import NewsForm from '@/components/NewsForm';
// import React from 'react';

// const page = ({params}:{params:string}) => {
//     console.log(params);
    
//     return (
//         <div>
//             <NewsForm initialData={}/>
//         </div>
//     );
// };

// export default page;























/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useAuthProvider } from '@/Providers/AuthProvider';
import { useToast } from '@/hooks/useToast';
import Toast from '@/share/Toast';
import { useState } from 'react';

import NewsForm from '@/components/NewsForm/NewsForm';
import { useParams } from 'next/navigation';

export default function OpinionUpdateForm() {
  const { user } = useAuthProvider(); // Contains user.id, etc.
  const { toast, showToast, hideToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
 const params =useParams()

  const handleSubmit = async (data: any) => {
    if (!user || !user.id) {
      showToast('error', '❌ লগইন করা হয়নি');
      return;
    }

    setIsSubmitting(true);

    try {
      // Attach authorId before sending
      const payload = {
        ...data,
        authorId: user.id
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/opinion/update/${params.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials:'include',
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      console.log(result);

      if (res.ok) {
        showToast('success', 'মতামত সফলভাবে সাবমিট হয়েছে');
      } else {
        showToast('error', '❌ মতামত আপলোড ব্যর্থ হয়েছে');
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
      <NewsForm
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        user={user} // Optional if NewsForm needs user context
      />

      {toast && (
        <Toast type={toast.type} message={toast.message} onClose={hideToast} />
      )}
    </div>
  );
}
