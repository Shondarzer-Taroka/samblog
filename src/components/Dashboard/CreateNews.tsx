
'use client';

import { useState, useRef } from 'react';
import { useAuthProvider } from '@/Providers/AuthProvider';
import { useToast } from '@/hooks/useToast';
import Toast from '@/share/Toast';
import TinyMCEWrapper from '@/components/TinyMCEWrapper';

const CATEGORIES = [
    'চরমান ইস্যু',
    'রাজনীতি',
    'অর্থনীতি',
    'ধর্ম',
    'ইসলাম',
    'ইতিহাস',
    'সংস্কৃতি',
    'সাহিত্য'
];

const SUB_CATEGORIES = [
    'জাতীয়',
    'আন্তর্জাতিক',
    'স্থানীয়',
    'খেলাধুলা',
    'বিনোদন',
    'প্রযুক্তি',
    'স্বাস্থ্য'
];

const CreateNews = () => {
    const { user, loading: authLoading } = useAuthProvider();
    const { toast, showToast, hideToast } = useToast();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [keywords, setKeywords] = useState<string[]>([]);
    const [keywordInput, setKeywordInput] = useState('');
    const [subKeywords, setSubKeywords] = useState<string[]>([]);
    const [subKeywordInput, setSubKeywordInput] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Handle image upload and immediate upload to Cloudinary
    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            setImagePreview(URL.createObjectURL(file));

            // Immediately upload to Cloudinary
            setIsUploading(true);
            try {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', 'my-uploads'); // replace
                formData.append('cloud_name', 'dw72swggv'); // replace

                const response = await fetch('https://api.cloudinary.com/v1_1/dw72swggv/image/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('Image upload failed');
                }

                const data = await response.json();
                setImage(file); // Store the file
                setImagePreview(data.secure_url); // Use Cloudinary URL for preview
            } catch (error) {
                console.error('Error uploading image:', error);
                showToast('error', 'ছবি আপলোড ব্যর্থ হয়েছে');
                // Reset image selection if upload fails
                setImage(null);
                setImagePreview(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            } finally {
                setIsUploading(false);
            }
        }
    };

    // Add keyword
    const handleAddKeyword = () => {
        if (keywordInput && !keywords.includes(keywordInput)) {
            setKeywords([...keywords, keywordInput]);
            setKeywordInput('');
        }
    };

    // Add sub-keyword
    const handleAddSubKeyword = () => {
        if (subKeywordInput && !subKeywords.includes(subKeywordInput)) {
            setSubKeywords([...subKeywords, subKeywordInput]);
            setSubKeywordInput('');
        }
    };

    // Remove keyword
    const removeKeyword = (index: number) => {
        setKeywords(keywords.filter((_, i) => i !== index));
    };

    // Remove sub-keyword
    const removeSubKeyword = (index: number) => {
        setSubKeywords(subKeywords.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // No need to upload image here since it's already done in onChange
        const imageUrl = imagePreview?.startsWith('http') ? imagePreview : null;

        const newsData = {
            title,
            content,
            category: selectedCategory,
            subCategory: selectedSubCategory,
            keywords,
            subKeywords,
            imageUrl,
            author: {
                name: user?.name,
                email: user?.email,
                image: user?.image,
            },
        };

        try {
            const res = await fetch(`http://localhost:7700/api/news/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newsData),
            });

            const result = await res.json();

            if (res.ok) {
                showToast('success', 'সংবাদ আপলোড হয়েছে');
                // Reset form
                setTitle('');
                setContent('');
                setSelectedCategory('');
                setSelectedSubCategory('');
                setKeywords([]);
                setSubKeywords([]);
                setImage(null);
                setImagePreview(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            } else {
                showToast('error', '❌ সংবাদ তৈরি ব্যর্থ হয়েছে');
            }
        } catch (error) {
            showToast('failed', '⚠️ সার্ভার সমস্যা হয়েছে');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (authLoading) return <p className="text-center py-10">লোড হচ্ছে...</p>;

    return (
        <section className="max-w-4xl mx-auto py-10 px-4 bg-white shadow-md rounded">
            <h2 className="text-2xl font-bold mb-6">📰 সংবাদ তৈরি করুন</h2>

            {user && (
                <div className="mb-4">
                    <p><strong>লেখক:</strong> {user.name}</p>
                    <p><strong>ইমেইল:</strong> {user.email}</p>
                    {user.image && <img src={user.image} alt="User" className="w-12 h-12 rounded-full mt-2" />}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* News Title */}
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="সংবাদের শিরোনাম"
                    className="w-full border px-3 py-2 rounded"
                    required
                    disabled={isSubmitting}
                />

                {/* News Image Upload */}
                <div>
                    <label className="font-semibold block mb-1">সংবাদের ছবি</label>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                        className="w-full border px-3 py-2 rounded"
                        disabled={isSubmitting || isUploading}
                    />
                    {isUploading && (
                        <p className="text-blue-600 text-sm mt-1">ছবি আপলোড হচ্ছে...</p>
                    )}
                    {imagePreview && (
                        <div className="mt-2">
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="max-h-60 rounded object-cover"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    setImage(null);
                                    setImagePreview(null);
                                    if (fileInputRef.current) {
                                        fileInputRef.current.value = '';
                                    }
                                }}
                                className="mt-2 text-red-600 text-sm"
                                disabled={isSubmitting}
                            >
                                ছবি সরান
                            </button>
                        </div>
                    )}
                </div>

                {/* Content Editor */}
                <div className='font-noto'>
                    <TinyMCEWrapper
                        value={content}
                        onChange={setContent}
                        disabled={isSubmitting}
                    />
                </div>

                {/* Category Dropdown */}
                <div>
                    <label className="font-semibold block mb-1">ক্যাটেগরি</label>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        disabled={isSubmitting}
                    >
                        <option value="">ক্যাটেগরি নির্বাচন করুন</option>
                        {CATEGORIES.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>

                {/* Sub-Category Dropdown */}
                <div>
                    <label className="font-semibold block mb-1">সাব-ক্যাটেগরি</label>
                    <select
                        value={selectedSubCategory}
                        onChange={(e) => setSelectedSubCategory(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        disabled={isSubmitting}
                    >
                        <option value="">সাব-ক্যাটেগরি নির্বাচন করুন</option>
                        {SUB_CATEGORIES.map(subCategory => (
                            <option key={subCategory} value={subCategory}>{subCategory}</option>
                        ))}
                    </select>
                </div>

                {/* Keywords Input */}
                <div>
                    <label className="font-semibold block mb-1">কীওয়ার্ডস (যেমন: বিশ্বযুদ্ধ, জঙ্গিবাদ)</label>
                    <div className="flex gap-2 mb-2">
                        <input
                            type="text"
                            value={keywordInput}
                            onChange={(e) => setKeywordInput(e.target.value)}
                            placeholder="কীওয়ার্ড লিখুন"
                            className="border px-3 py-1 rounded w-full"
                            disabled={isSubmitting}
                        />
                        <button
                            type="button"
                            onClick={handleAddKeyword}
                            className="bg-blue-600 text-white px-3 rounded disabled:bg-blue-300"
                            disabled={isSubmitting}
                        >
                            ➕
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {keywords.map((kw, i) => (
                            <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm flex items-center">
                                {kw}
                                <button
                                    type="button"
                                    onClick={() => removeKeyword(i)}
                                    className="ml-1 text-blue-600 hover:text-blue-800"
                                    disabled={isSubmitting}
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                </div>

                {/* Sub-Keywords Input */}
                <div>
                    <label className="font-semibold block mb-1">সাব-কীওয়ার্ডস (যেমন: অর্থনৈতিক, রাজনৈতিক)</label>
                    <div className="flex gap-2 mb-2">
                        <input
                            type="text"
                            value={subKeywordInput}
                            onChange={(e) => setSubKeywordInput(e.target.value)}
                            placeholder="সাব-কীওয়ার্ড লিখুন"
                            className="border px-3 py-1 rounded w-full"
                            disabled={isSubmitting}
                        />
                        <button
                            type="button"
                            onClick={handleAddSubKeyword}
                            className="bg-green-600 text-white px-3 rounded disabled:bg-green-300"
                            disabled={isSubmitting}
                        >
                            ➕
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {subKeywords.map((subKw, i) => (
                            <span key={i} className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm flex items-center">
                                {subKw}
                                <button
                                    type="button"
                                    onClick={() => removeSubKeyword(i)}
                                    className="ml-1 text-green-600 hover:text-green-800"
                                    disabled={isSubmitting}
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    className={`bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-semibold flex items-center justify-center ${isSubmitting ? 'opacity-75' : ''}`}
                    disabled={isSubmitting || isUploading}
                >
                    {isSubmitting || isUploading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {isUploading ? 'ছবি আপলোড হচ্ছে...' : 'সংবাদ আপলোড হচ্ছে...'}
                        </>
                    ) : 'জমা দিন'}
                </button>
            </form>

            {toast && (
                <Toast type={toast.type} message={toast.message} onClose={hideToast} />
            )}
        </section>
    );
};

export default CreateNews;