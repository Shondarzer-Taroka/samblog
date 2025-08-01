
'use client';

import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { useToast } from '@/hooks/useToast';
import Toast from '@/share/Toast';
import { useRouter } from 'next/navigation';
// import Image from 'next/image';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast, showToast, hideToast } = useToast();
  const router = useRouter();

  const demoCredentials = {
    email: 'shishir@sakib.com',
    password: '123asD'
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDemoLogin = () => {
    setFormData(demoCredentials);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.email === '' || formData.password === '') {
      showToast('error', 'সব ফিল্ড পূরণ করুন');
      setIsLoading(false);
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

      if (res.ok) {
        showToast('success', 'সফলভাবে লগইন হয়েছে');
        setTimeout(() => {
          router.push('/news/dashboard');
        }, 300);
      } else {
        showToast('error', data?.message || 'লগইন ব্যর্থ হয়েছে');
      }
    } catch (err) {
      console.error(err);
      showToast('error', 'সার্ভার এরর');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-10 px-4 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6">
        <div className="text-center">
          {/* <div className="flex justify-center mb-4">
            <Image
              src="/logo.png"
              alt="Logo"
              width={80}
              height={80}
              className="rounded-full"
            />
          </div> */}
          <h2 className="text-2xl font-bold text-gray-800">লগইন করুন</h2>
          <p className="text-gray-600 mt-2">আপনার অ্যাকাউন্টে অ্যাক্সেস পেতে লগইন করুন</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="ইমেইল"
                value={formData.email}
                className="w-full border border-gray-300 p-3 pl-10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
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
                value={formData.password}
                className="w-full border border-gray-300 p-3 pl-10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {/* for forgotten password */}
          {/* <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => router.push('/forgot-password')}
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
            >
              পাসওয়ার্ড ভুলে গেছেন?
            </button>
          </div> */}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center transition ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            {isLoading ? 'লগইন হচ্ছে...' : 'লগইন করুন'}
          </button>

          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center transition"
          >
            <FaUser className="mr-2" />
            ডেমো অ্যাকাউন্টে লগইন
          </button>
        </form>

        <div className="text-center text-sm text-gray-600">
          <p>অ্যাকাউন্ট নেই?{' '}
            <button
              onClick={() => router.push('/register')}
              className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
            >
              রেজিস্টার করুন
            </button>
          </p>
        </div>
      </div>

      {toast && (
        <Toast type={toast.type} message={toast.message} onClose={hideToast} />
      )}
    </section>
  );
};

export default Login;