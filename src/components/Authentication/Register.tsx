/* eslint-disable @typescript-eslint/no-explicit-any */





'use client'


import { useToast } from '@/hooks/useToast';
import ProfileForm from './ProfileForm';
import Toast from '@/share/Toast';

const Register = () => {
  const { showToast, toast, hideToast } = useToast();

  const handleSubmit = async (formData: any) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        showToast('success', 'নিবন্ধন সফল হয়েছে');
      } else {
        showToast('error', data?.message || 'নিবন্ধন ব্যর্থ হয়েছে');
      }
    } catch (err) {
      console.error(err);
      showToast('error', 'সার্ভার সমস্যার কারণে নিবন্ধন ব্যর্থ হয়েছে');
    }
  };

  return <div>  <ProfileForm onSubmit={handleSubmit} />
    {toast && (
      <Toast type={toast.type} message={toast.message} onClose={hideToast} />
    )}
  </div>;
};

export default Register