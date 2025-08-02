// /* eslint-disable @typescript-eslint/no-unused-vars */

// 'use client';

// import { useState, useRef, useCallback, useEffect } from 'react';
// import Image from 'next/image';
// import { NewsFormProps, CATEGORIES, SUB_CATEGORIES } from '@/types/news.types';
// import dynamic from 'next/dynamic';


// export const categoriesOpitons = [
//   'বাণী',

//   'চলমান ইস্যু',
//   'রাজনীতি',
//   'অর্থনীতি',
//   'ধর্ম',
  
//   'সারাদেশ',
//   'সংস্কৃতি',
//   'আন্তর্জাতিক',
//   'সাহিত্য',
//   'মতামত',
//   'ইসলাম',
// ];

// console.log(CATEGORIES)

// const QuillEditor = dynamic(
//     () => import('@/QuillEditor/QuillEditor'),
//     {
//         ssr: false
//     }
// );

// export default function NewsForm({
//     initialData,
//     onSubmit,
//     isSubmitting,
//     user
// }: NewsFormProps) {
//     const [content, setContent] = useState('');

//     const [formData, setFormData] = useState({
//         title: initialData?.title || '',
//         // content: initialData?.content || '',
//         content:  '',

//         category: initialData?.category || '',
//         subCategory: initialData?.subCategory || '',
//         keywords: initialData?.keywords || [],
//         subKeywords: initialData?.subKeywords || [],
//         imageUrl: initialData?.imageUrl || '',
//         imageTitle: initialData?.imageTitle || '',
//         imageSource: initialData?.imageSource || '',
//     });

//     const [keywordInput, setKeywordInput] = useState('');
//     const [subKeywordInput, setSubKeywordInput] = useState('');
//     const [imagePreview, setImagePreview] = useState<string | null>(initialData?.imageUrl || null);
//     const [isUploading, setIsUploading] = useState(false);
//     const [isDragging, setIsDragging] = useState(false);
//     const fileInputRef = useRef<HTMLInputElement>(null);
//     const [modifiedContent, setModifiedContent] = useState('')

//     console.log(formData, 'nws form');

//     // ছবি আপলোড হ্যান্ডলার
//     const handleFile = useCallback(async (file: File) => {
//         if (!file.type.match('image.*')) {
//             alert('শুধুমাত্র ছবি ফাইল অনুমোদিত');
//             return;
//         }

//         setIsUploading(true);
//         try {
//             const formData = new FormData();
//             formData.append('file', file);
//             formData.append('upload_preset', 'my-uploads');
//             formData.append('cloud_name', 'dw72swggv');

//             const response = await fetch('https://api.cloudinary.com/v1_1/dw72swggv/image/upload', {
//                 method: 'POST',
//                 body: formData,
//             });

//             if (!response.ok) {
//                 throw new Error('ছবি আপলোড ব্যর্থ হয়েছে');
//             }

//             const data = await response.json();
//             setImagePreview(data.secure_url);
//             setFormData(prev => ({ ...prev, imageUrl: data.secure_url }));
//         } catch (error) {
//             console.error('ছবি আপলোডে সমস্যা:', error);
//             alert('ছবি আপলোডে সমস্যা হয়েছে');
//         } finally {
//             setIsUploading(false);
//         }
//     }, []);

//     // কন্টেন্ট চেঞ্জ হ্যান্ডলার
//     //   const handleContentChange = (content: string) => {
//     //     setFormData(prev => ({ ...prev, content }));
//     //   };

//     // const handleContentChange = useCallback((newContent: string) => {
//     // setContent(newContent);
//     // setFormData(prev => ({ ...prev, content }));
//     // console.log('Content updated:', newContent); // Debugging
//     // }, [content]);


//     // useEffect(() => {
//     //     // setContent(newContent);
//     //     // setFormData(prev => ({ ...prev, content }));
//     //     console.log('Content updated:', content); // Debugging
//     // }, [content])


//     useEffect(() => {
//         // setContent(newContent);
//         setFormData(prev => ({ ...prev, content }));
//         console.log('Content updated:', content); // Debugging
//     }, [content])


//     // ফর্ম সাবমিশন
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         // setFormData(prev => ({ ...prev, content }));
//         // ভ্যালিডেশন
//         // if (!formData.title || !formData.content || !formData.category) {
//         //   alert('দয়া করে সকল আবশ্যক ফিল্ড পূরণ করুন');
//         //   return;
//         // }

//         await onSubmit({
//             ...formData,
//             id: initialData?.id
//         });
//     };

//     // অন্যান্য হ্যান্ডলার ফাংশন (কীওয়ার্ড, সাব-কীওয়ার্ড ইত্যাদি)
//     const handleAddKeyword = () => {
//         if (keywordInput && !formData.keywords.includes(keywordInput)) {
//             setFormData(prev => ({
//                 ...prev,
//                 keywords: [...prev.keywords, keywordInput]
//             }));
//             setKeywordInput('');
//         }
//     };

//     const handleAddSubKeyword = () => {
//         if (subKeywordInput && !formData.subKeywords.includes(subKeywordInput)) {
//             setFormData(prev => ({
//                 ...prev,
//                 subKeywords: [...prev.subKeywords, subKeywordInput]
//             }));
//             setSubKeywordInput('');
//         }
//     };

//     const removeKeyword = (index: number) => {
//         setFormData(prev => ({
//             ...prev,
//             keywords: prev.keywords.filter((_, i) => i !== index)
//         }));
//     };

//     const removeSubKeyword = (index: number) => {
//         setFormData(prev => ({
//             ...prev,
//             subKeywords: prev.subKeywords.filter((_, i) => i !== index)
//         }));
//     };

//     console.log(formData);


//     return (
//         <section className="max-w-4xl mx-auto py-10 px-4 bg-white shadow-md rounded">
//             <h2 className="text-2xl font-bold mb-6">
//                 {initialData ? '📝 সংবাদ আপডেট করুন' : '📰 নতুন সংবাদ তৈরি করুন'}
//             </h2>

//             {user && (
//                 <div className="mb-4">
//                     <p><strong>লেখক:</strong> {user.name}</p>
//                     <p><strong>ইমেইল:</strong> {user.email}</p>
//                     {user.image && (
//                         <Image
//                             src={user.image}
//                             width={48}
//                             height={48}
//                             alt="User"
//                             className="w-12 h-12 rounded-full mt-2"
//                         />
//                     )}
//                 </div>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* শিরোনাম */}
//                 <div>
//                     <label className="font-semibold block mb-1">শিরোনাম *</label>
//                     <input
//                         type="text"
//                         value={formData.title}
//                         onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
//                         placeholder="সংবাদের শিরোনাম"
//                         className="w-full border px-3 py-2 rounded"
//                         required
//                         disabled={isSubmitting}
//                     />
//                 </div>

//                 {/* ছবি আপলোড */}
//                 <div className="space-y-4">
//                     <div>
//                         <label className="font-semibold block mb-1">সংবাদের ছবি</label>
//                         <div
//                             className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
//                                 }`}
//                             onDragEnter={(e) => { e.preventDefault(); setIsDragging(true); }}
//                             onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
//                             onDragOver={(e) => e.preventDefault()}
//                             onDrop={(e) => {
//                                 e.preventDefault();
//                                 setIsDragging(false);
//                                 if (e.dataTransfer.files?.[0]) {
//                                     handleFile(e.dataTransfer.files[0]);
//                                 }
//                             }}
//                             onClick={() => fileInputRef.current?.click()}
//                         >
//                             <input
//                                 type="file"
//                                 ref={fileInputRef}
//                                 onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
//                                 accept="image/*"
//                                 className="hidden"
//                                 disabled={isSubmitting || isUploading}
//                             />

//                             {imagePreview ? (
//                                 <div className="flex flex-col items-center">
//                                     <Image
//                                         src={imagePreview}
//                                         alt="Preview"
//                                         width={256}
//                                         height={300}
//                                         className="max-h-60 rounded object-cover mb-2"
//                                     />
//                                     <button
//                                         type="button"
//                                         onClick={(e) => {
//                                             e.stopPropagation();
//                                             setImagePreview(null);
//                                             setFormData(prev => ({ ...prev, imageUrl: '' }));
//                                             if (fileInputRef.current) fileInputRef.current.value = '';
//                                         }}
//                                         className="text-red-600 text-sm underline"
//                                         disabled={isSubmitting}
//                                     >
//                                         ছবি পরিবর্তন করুন
//                                     </button>
//                                 </div>
//                             ) : (
//                                 <>
//                                     <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                                     </svg>
//                                     <p className="mt-2 text-sm text-gray-600">
//                                         <span className="font-semibold">ছবি আপলোড করতে ক্লিক করুন</span> অথবা এখানে ড্র্যাগ এন্ড ড্রপ করুন
//                                     </p>
//                                     <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF (সর্বোচ্চ 5MB)</p>
//                                 </>
//                             )}
//                         </div>

//                         {isUploading && (
//                             <div className="mt-2">
//                                 <div className="w-full bg-gray-200 rounded-full h-2.5">
//                                     <div className="bg-blue-600 h-2.5 rounded-full animate-pulse"></div>
//                                 </div>
//                                 <p className="text-blue-600 text-sm mt-1">ছবি আপলোড হচ্ছে...</p>
//                             </div>
//                         )}
//                     </div>

//                     {/* ছবির শিরোনাম */}
//                     <div>
//                         <label className="font-semibold block mb-1">ছবির শিরোনাম</label>
//                         <input
//                             type="text"
//                             value={formData.imageTitle}
//                             onChange={(e) => setFormData(prev => ({ ...prev, imageTitle: e.target.value }))}
//                             placeholder="ছবির শিরোনাম লিখুন"
//                             className="w-full border px-3 py-2 rounded"
//                             disabled={isSubmitting}
//                         />
//                     </div>

//                     {/* ছবির সোর্স */}
//                     <div>
//                         <label className="font-semibold block mb-1">ছবির সোর্স</label>
//                         <input
//                             type="text"
//                             value={formData.imageSource}
//                             onChange={(e) => setFormData(prev => ({ ...prev, imageSource: e.target.value }))}
//                             placeholder="ছবির সোর্স লিখুন (যদি থাকে)"
//                             className="w-full border px-3 py-2 rounded"
//                             disabled={isSubmitting}
//                         />
//                     </div>
//                 </div>

//                 {/* কন্টেন্ট এডিটর */}
//                 {/* <div>
//           <label className="font-semibold block mb-1">সংবাদের বিস্তারিত *</label>
//           <QuillEditor 
//             // initialContent={formData.content}
//             onContentChange={handleContentChange}
//           />
//           {!formData.content && (
//             <p className="text-red-500 text-sm mt-1">কন্টেন্ট লিখতে হবে</p>
//           )}
//         </div> */}





//                 <div>
//                     <h1>বিষয়বস্তু লিখুন</h1>
//                     <QuillEditor
//                         initialContent={initialData?.content}
//                         onContentChange={setContent}
//                     />
//                 </div>



//                 {/* ক্যাটেগরি */}
//                 <div>
//                     <label className="font-semibold block mb-1">ক্যাটেগরি *</label>
//                     <select
//                         value={formData.category}
//                         onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
//                         className="w-full border px-3 py-2 rounded"
//                         required
//                         disabled={isSubmitting}
//                     >
//                         <option value="">ক্যাটেগরি নির্বাচন করুন</option>
//                         {CATEGORIES.map(category => (
//                             <option key={category} value={category}>{category}</option>
//                         ))}
//                         {/* {categoriesOpitons.map(category => (
                            
                            
//                             <option key={category} value={category}>{category}</option>
//                         ))} */}

//                     </select>
//                 </div>

//                 {/* সাব-ক্যাটেগরি */}
//                 <div>
//                     <label className="font-semibold block mb-1">সাব-ক্যাটেগরি</label>
//                     <select
//                         value={formData.subCategory}
//                         onChange={(e) => setFormData(prev => ({ ...prev, subCategory: e.target.value }))}
//                         className="w-full border px-3 py-2 rounded"
//                         disabled={isSubmitting}
//                     >
//                         <option value="">সাব-ক্যাটেগরি নির্বাচন করুন</option>
//                         {SUB_CATEGORIES.map(subCategory => (
//                             <option key={subCategory} value={subCategory}>{subCategory}</option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* কীওয়ার্ডস */}
//                 <div>
//                     <label className="font-semibold block mb-1">কীওয়ার্ডস</label>
//                     <div className="flex gap-2 mb-2">
//                         <input
//                             type="text"
//                             value={keywordInput}
//                             onChange={(e) => setKeywordInput(e.target.value)}
//                             placeholder="কীওয়ার্ড লিখুন"
//                             className="border px-3 py-1 rounded w-full"
//                             disabled={isSubmitting}
//                         />
//                         <button
//                             type="button"
//                             onClick={handleAddKeyword}
//                             className="bg-blue-600 text-white px-3 rounded disabled:bg-blue-300"
//                             disabled={isSubmitting}
//                         >
//                             ➕
//                         </button>
//                     </div>
//                     <div className="flex flex-wrap gap-2">
//                         {formData.keywords.map((kw, i) => (
//                             <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm flex items-center">
//                                 {kw}
//                                 <button
//                                     type="button"
//                                     onClick={() => removeKeyword(i)}
//                                     className="ml-1 text-blue-600 hover:text-blue-800"
//                                     disabled={isSubmitting}
//                                 >
//                                     ×
//                                 </button>
//                             </span>
//                         ))}
//                     </div>
//                 </div>

//                 {/* সাব-কীওয়ার্ডস */}
//                 <div>
//                     <label className="font-semibold block mb-1">সাব-কীওয়ার্ডস</label>
//                     <div className="flex gap-2 mb-2">
//                         <input
//                             type="text"
//                             value={subKeywordInput}
//                             onChange={(e) => setSubKeywordInput(e.target.value)}
//                             placeholder="সাব-কীওয়ার্ড লিখুন"
//                             className="border px-3 py-1 rounded w-full"
//                             disabled={isSubmitting}
//                         />
//                         <button
//                             type="button"
//                             onClick={handleAddSubKeyword}
//                             className="bg-green-600 text-white px-3 rounded disabled:bg-green-300"
//                             disabled={isSubmitting}
//                         >
//                             ➕
//                         </button>
//                     </div>
//                     <div className="flex flex-wrap gap-2">
//                         {formData.subKeywords.map((subKw, i) => (
//                             <span key={i} className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm flex items-center">
//                                 {subKw}
//                                 <button
//                                     type="button"
//                                     onClick={() => removeSubKeyword(i)}
//                                     className="ml-1 text-green-600 hover:text-green-800"
//                                     disabled={isSubmitting}
//                                 >
//                                     ×
//                                 </button>
//                             </span>
//                         ))}
//                     </div>
//                 </div>

//                 {/* সাবমিট বাটন */}
//                 <button
//                     type="submit"
//                     className={`bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-semibold flex items-center justify-center ${isSubmitting || isUploading ? 'opacity-75' : ''
//                         }`}
//                     disabled={isSubmitting || isUploading}
//                 >
//                     {isSubmitting || isUploading ? (
//                         <>
//                             <svg
//                                 className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                             >
//                                 <circle
//                                     className="opacity-25"
//                                     cx="12"
//                                     cy="12"
//                                     r="10"
//                                     stroke="currentColor"
//                                     strokeWidth="4"
//                                 ></circle>
//                                 <path
//                                     className="opacity-75"
//                                     fill="currentColor"
//                                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                                 ></path>
//                             </svg>
//                             {isUploading ? 'ছবি আপলোড হচ্ছে...' : 'সংবাদ সাবমিট হচ্ছে...'}
//                         </>
//                     ) : (
//                         initialData ? 'আপডেট করুন' : 'জমা দিন'
//                     )}
//                 </button>
//             </form>
//         </section>
//     );
// }





















/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { NewsFormProps, CATEGORIES, SUB_CATEGORIES } from '@/types/news.types';
import dynamic from 'next/dynamic';
import BdAddress, { bdUnions } from 'bd-address';

const QuillEditor = dynamic(
  () => import('@/QuillEditor/QuillEditor'),
  { ssr: false }
);

interface Division {
  id: string;
  name: string;
  bn_name: string;
  url: string;
}

interface District {
  id: string;
  division_id: string;
  name: string;
  bn_name: string;
  lat: string;
  lon: string;
  url: string;
}

interface Upazilla {
  id: string;
  district_id: string;
  name: string;
  bn_name: string;
  url: string;
}

interface Union {
  id: string;
  upazilla_id: string;
  name: string;
  bn_name: string;
  url: string;
}

export default function NewsForm({
  initialData,
  onSubmit,
  isSubmitting,
  user
}: NewsFormProps) {
  // Content state
  const [content, setContent] = useState('');

  // Main form data state
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    content: initialData?.content || '',
    category: initialData?.category || '',
    subCategory: initialData?.subCategory || '',
    keywords: initialData?.keywords || [],
    subKeywords: initialData?.subKeywords || [],
    imageUrl: initialData?.imageUrl || '',
    imageTitle: initialData?.imageTitle || '',
    imageSource: initialData?.imageSource || '',
    division: initialData?.division || '',
    district: initialData?.district || '',
    thana: initialData?.thana || '',
    union: initialData?.union || '',
  });

  // Address data states
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [upazilas, setUpazilas] = useState<Upazilla[]>([]);
  const [unions, setUnions] = useState<Union[]>([]);

  // Other form states
  const [keywordInput, setKeywordInput] = useState('');
  const [subKeywordInput, setSubKeywordInput] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.imageUrl || null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load divisions on component mount
  useEffect(() => {
    const allDivisions = BdAddress.divisions();
    setDivisions(allDivisions);
  }, []);

  // Load districts when division changes
  useEffect(() => {
    if (formData.division) {
      const selectedDivision = divisions.find(d => d.bn_name === formData.division);
      if (selectedDivision) {
        const divisionDistricts = BdAddress.district(selectedDivision.id);
        setDistricts(divisionDistricts);
      }
    } else {
      setDistricts([]);
      setFormData(prev => ({ ...prev, district: '', thana: '', union: '' }));
    }
  }, [formData.division, divisions]);

  // Load upazilas when district changes
  useEffect(() => {
    if (formData.district) {
      const selectedDistrict = districts.find(d => d.bn_name === formData.district);
      if (selectedDistrict) {
        const districtUpazilas = BdAddress.upazilla(selectedDistrict.id);
        setUpazilas(districtUpazilas);
      }
    } else {
      setUpazilas([]);
      setFormData(prev => ({ ...prev, thana: '', union: '' }));
    }
  }, [formData.district, districts]);

  // Load unions when upazila changes
  useEffect(() => {
    if (formData.thana) {
      const selectedUpazila = upazilas.find(u => u.bn_name === formData.thana);
      if (selectedUpazila) {
        const upazilaUnions = bdUnions().filter((u: { upazilla_id: string }) => 
          u.upazilla_id === selectedUpazila.id
        );
        setUnions(upazilaUnions);
      }
    } else {
      setUnions([]);
      setFormData(prev => ({ ...prev, union: '' }));
    }
  }, [formData.thana, upazilas]);

  // Image upload handler
  const handleFile = useCallback(async (file: File) => {
    if (!file.type.match('image.*')) {
      alert('শুধুমাত্র ছবি ফাইল অনুমোদিত');
      return;
    }

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
        throw new Error('ছবি আপলোড ব্যর্থ হয়েছে');
      }

      const data = await response.json();
      setImagePreview(data.secure_url);
      setFormData(prev => ({ ...prev, imageUrl: data.secure_url }));
    } catch (error) {
      console.error('ছবি আপলোডে সমস্যা:', error);
      alert('ছবি আপলোডে সমস্যা হয়েছে');
    } finally {
      setIsUploading(false);
    }
  }, []);

  // Update content in formData when editor content changes
  useEffect(() => {
    setFormData(prev => ({ ...prev, content }));
  }, [content]);

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      ...formData,
      id: initialData?.id
    });
  };

  // Keyword handlers
  const handleAddKeyword = () => {
    if (keywordInput && !formData.keywords.includes(keywordInput)) {
      setFormData(prev => ({
        ...prev,
        keywords: [...prev.keywords, keywordInput]
      }));
      setKeywordInput('');
    }
  };

  const handleAddSubKeyword = () => {
    if (subKeywordInput && !formData.subKeywords.includes(subKeywordInput)) {
      setFormData(prev => ({
        ...prev,
        subKeywords: [...prev.subKeywords, subKeywordInput]
      }));
      setSubKeywordInput('');
    }
  };

  const removeKeyword = (index: number) => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords.filter((_, i) => i !== index)
    }));
  };

  const removeSubKeyword = (index: number) => {
    setFormData(prev => ({
      ...prev,
      subKeywords: prev.subKeywords.filter((_, i) => i !== index)
    }));
  };

  return (
    <section className="max-w-4xl mx-auto py-10 px-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-6">
        {initialData ? '📝 সংবাদ আপডেট করুন' : '📰 নতুন সংবাদ তৈরি করুন'}
      </h2>

      {user && (
        <div className="mb-4">
          <p><strong>লেখক:</strong> {user.name}</p>
          <p><strong>ইমেইল:</strong> {user.email}</p>
          {user.image && (
            <Image
              src={user.image}
              width={48}
              height={48}
              alt="User"
              className="w-12 h-12 rounded-full mt-2"
            />
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title field */}
        <div>
          <label className="font-semibold block mb-1">শিরোনাম *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="সংবাদের শিরোনাম"
            className="w-full border px-3 py-2 rounded"
            required
            disabled={isSubmitting}
          />
        </div>

        {/* Image upload section */}
        <div className="space-y-4">
          <div>
            <label className="font-semibold block mb-1">সংবাদের ছবি</label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                if (e.dataTransfer.files?.[0]) {
                  handleFile(e.dataTransfer.files[0]);
                }
              }}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
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
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImagePreview(null);
                      setFormData(prev => ({ ...prev, imageUrl: '' }));
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                    className="text-red-600 text-sm underline"
                    disabled={isSubmitting}
                  >
                    ছবি পরিবর্তন করুন
                  </button>
                </div>
              ) : (
                <>
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="mt-2 text-sm text-gray-600">
                    <span className="font-semibold">ছবি আপলোড করতে ক্লিক করুন</span> অথবা এখানে ড্র্যাগ এন্ড ড্রপ করুন
                  </p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF (সর্বোচ্চ 5MB)</p>
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

          {/* Image title */}
          <div>
            <label className="font-semibold block mb-1">ছবির শিরোনাম</label>
            <input
              type="text"
              value={formData.imageTitle}
              onChange={(e) => setFormData(prev => ({ ...prev, imageTitle: e.target.value }))}
              placeholder="ছবির শিরোনাম লিখুন"
              className="w-full border px-3 py-2 rounded"
              disabled={isSubmitting}
            />
          </div>

          {/* Image source */}
          <div>
            <label className="font-semibold block mb-1">ছবির সোর্স</label>
            <input
              type="text"
              value={formData.imageSource}
              onChange={(e) => setFormData(prev => ({ ...prev, imageSource: e.target.value }))}
              placeholder="ছবির সোর্স লিখুন (যদি থাকে)"
              className="w-full border px-3 py-2 rounded"
              disabled={isSubmitting}
            />
          </div>
        </div>

        {/* Content editor */}
        <div>
          <label className="font-semibold block mb-1">বিষয়বস্তু *</label>
          <QuillEditor
            initialContent={initialData?.content}
            onContentChange={setContent}
          />
        </div>

        {/* Address fields */}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold block mb-1">বিভাগ</label>
            <select
              value={formData.division}
              onChange={(e) => setFormData(prev => ({ ...prev, division: e.target.value }))}
              className="w-full border px-3 py-2 rounded"
              disabled={isSubmitting}
            >
              <option value="">বিভাগ নির্বাচন করুন</option>
              {divisions.map((div) => (
                <option key={div.id} value={div.bn_name}>{div.bn_name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold block mb-1">জেলা</label>
            <select
              value={formData.district}
              onChange={(e) => setFormData(prev => ({ ...prev, district: e.target.value }))}
              className="w-full border px-3 py-2 rounded"
              disabled={!formData.division || isSubmitting}
            >
              <option value="">জেলা নির্বাচন করুন</option>
              {districts.map((dis) => (
                <option key={dis.id} value={dis.bn_name}>{dis.bn_name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold block mb-1">উপজেলা/থানা</label>
            <select
              value={formData.thana}
              onChange={(e) => setFormData(prev => ({ ...prev, thana: e.target.value }))}
              className="w-full border px-3 py-2 rounded"
              disabled={!formData.district || isSubmitting}
            >
              <option value="">উপজেলা নির্বাচন করুন</option>
              {upazilas.map((upa) => (
                <option key={upa.id} value={upa.bn_name}>{upa.bn_name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold block mb-1">ইউনিয়ন</label>
            <select
              value={formData.union}
              onChange={(e) => setFormData(prev => ({ ...prev, union: e.target.value }))}
              className="w-full border px-3 py-2 rounded"
              disabled={!formData.thana || isSubmitting}
            >
              <option value="">ইউনিয়ন নির্বাচন করুন</option>
              {unions.map((uni) => (
                <option key={uni.id} value={uni.bn_name}>{uni.bn_name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="font-semibold block mb-1">ক্যাটেগরি *</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            className="w-full border px-3 py-2 rounded"
            required
            disabled={isSubmitting}
          >
            <option value="">ক্যাটেগরি নির্বাচন করুন</option>
            {CATEGORIES.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Sub-category */}
        <div>
          <label className="font-semibold block mb-1">সাব-ক্যাটেগরি</label>
          <select
            value={formData.subCategory}
            onChange={(e) => setFormData(prev => ({ ...prev, subCategory: e.target.value }))}
            className="w-full border px-3 py-2 rounded"
            disabled={isSubmitting}
          >
            <option value="">সাব-ক্যাটেগরি নির্বাচন করুন</option>
            {SUB_CATEGORIES.map(subCategory => (
              <option key={subCategory} value={subCategory}>{subCategory}</option>
            ))}
          </select>
        </div>

        {/* Keywords */}
        <div>
          <label className="font-semibold block mb-1">কীওয়ার্ডস</label>
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
              disabled={isSubmitting || !keywordInput}
            >
              ➕
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.keywords.map((kw, i) => (
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

        {/* Sub-keywords */}
        <div>
          <label className="font-semibold block mb-1">সাব-কীওয়ার্ডস</label>
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
              disabled={isSubmitting || !subKeywordInput}
            >
              ➕
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.subKeywords.map((subKw, i) => (
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

        {/* Submit button */}
        <button
          type="submit"
          className={`bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-semibold flex items-center justify-center ${
            isSubmitting || isUploading ? 'opacity-75' : ''
          }`}
          disabled={isSubmitting || isUploading}
        >
          {isSubmitting || isUploading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {isUploading ? 'ছবি আপলোড হচ্ছে...' : 'সংবাদ সাবমিট হচ্ছে...'}
            </>
          ) : (
            initialData ? 'আপডেট করুন' : 'জমা দিন'
          )}
        </button>
      </form>
    </section>
  );
}