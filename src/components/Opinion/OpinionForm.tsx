'use client'

import { useAuthProvider } from '@/Providers/AuthProvider';
import { useState, useRef, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
const QuillEditor = dynamic(
    () => import('@/QuillEditor/QuillEditor'),
    {
        ssr: false
    }
);


interface OpinionFormData {
  title: string;
  content: string;
  image: File | null;
  previewImage: string | null;
}

const OpinionForm = () => {
  const { loading, user } = useAuthProvider();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<OpinionFormData>({
    title: '',
    content: '',
    image: null,
    previewImage: null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      if (!file.type.match('image.*')) {
        alert('অনুগ্রহ করে একটি ছবি ফাইল নির্বাচন করুন (jpg, png, gif)');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        alert('ছবির সাইজ ৫MB এর কম হতে হবে');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: file,
          previewImage: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null,
      previewImage: null
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const uploadImageToServer = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'your_upload_preset');

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/your_cloud_name/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('ছবি আপলোড ব্যর্থ হয়েছে');
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('আপলোড ত্রুটি:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('শিরোনাম এবং মতামত অবশ্যই填写 করতে হবে');
      return;
    }

    setIsSubmitting(true);

    try {
      let imageUrl = null;
      if (formData.image) {
        imageUrl = await uploadImageToServer(formData.image);
      }

      const response = await fetch('/api/opinions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
          imageUrl,
          authorId: user?.id
        }),
      });

      if (response.ok) {
        alert('আপনার মতামত সফলভাবে প্রকাশিত হয়েছে!');
        router.push('/opinions');
      } else {
        throw new Error('মতামত জমা দিতে ব্যর্থ হয়েছে');
      }
    } catch (error) {
      alert('কিছু সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="text-center py-12">লোড হচ্ছে...</div>;
  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl shadow-lg overflow-hidden border border-green-100">
        <div className="p-6 sm:p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">আপনার মতামত শেয়ার করুন</h2>
            <p className="text-gray-600">সম্প্রদায়ের সাথে আপনার চিন্তাভাবনা প্রকাশ করুন</p>
            <div className="w-20 h-1 bg-green-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                শিরোনাম <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="আপনার মতামত সম্পর্কে কী?"
              />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                আপনার মতামত <span className="text-red-500">*</span>
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows={8}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="আপনার বিস্তারিত মতামত এখানে লিখুন..."
              />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ছবি যোগ করুন
              </label>
              <div className="flex flex-col sm:flex-row gap-4">
                {formData.previewImage ? (
                  <div className="relative group w-full">
                    <img
                      src={formData.previewImage}
                      alt="প্রিভিউ"
                      className="w-full h-48 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                      title="ছবি সরান"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="w-full">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept="image/*"
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="w-full h-48 border-2 border-dashed border-green-300 rounded-lg flex flex-col items-center justify-center bg-green-50 hover:bg-green-100 transition-colors cursor-pointer"
                    >
                      <div className="bg-green-100 p-4 rounded-full mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-gray-700 font-medium">ছবি আপলোড করুন</p>
                      <p className="text-sm text-gray-500 mt-1">JPEG, PNG (সর্বোচ্চ ৫MB)</p>
                    </label>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    প্রকাশ করা হচ্ছে...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                    মতামত প্রকাশ করুন
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OpinionForm;