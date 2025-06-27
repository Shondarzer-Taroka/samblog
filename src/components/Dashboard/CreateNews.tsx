

'use client';

import { useState, useRef, useCallback } from 'react';
import { useAuthProvider } from '@/Providers/AuthProvider';
import { useToast } from '@/hooks/useToast';
import Toast from '@/share/Toast';

import 'quill/dist/quill.snow.css'; // Import snow theme

import Image from 'next/image';


import dynamic from 'next/dynamic';



const QuillEditor = dynamic(() => import('@/QuillEditor/QuillEditor'), {
  ssr: false,
});


const CATEGORIES = [
    'চলমান ইস্যু',
    'রাজনীতি',
    'অর্থনীতি',
    'ধর্ম',
    'ইসলাম',
    'ইতিহাস',
    'সারাদেশ',
    'সংস্কৃতি',
    'আন্তর্জাতিক',
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
    const [imageTitle, setImageTitle] = useState('');
    const [imageSource, setImageSource] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);








// Handle file selection (both drag-and-drop and file input)
const handleFile = useCallback(async (file: File) => {
    if (!file.type.match('image.*')) {
        showToast('error', 'শুধুমাত্র ছবি ফাইল অনুমোদিত');
        return;
    }

    setImage(file);
    setImagePreview(URL.createObjectURL(file));

    // Immediately upload to Cloudinary
    setIsUploading(true);
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'my-uploads');
        formData.append('cloud_name', 'dw72swggv');

        const response = await fetch('https://api.cloudinary.com/v1_1/dw72swggv/image/upload', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Image upload failed');
        }

        const data = await response.json();
        setImage(file);
        setImagePreview(data.secure_url);
    } catch (error) {
        console.error('Error uploading image:', error);
        showToast('error', 'ছবি আপলোড ব্যর্থ হয়েছে');
        setImage(null);
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    } finally {
        setIsUploading(false);
    }
}, [showToast]);

// Handle file input change
const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        await handleFile(e.target.files[0]);
    }
};

// Drag and drop handlers
const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
};

const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
};

const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
};

const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        await handleFile(e.dataTransfer.files[0]);
        e.dataTransfer.clearData();
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

    const imageUrl = imagePreview?.startsWith('http') ? imagePreview : null;

    const newsData = {
        title,
        content,
        category: selectedCategory,
        subCategory: selectedSubCategory,
        keywords,
        subKeywords,
        imageUrl,
        imageTitle,
        imageSource,
        author: {
            name: user?.name,
            email: user?.email,
            image: user?.image,
        },
    };
console.log(newsData);


    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/news/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newsData),
        });

        const result = await res.json();
        console.log(result);
        console.log(image);


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
            setImageTitle('');
            setImageSource('');
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

// if (authLoading) return <p className="text-center py-10">লোড হচ্ছে...</p>;

console.log(authLoading);

    return (
        <section className="max-w-4xl mx-auto py-10 px-4 bg-white shadow-md rounded">
            <h2 className="text-2xl font-bold mb-6">📰 সংবাদ তৈরি করুন</h2>

            {user && (
                <div className="mb-4">
                    <p><strong>লেখক:</strong> {user.name}</p>
                    <p><strong>ইমেইল:</strong> {user.email}</p>
                    {user.image && <Image src={user.image} width={48} height={48} alt="User" className="w-12 h-12 rounded-full mt-2" />}
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

                {/* News Image Upload with Drag and Drop */}
                <div className="space-y-4">
                    <div>
                        <label className="font-semibold block mb-1">সংবাদের ছবি</label>

                        {/* Drag and Drop Area */}
                        <div
                            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                                }`}
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                accept="image/*"
                                className="hidden"
                                disabled={isSubmitting || isUploading}
                            />

                            {imagePreview ? (
                                <div className="flex flex-col items-center">
                                    <Image

                                        src={imagePreview}
                                        alt="Preview"
                                        width={256}
                                        height={300}
                                        className="max-h-60 rounded object-cover mb-2"
                                    />
                                    <p className="text-sm text-gray-600 mb-2">ছবি সিলেক্টেড</p>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setImage(null);
                                            setImagePreview(null);
                                            setImageTitle('');
                                            setImageSource('');
                                            if (fileInputRef.current) {
                                                fileInputRef.current.value = '';
                                            }
                                        }}
                                        className="text-red-600 text-sm underline"
                                        disabled={isSubmitting}
                                    >
                                        ছবি পরিবর্তন করুন
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <svg
                                        className="mx-auto h-12 w-12 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <p className="mt-2 text-sm text-gray-600">
                                        <span className="font-semibold">ছবি আপলোড করতে ক্লিক করুন</span> অথবা এখানে ড্র্যাগ এন্ড ড্রপ করুন
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        PNG, JPG, GIF (সর্বোচ্চ 5MB)
                                    </p>
                                </>
                            )}
                        </div>

                        {isUploading && (
                            <div className="mt-2">
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div className="bg-blue-600 h-2.5 rounded-full animate-pulse"></div>
                                </div>
                                <p className="text-blue-600 text-sm mt-1">ছবি আপলোড হচ্ছে...</p>
                            </div>
                        )}
                    </div>

                    {/* Image Title Input */}
                    <div>
                        <label className="font-semibold block mb-1">ছবির শিরোনাম</label>
                        <input
                            type="text"
                            value={imageTitle}
                            onChange={(e) => setImageTitle(e.target.value)}
                            placeholder="ছবির শিরোনাম লিখুন"
                            className="w-full border px-3 py-2 rounded"
                            disabled={isSubmitting}
                        />
                    </div>

                    {/* Image Source Input */}
                    <div>
                        <label className="font-semibold block mb-1">ছবির সোর্স</label>
                        <input
                            type="text"
                            value={imageSource}
                            onChange={(e) => setImageSource(e.target.value)}
                            placeholder="ছবির সোর্স লিখুন (যদি থাকে)"
                            className="w-full border px-3 py-2 rounded"
                            disabled={isSubmitting}
                        />
                    </div>
                </div>

                {/* Content Editor */}

                <div>
                    {/* {isClient && (
                        <div
                            ref={editorRef}
                            className="bg-white border rounded"
                            style={{ height: '16rem' }}
                        />
                    )} */}

                    <QuillEditor onContentChange={setContent} />
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














