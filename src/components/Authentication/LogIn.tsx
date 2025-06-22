'use client';

import React, { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useToast } from '@/hooks/useToast';
import Toast from '@/share/Toast';
// import axios from 'axios';
import { useRouter } from 'next/navigation'; // for redirect

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { toast, showToast, hideToast } = useToast();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.email === '' || formData.password === '') {
      showToast('error', 'সব ফিল্ড পূরণ করুন');
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });

      const data = await res.json();
      console.log(data);
      router.push('/news/dashboard');

      if (res.ok) {
        // localStorage.setItem('token', data.token);
        showToast('success', 'সফলভাবে লগইন হয়েছে');
      } else {
        showToast('error', data?.message || 'লগইন ব্যর্থ হয়েছে');
      }
    } catch (err) {
      console.error(err);
      showToast('error', 'সার্ভার এরর');
    }
  };



  return (
    <section className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">লগইন করুন</h2>

        <div className="relative">
          <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            name="email"
            placeholder="ইমেইল"
            className="w-full border p-2 pl-10 rounded"
            onChange={handleChange}
            required
          />
        </div>

        <div className="relative">
          <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="password"
            name="password"
            placeholder="পাসওয়ার্ড"
            className="w-full border p-2 pl-10 rounded"
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-semibold"
        >
          লগইন করুন
        </button>

        <div className='flex justify-between'>
          <button>forgotten password?</button>
          <button className='underline text-blue-400 cursor-pointer' onClick={()=>router.push('/register')}>Register</button>
        </div>

      </form>

      {toast && (
        <Toast type={toast.type} message={toast.message} onClose={hideToast} />
      )}
    </section>
  );
};

export default Login;
