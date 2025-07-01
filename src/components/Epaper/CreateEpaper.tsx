// /* eslint-disable @next/next/no-img-element */
// /* eslint-disable @typescript-eslint/no-explicit-any */



// 'use client';

// import { useToast } from '@/hooks/useToast';
// import Toast from '@/share/Toast';
// import { useState, useRef, useEffect } from 'react';
// import { FaNewspaper, FaPlus, FaTrash, FaImage, FaCalendarAlt, FaSave, FaSpinner, FaUpload, FaTimes } from 'react-icons/fa';

// interface Article {
//   id: number;
//   title: string;
//   contentImage: string;
//   content: string;
//   bbox: { x: number; y: number; width: number; height: number };
//   category: string;
//   isLeading?: boolean;
//   pageNumber?: number;
// }

// interface EpaperData {
//   id?: number;
//   mainEpaperImage: string;
//   date: string;
//   articles: Article[];
// }

// interface UploadStatus {
//   id: number;
//   message: string;
//   progress: number;
//   isError: boolean;
//   isComplete: boolean;
//   type: 'main' | 'content';
//   articleId?: number;
// }

// const categories = [
//   'জাতীয়',
//   'সারাদেশ',
//   'রাজনীতি',
//   'অর্থনীতি',
//   'খেলা',
//   'বিনোদন',
//   'আন্তর্জাতিক',
//   'প্রযুক্তি',
//   'শিক্ষা',
//   'স্বাস্থ্য'
// ];

// const CreateEpaper = () => {
//   const [epaperData, setEpaperData] = useState<EpaperData>({
//     mainEpaperImage: '',
//     date: '',
//     articles: []
//   });
//   const [previewImage, setPreviewImage] = useState<string | null>(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [uploadStatuses, setUploadStatuses] = useState<UploadStatus[]>([]);
//   const [formErrors, setFormErrors] = useState({
//     mainImage: false,
//     date: false,
//     articles: [] as {title: boolean, content: boolean, category: boolean, pageNumber: boolean}[]
//   });
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const contentFileInputRefs = useRef<{[key: number]: HTMLInputElement | null}>({});
//   const {toast,showToast,hideToast} =useToast()

//   useEffect(() => {
//     const completeUploads = uploadStatuses.filter(status => status.isComplete);
//     if (completeUploads.length > 0) {
//       const timer = setTimeout(() => {
//         setUploadStatuses(prev => prev.filter(status => !status.isComplete));
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [uploadStatuses]);

//   const validateForm = () => {
//     let isValid = true;
//     const newErrors = {
//       mainImage: !epaperData.mainEpaperImage,
//       date: !epaperData.date,
//       articles: epaperData.articles.map(article => ({
//         title: !article.title,
//         content: !article.content,
//         category: !article.category,
//         pageNumber: !article.pageNumber
//       }))
//     };

//     setFormErrors(newErrors);

//     if (newErrors.mainImage || newErrors.date || newErrors.articles.some(a => a.title || a.content || a.category || a.pageNumber)) {
//       isValid = false;
//     }

//     return isValid;
//   };

//   const uploadToCloudinary = async (file: File, id: number, type: 'main' | 'content', articleId?: number): Promise<string> => {
//     const newStatus: UploadStatus = {
//       id,
//       message: type === 'main' ? 'Uploading e-paper image...' : 'Uploading article image...',
//       progress: 0,
//       isError: false,
//       isComplete: false,
//       type,
//       articleId
//     };
//     setUploadStatuses(prev => [...prev, newStatus]);

//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', 'my-uploads');
//     formData.append('cloud_name', 'dw72swggv');

//     try {
//       const response = await fetch(`https://api.cloudinary.com/v1_1/dw72swggv/upload`, {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error('Upload failed');
//       }

//       const data = await response.json();

//       setUploadStatuses(prev => prev.map(status => 
//         status.id === id ? { ...status, isComplete: true, message: 'Upload complete!' } : status
//       ));

//       return data.secure_url;
//     } catch (error) {
//       console.error('Upload error:', error);
//       setUploadStatuses(prev => prev.map(status => 
//         status.id === id ? { ...status, isError: true, message: 'Upload failed!' } : status
//       ));
//       throw error;
//     }
//   };

//   // Drag and drop handlers
//   const handleDragEnter = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(true);
//   };

//   const handleDragLeave = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);
//   };

//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);

//     if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
//       handleImageChange({ target: { files: e.dataTransfer.files } } as any);
//     }
//   };

//   const handleContentDrop = (e: React.DragEvent, articleId: number) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);

//     if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
//       handleContentImageChange({ target: { files: e.dataTransfer.files } } as any, articleId);
//     }
//   };

//   const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement> | { target: { files: FileList | null } }) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];

//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewImage(reader.result as string);
//       };
//       reader.readAsDataURL(file);

//       const uploadId = Date.now();
//       try {
//         const imageUrl = await uploadToCloudinary(file, uploadId, 'main');
//         setEpaperData(prev => ({
//           ...prev,
//           mainEpaperImage: imageUrl
//         }));
//         setFormErrors(prev => ({...prev, mainImage: false}));
//       } catch (error) {
//         console.error('Upload failed:', error);
//       }
//     }
//   };

//   const handleContentImageChange = async (e: React.ChangeEvent<HTMLInputElement> | { target: { files: FileList | null } }, articleId: number) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       const articleIndex = epaperData.articles.findIndex(article => article.id === articleId);

//       if (articleIndex === -1) return;

//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const updatedArticles = [...epaperData.articles];
//         updatedArticles[articleIndex].contentImage = reader.result as string;
//         setEpaperData(prev => ({
//           ...prev,
//           articles: updatedArticles
//         }));
//       };
//       reader.readAsDataURL(file);

//       const uploadId = Date.now();
//       try {
//         const imageUrl = await uploadToCloudinary(file, uploadId, 'content', articleId);

//         const updatedArticles = [...epaperData.articles];
//         updatedArticles[articleIndex].contentImage = imageUrl;
//         setEpaperData(prev => ({
//           ...prev,
//           articles: updatedArticles
//         }));
//       } catch (error) {
//         console.error('Upload failed:', error);
//       }
//     }
//   };

//   const triggerFileInput = () => {
//     fileInputRef.current?.click();
//   };

//   const triggerContentFileInput = (articleId: number) => {
//     contentFileInputRefs.current[articleId]?.click();
//   };

//   const addArticle = () => {
//     const newArticle: Article = {
//       id: Date.now(),
//       title: '',
//       content: '',
//       contentImage: '',
//       category: '',
//       bbox: { x: 0, y: 0, width: 100, height: 100 },
//       isLeading: false,
//       pageNumber: 1,
//     };
//     setEpaperData(prev => ({
//       ...prev,
//       articles: [...prev.articles, newArticle]
//     }));
//     setFormErrors(prev => ({
//       ...prev,
//       articles: [...prev.articles, {title: false, content: false, category: false, pageNumber: false}]
//     }));
//   };

//   const removeArticle = (id: number) => {
//     const articleIndex = epaperData.articles.findIndex(article => article.id === id);
//     setEpaperData(prev => ({
//       ...prev,
//       articles: prev.articles.filter(article => article.id !== id)
//     }));
//     setFormErrors(prev => ({
//       ...prev,
//       articles: prev.articles.filter((_, index) => index !== articleIndex)
//     }));
//   };

//   const handleArticleChange = (index: number, field: string, value: any) => {
//     const updatedArticles = [...epaperData.articles];
//     if (field === 'bbox') {
//       updatedArticles[index].bbox = { ...updatedArticles[index].bbox, ...value };
//     } else {
//       (updatedArticles[index] as any)[field] = value;
//     }
//     setEpaperData(prev => ({
//       ...prev,
//       articles: updatedArticles
//     }));

//     // Clear error when field is filled
//     if (value && ['title', 'content', 'category', 'pageNumber'].includes(field)) {
//       setFormErrors(prev => {
//         const newArticles = [...prev.articles];
//         newArticles[index] = {...newArticles[index], [field]: false};
//         return {...prev, articles: newArticles};
//       });
//     }
//   };

//   const removeUploadStatus = (id: number) => {
//     setUploadStatuses(prev => prev.filter(status => status.id !== id));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const isUploading = uploadStatuses.some(status => !status.isComplete && !status.isError);
//     if (isUploading) {
//       alert('Please wait for uploads to complete');
//       return;
//     }

//     if (!validateForm()) {
//       alert('Please fill all required fields');
//       return;
//     }

//     // Final payload with Cloudinary URLs
//     const payload: EpaperData = {
//       ...epaperData,
//       id: epaperData.id || Date.now(),
//       articles: epaperData.articles.map(article => ({
//         ...article,
//         contentImage: article.contentImage.startsWith('http') ? article.contentImage : ''
//       })),
//     };

// try {
//   const response = await fetch('http://localhost:7700/api/epaper/create', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       // Add Authorization header if needed:
//       // 'Authorization': `Bearer ${token}`,
//     },
//     credentials: 'include', // If you're using cookies/session auth
//     body: JSON.stringify(payload),
//   });

//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.error || 'Failed to create e-paper');
//   }

//   const result = await response.json();
//   console.log('E-paper created:', result);
//  showToast('success', 'ই-পেপার তৈরি সফল হয়েছে');
//  //   alert('E-paper created successfully!');

//   // Optionally reset the form:
//   setEpaperData({
//     mainEpaperImage: '',
//     date: '',
//     articles: []
//   });
//   setPreviewImage(null);
// } catch (err: any) {
//   console.error('Create error:', err);
//   showToast('failed','something went wrong')
// //   alert(err.message || 'Something went wrong.');
// }
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
//       <div className="bg-white rounded-xl shadow-xl overflow-hidden">
//         <div className="bg-blue-600 text-white p-6">
//           <div className="flex items-center space-x-4">
//             <FaNewspaper className="text-3xl" />
//             <div>
//               <h1 className="text-3xl font-bold">Create Digital E-Paper</h1>
//               <p className="text-blue-100">Transform your newspaper into an interactive digital experience</p>
//             </div>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-8">
//           {/* Basic Information Section */}
//           <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
//               <FaImage className="mr-2 text-blue-500" /> E-Paper Information
//             </h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Image Upload with Preview and Drag & Drop */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">E-paper Image*</label>
//                 <div className="flex flex-col space-y-2">
//                   <div 
//                     className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
//                       isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
//                     } ${formErrors.mainImage ? 'border-red-500' : ''}`}
//                     onClick={triggerFileInput}
//                     onDragEnter={handleDragEnter}
//                     onDragLeave={handleDragLeave}
//                     onDragOver={handleDragOver}
//                     onDrop={handleDrop}
//                   >
//                     {previewImage ? (
//                       <img src={previewImage} alt="Preview" className="h-full w-full object-contain rounded-lg" />
//                     ) : (
//                       <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                         <FaUpload className="text-3xl text-gray-400 mb-2" />
//                         <p className="text-sm text-gray-500 text-center">
//                           {isDragging ? 'Drop the image here' : 'Click to upload or drag and drop'}
//                         </p>
//                         <p className="text-xs text-gray-400 mt-1">Supports: JPG, PNG, PDF</p>
//                       </div>
//                     )}
//                     <input 
//                       ref={fileInputRef}
//                       type="file" 
//                       accept="image/*,.pdf" 
//                       onChange={handleImageChange} 
//                       className="hidden"
//                     />
//                   </div>
//                   {formErrors.mainImage && (
//                     <p className="text-red-500 text-sm">Please upload an e-paper image</p>
//                   )}

//                   {uploadStatuses
//                     .filter(status => status.type === 'main')
//                     .map(status => (
//                       <div 
//                         key={status.id}
//                         className={`p-2 rounded text-sm ${status.isError ? 'bg-red-100 text-red-700' : status.isComplete ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}
//                       >
//                         <div className="flex justify-between items-center">
//                           <span>{status.message}</span>
//                           <button onClick={() => removeUploadStatus(status.id)} className="ml-2">
//                             <FaTimes className="text-xs" />
//                           </button>
//                         </div>
//                         {!status.isComplete && !status.isError && (
//                           <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
//                             <div 
//                               className="bg-blue-600 h-1.5 rounded-full" 
//                               style={{ width: `${status.progress}%` }}
//                             ></div>
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                 </div>
//               </div>

//               {/* Date Picker */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Publication Date*</label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                     <FaCalendarAlt className="text-gray-400" />
//                   </div>
//                   <input
//                     type="date"
//                     value={epaperData.date}
//                     onChange={(e) => {
//                       setEpaperData(prev => ({ ...prev, date: e.target.value }));
//                       setFormErrors(prev => ({...prev, date: false}));
//                     }}
//                     className={`bg-gray-50 border ${formErrors.date ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5`}
//                   />
//                 </div>
//                 {formErrors.date && (
//                   <p className="text-red-500 text-sm">Please select a publication date</p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Articles Section */}
//           <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold text-gray-800 flex items-center">
//                 <FaNewspaper className="mr-2 text-blue-500" /> Articles
//               </h2>
//               <button
//                 type="button"
//                 onClick={addArticle}
//                 className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
//               >
//                 <FaPlus className="mr-2" /> Add Article
//               </button>
//             </div>

//             {epaperData.articles.length === 0 ? (
//               <div className="text-center py-8 bg-gray-50 rounded-lg">
//                 <p className="text-gray-500">No articles added yet. Click &rdquo;Add Article&rdquo; to get started.</p>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {epaperData.articles.map((article, idx) => (
//                   <div key={article.id} className="p-6 border border-gray-200 rounded-lg bg-gray-50 hover:bg-white transition-all duration-200 shadow-sm">
//                     <div className="flex justify-between items-start mb-4">
//                       <h3 className="text-lg font-medium text-gray-800">Article #{idx + 1}</h3>
//                       <button
//                         type="button"
//                         onClick={() => removeArticle(article.id)}
//                         className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition"
//                         title="Remove article"
//                       >
//                         <FaTrash />
//                       </button>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
//                         <input
//                           type="text"
//                           placeholder="Headline of the article"
//                           value={article.title}
//                           onChange={(e) => handleArticleChange(idx, 'title', e.target.value)}
//                           className={`w-full px-3 py-2 border ${formErrors.articles[idx]?.title ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                         />
//                         {formErrors.articles[idx]?.title && (
//                           <p className="text-red-500 text-sm">Please enter a title</p>
//                         )}
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Content Image</label>
//                         <div className="flex flex-col space-y-2">
//                           {article.contentImage ? (
//                             <div className="relative">
//                               <img 
//                                 src={article.contentImage} 
//                                 alt="Content preview" 
//                                 className="h-32 w-full object-cover rounded-md border border-gray-200"
//                               />
//                             </div>
//                           ) : (
//                             <div 
//                               className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer transition-all ${
//                                 isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
//                               }`}
//                               onClick={() => triggerContentFileInput(article.id)}
//                               onDragEnter={handleDragEnter}
//                               onDragLeave={handleDragLeave}
//                               onDragOver={handleDragOver}
//                               onDrop={(e) => handleContentDrop(e, article.id)}
//                             >
//                               <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                                 <FaUpload className="text-2xl text-gray-400 mb-2" />
//                                 <p className="text-sm text-gray-500 text-center">
//                                   {isDragging ? 'Drop the image here' : 'Click to upload or drag and drop'}
//                                 </p>
//                               </div>
//                               <input 
//                                 ref={el => contentFileInputRefs.current[article.id] = el}
//                                 type="file" 
//                                 accept="image/*" 
//                                 onChange={(e) => handleContentImageChange(e, article.id)}
//                                 className="hidden" 
//                               />
//                             </div>
//                           )}

//                           {uploadStatuses
//                             .filter(status => status.type === 'content' && status.articleId === article.id)
//                             .map(status => (
//                               <div 
//                                 key={status.id}
//                                 className={`p-2 rounded text-sm ${status.isError ? 'bg-red-100 text-red-700' : status.isComplete ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}
//                               >
//                                 <div className="flex justify-between items-center">
//                                   <span>{status.message}</span>
//                                   <button onClick={() => removeUploadStatus(status.id)} className="ml-2">
//                                     <FaTimes className="text-xs" />
//                                   </button>
//                                 </div>
//                                 {!status.isComplete && !status.isError && (
//                                   <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
//                                     <div 
//                                       className="bg-blue-600 h-1.5 rounded-full" 
//                                       style={{ width: `${status.progress}%` }}
//                                     ></div>
//                                   </div>
//                                 )}
//                               </div>
//                             ))}
//                         </div>
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
//                         <select
//                           value={article.category}
//                           onChange={(e) => handleArticleChange(idx, 'category', e.target.value)}
//                           className={`w-full px-3 py-2 border ${formErrors.articles[idx]?.category ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white`}
//                         >
//                           <option value="">Select a category</option>
//                           {categories.map(category => (
//                             <option key={category} value={category}>{category}</option>
//                           ))}
//                         </select>
//                         {formErrors.articles[idx]?.category && (
//                           <p className="text-red-500 text-sm">Please select a category</p>
//                         )}
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Page Number*</label>
//                         <input
//                           type="number"
//                           min="1"
//                           placeholder="1"
//                           value={article.pageNumber}
//                           onChange={(e) => handleArticleChange(idx, 'pageNumber', Number(e.target.value))}
//                           className={`w-full px-3 py-2 border ${formErrors.articles[idx]?.pageNumber ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                         />
//                         {formErrors.articles[idx]?.pageNumber && (
//                           <p className="text-red-500 text-sm">Please enter a page number</p>
//                         )}
//                       </div>
//                     </div>

//                     <div className="mt-4">
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Content*</label>
//                       <textarea
//                         placeholder="Write the article content here..."
//                         value={article.content}
//                         onChange={(e) => handleArticleChange(idx, 'content', e.target.value)}
//                         className={`w-full px-3 py-2 border ${formErrors.articles[idx]?.content ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                         rows={4}
//                       />
//                       {formErrors.articles[idx]?.content && (
//                         <p className="text-red-500 text-sm">Please enter content</p>
//                       )}
//                     </div>

//                     <div className="mt-4">
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Bounding Box (Position on Page)</label>
//                       <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                         {[
//                           { label: 'X Position', key: 'x' },
//                           { label: 'Y Position', key: 'y' },
//                           { label: 'Width', key: 'width' },
//                           { label: 'Height', key: 'height' }
//                         ].map((dim) => (
//                           <div key={dim.key}>
//                             <label className="block text-xs text-gray-500 mb-1">{dim.label}</label>
//                             <input
//                               type="number"
//                               value={article.bbox[dim.key as keyof typeof article.bbox]}
//                               onChange={(e) =>
//                                 handleArticleChange(idx, 'bbox', {
//                                   [dim.key]: Number(e.target.value),
//                                 })
//                               }
//                               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     <div className="mt-4 flex items-center">
//                       <input
//                         id={`leading-${article.id}`}
//                         type="checkbox"
//                         checked={article.isLeading}
//                         onChange={(e) => handleArticleChange(idx, 'isLeading', e.target.checked)}
//                         className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                       />
//                       <label htmlFor={`leading-${article.id}`} className="ml-2 text-sm font-medium text-gray-700">
//                         Mark as Leading Article
//                       </label>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Submit Section */}
//           <div className="flex justify-end">
//             <button
//               type="submit"
//               className={`flex items-center px-6 py-3 rounded-lg font-semibold transition shadow-lg ${
//                 uploadStatuses.some(status => !status.isComplete && !status.isError)
//                   ? 'bg-gray-400 cursor-not-allowed'
//                   : 'bg-green-600 hover:bg-green-700 text-white'
//               }`}
//               disabled={uploadStatuses.some(status => !status.isComplete && !status.isError)}
//             >
//               {uploadStatuses.some(status => !status.isComplete && !status.isError) ? (
//                 <>
//                   <FaSpinner className="animate-spin mr-2" /> Uploading...
//                 </>
//               ) : (
//                 <>
//                   <FaSave className="mr-2" /> Save E-Paper
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//        {toast && (
//         <Toast type={toast.type} message={toast.message} onClose={hideToast} />
//       )}
//     </div>
//   );
// };

// export default CreateEpaper;





























/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */



'use client';

import { useToast } from '@/hooks/useToast';
import Toast from '@/share/Toast';
import { useState, useRef, useEffect } from 'react';
import { FaNewspaper, FaPlus, FaTrash, FaImage, FaCalendarAlt, FaSave, FaSpinner, FaUpload, FaTimes } from 'react-icons/fa';

interface Article {
    id: number;
    title: string;
    contentImage: string;
    content: string;
    bbox: { x: number; y: number; width: number; height: number };
    category: string;
    isLeading?: boolean;
    pageNumber?: number;
}

interface EpaperData {
    id?: number;
    mainEpaperImage: string;
    date: string;
    articles: Article[];
}

interface UploadStatus {
    id: number;
    message: string;
    progress: number;
    isError: boolean;
    isComplete: boolean;
    type: 'main' | 'content';
    articleId?: number;
}

const categories = [
    'জাতীয়',
    'সারাদেশ',
    'রাজনীতি',
    'অর্থনীতি',
    'খেলা',
    'বিনোদন',
    'আন্তর্জাতিক',
    'প্রযুক্তি',
    'শিক্ষা',
    'স্বাস্থ্য'
];

const CreateEpaper = () => {
    const [epaperData, setEpaperData] = useState<EpaperData>({
        mainEpaperImage: '',
        date: '',
        articles: []
    });
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [uploadStatuses, setUploadStatuses] = useState<UploadStatus[]>([]);
    const [formErrors, setFormErrors] = useState({
        mainImage: false,
        date: false,
        articles: [] as { title: boolean, content: boolean, category: boolean, pageNumber: boolean }[]
    });
    const fileInputRef = useRef<HTMLInputElement>(null);
    const contentFileInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});
    const { toast, showToast, hideToast } = useToast()

    useEffect(() => {
        const completeUploads = uploadStatuses.filter(status => status.isComplete);
        if (completeUploads.length > 0) {
            const timer = setTimeout(() => {
                setUploadStatuses(prev => prev.filter(status => !status.isComplete));
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [uploadStatuses]);

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            mainImage: !epaperData.mainEpaperImage,
            date: !epaperData.date,
            articles: epaperData.articles.map(article => ({
                title: !article.title,
                content: !article.content,
                category: !article.category,
                pageNumber: !article.pageNumber
            }))
        };

        setFormErrors(newErrors);

        if (newErrors.mainImage || newErrors.date || newErrors.articles.some(a => a.title || a.content || a.category || a.pageNumber)) {
            isValid = false;
        }

        return isValid;
    };

    const uploadToCloudinary = async (file: File, id: number, type: 'main' | 'content', articleId?: number): Promise<string> => {
        const newStatus: UploadStatus = {
            id,
            message: type === 'main' ? 'Uploading e-paper image...' : 'Uploading article image...',
            progress: 0,
            isError: false,
            isComplete: false,
            type,
            articleId
        };
        setUploadStatuses(prev => [...prev, newStatus]);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'my-uploads');
        formData.append('cloud_name', 'dw72swggv');

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/dw72swggv/upload`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const data = await response.json();

            setUploadStatuses(prev => prev.map(status =>
                status.id === id ? { ...status, isComplete: true, message: 'Upload complete!' } : status
            ));

            return data.secure_url;
        } catch (error) {
            console.error('Upload error:', error);
            setUploadStatuses(prev => prev.map(status =>
                status.id === id ? { ...status, isError: true, message: 'Upload failed!' } : status
            ));
            throw error;
        }
    };

    // Drag and drop handlers
    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleImageChange({ target: { files: e.dataTransfer.files } } as any);
        }
    };

    const handleContentDrop = (e: React.DragEvent, articleId: number) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleContentImageChange({ target: { files: e.dataTransfer.files } } as any, articleId);
        }
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement> | { target: { files: FileList | null } }) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);

            const uploadId = Date.now();
            try {
                const imageUrl = await uploadToCloudinary(file, uploadId, 'main');
                setEpaperData(prev => ({
                    ...prev,
                    mainEpaperImage: imageUrl
                }));
                setFormErrors(prev => ({ ...prev, mainImage: false }));
            } catch (error) {
                console.error('Upload failed:', error);
            }
        }
    };

    const handleContentImageChange = async (e: React.ChangeEvent<HTMLInputElement> | { target: { files: FileList | null } }, articleId: number) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const articleIndex = epaperData.articles.findIndex(article => article.id === articleId);

            if (articleIndex === -1) return;

            const reader = new FileReader();
            reader.onloadend = () => {
                const updatedArticles = [...epaperData.articles];
                updatedArticles[articleIndex].contentImage = reader.result as string;
                setEpaperData(prev => ({
                    ...prev,
                    articles: updatedArticles
                }));
            };
            reader.readAsDataURL(file);

            const uploadId = Date.now();
            try {
                const imageUrl = await uploadToCloudinary(file, uploadId, 'content', articleId);

                const updatedArticles = [...epaperData.articles];
                updatedArticles[articleIndex].contentImage = imageUrl;
                setEpaperData(prev => ({
                    ...prev,
                    articles: updatedArticles
                }));
            } catch (error) {
                console.error('Upload failed:', error);
            }
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const triggerContentFileInput = (articleId: number) => {
        contentFileInputRefs.current[articleId]?.click();
    };

    const addArticle = () => {
        const newArticle: Article = {
            id: Date.now(),
            title: '',
            content: '',
            contentImage: '',
            category: '',
            bbox: { x: 0, y: 0, width: 100, height: 100 },
            isLeading: false,
            pageNumber: 1,
        };
        setEpaperData(prev => ({
            ...prev,
            articles: [...prev.articles, newArticle]
        }));
        setFormErrors(prev => ({
            ...prev,
            articles: [...prev.articles, { title: false, content: false, category: false, pageNumber: false }]
        }));
    };

    const removeArticle = (id: number) => {
        const articleIndex = epaperData.articles.findIndex(article => article.id === id);
        setEpaperData(prev => ({
            ...prev,
            articles: prev.articles.filter(article => article.id !== id)
        }));
        setFormErrors(prev => ({
            ...prev,
            articles: prev.articles.filter((_, index) => index !== articleIndex)
        }));
    };

    const handleArticleChange = (index: number, field: string, value: any) => {
        const updatedArticles = [...epaperData.articles];
        if (field === 'bbox') {
            updatedArticles[index].bbox = { ...updatedArticles[index].bbox, ...value };
        } else {
            (updatedArticles[index] as any)[field] = value;
        }
        setEpaperData(prev => ({
            ...prev,
            articles: updatedArticles
        }));

        // Clear error when field is filled
        if (value && ['title', 'content', 'category', 'pageNumber'].includes(field)) {
            setFormErrors(prev => {
                const newArticles = [...prev.articles];
                newArticles[index] = { ...newArticles[index], [field]: false };
                return { ...prev, articles: newArticles };
            });
        }
    };

    const removeUploadStatus = (id: number) => {
        setUploadStatuses(prev => prev.filter(status => status.id !== id));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const isUploading = uploadStatuses.some(status => !status.isComplete && !status.isError);
        if (isUploading) {
            alert('Please wait for uploads to complete');
            return;
        }

        if (!validateForm()) {
            alert('Please fill all required fields');
            return;
        }

        // Final payload with Cloudinary URLs
        const payload: EpaperData = {
            ...epaperData,
            id: epaperData.id || Date.now(),
            articles: epaperData.articles.map(article => ({
                ...article,
                contentImage: article.contentImage.startsWith('http') ? article.contentImage : ''
            })),
        };

        try {
            const response = await fetch('http://localhost:7700/api/epaper/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add Authorization header if needed:
                    // 'Authorization': `Bearer ${token}`,
                },
                credentials: 'include', // If you're using cookies/session auth
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create e-paper');
            }

            const result = await response.json();
            console.log('E-paper created:', result);
            showToast('success', 'ই-পেপার তৈরি সফল হয়েছে');
            //   alert('E-paper created successfully!');

            // Optionally reset the form:
            setEpaperData({
                mainEpaperImage: '',
                date: '',
                articles: []
            });
            setPreviewImage(null);
        } catch (err: any) {
            console.error('Create error:', err);
            showToast('failed', 'something went wrong')
            //   alert(err.message || 'Something went wrong.');
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                <div className="bg-blue-600 text-white p-6">
                    <div className="flex items-center space-x-4">
                        <FaNewspaper className="text-3xl" />
                        <div>
                            <h1 className="text-3xl font-bold">Create Digital E-Paper</h1>
                            <p className="text-blue-100">Transform your newspaper into an interactive digital experience</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-8">
                    {/* Basic Information Section */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                            <FaImage className="mr-2 text-blue-500" /> E-Paper Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Image Upload with Preview and Drag & Drop */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">E-paper Image*</label>
                                <div className="flex flex-col space-y-2">
                                    <div
                                        className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer transition-all ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                                            } ${formErrors.mainImage ? 'border-red-500' : ''}`}
                                        onClick={triggerFileInput}
                                        onDragEnter={handleDragEnter}
                                        onDragLeave={handleDragLeave}
                                        onDragOver={handleDragOver}
                                        onDrop={handleDrop}
                                    >
                                        {previewImage ? (
                                            <img src={previewImage} alt="Preview" className="h-full w-full object-contain rounded-lg" />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <FaUpload className="text-3xl text-gray-400 mb-2" />
                                                <p className="text-sm text-gray-500 text-center">
                                                    {isDragging ? 'Drop the image here' : 'Click to upload or drag and drop'}
                                                </p>
                                                <p className="text-xs text-gray-400 mt-1">Supports: JPG, PNG, PDF</p>
                                            </div>
                                        )}
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*,.pdf"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                    </div>
                                    {formErrors.mainImage && (
                                        <p className="text-red-500 text-sm">Please upload an e-paper image</p>
                                    )}

                                    {uploadStatuses
                                        .filter(status => status.type === 'main')
                                        .map(status => (
                                            <div
                                                key={status.id}
                                                className={`p-2 rounded text-sm ${status.isError ? 'bg-red-100 text-red-700' : status.isComplete ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}
                                            >
                                                <div className="flex justify-between items-center">
                                                    <span>{status.message}</span>
                                                    <button onClick={() => removeUploadStatus(status.id)} className="ml-2">
                                                        <FaTimes className="text-xs" />
                                                    </button>
                                                </div>
                                                {!status.isComplete && !status.isError && (
                                                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                                        <div
                                                            className="bg-blue-600 h-1.5 rounded-full"
                                                            style={{ width: `${status.progress}%` }}
                                                        ></div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                </div>
                            </div>

                            {/* Date Picker */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Publication Date*</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <FaCalendarAlt className="text-gray-400" />
                                    </div>
                                    <input
                                        type="date"
                                        value={epaperData.date}
                                        onChange={(e) => {
                                            setEpaperData(prev => ({ ...prev, date: e.target.value }));
                                            setFormErrors(prev => ({ ...prev, date: false }));
                                        }}
                                        className={`bg-gray-50 border ${formErrors.date ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5`}
                                    />
                                </div>
                                {formErrors.date && (
                                    <p className="text-red-500 text-sm">Please select a publication date</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Articles Section */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                                <FaNewspaper className="mr-2 text-blue-500" /> Articles
                            </h2>
                            <button
                                type="button"
                                onClick={addArticle}
                                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
                            >
                                <FaPlus className="mr-2" /> Add Article
                            </button>
                        </div>

                        {epaperData.articles.length === 0 ? (
                            <div className="text-center py-8 bg-gray-50 rounded-lg">
                                <p className="text-gray-500">No articles added yet. Click &rdquo;Add Article&rdquo; to get started.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {epaperData.articles.map((article, idx) => (
                                    <div key={article.id} className="p-6 border border-gray-200 rounded-lg bg-gray-50 hover:bg-white transition-all duration-200 shadow-sm">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-lg font-medium text-gray-800">Article #{idx + 1}</h3>
                                            <button
                                                type="button"
                                                onClick={() => removeArticle(article.id)}
                                                className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition"
                                                title="Remove article"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
                                                <input
                                                    type="text"
                                                    placeholder="Headline of the article"
                                                    value={article.title}
                                                    onChange={(e) => handleArticleChange(idx, 'title', e.target.value)}
                                                    className={`w-full px-3 py-2 border ${formErrors.articles[idx]?.title ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                                />
                                                {formErrors.articles[idx]?.title && (
                                                    <p className="text-red-500 text-sm">Please enter a title</p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Content Image</label>
                                                <div className="flex flex-col space-y-2">
                                                    {article.contentImage ? (
                                                        <div className="relative">
                                                            <img
                                                                src={article.contentImage}
                                                                alt="Content preview"
                                                                className="h-32 w-full object-cover rounded-md border border-gray-200"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div
                                                            className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer transition-all ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                                                                }`}
                                                            onClick={() => triggerContentFileInput(article.id)}
                                                            onDragEnter={handleDragEnter}
                                                            onDragLeave={handleDragLeave}
                                                            onDragOver={handleDragOver}
                                                            onDrop={(e) => handleContentDrop(e, article.id)}
                                                        >
                                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                                <FaUpload className="text-2xl text-gray-400 mb-2" />
                                                                <p className="text-sm text-gray-500 text-center">
                                                                    {isDragging ? 'Drop the image here' : 'Click to upload or drag and drop'}
                                                                </p>
                                                            </div>
                                                            <input
                                                                ref={(el) => { contentFileInputRefs.current[article.id] = el }}
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(e) => handleContentImageChange(e, article.id)}
                                                                className="hidden"
                                                            />
                                                        </div>
                                                    )}

                                                    {uploadStatuses
                                                        .filter(status => status.type === 'content' && status.articleId === article.id)
                                                        .map(status => (
                                                            <div
                                                                key={status.id}
                                                                className={`p-2 rounded text-sm ${status.isError ? 'bg-red-100 text-red-700' : status.isComplete ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}
                                                            >
                                                                <div className="flex justify-between items-center">
                                                                    <span>{status.message}</span>
                                                                    <button onClick={() => removeUploadStatus(status.id)} className="ml-2">
                                                                        <FaTimes className="text-xs" />
                                                                    </button>
                                                                </div>
                                                                {!status.isComplete && !status.isError && (
                                                                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                                                        <div
                                                                            className="bg-blue-600 h-1.5 rounded-full"
                                                                            style={{ width: `${status.progress}%` }}
                                                                        ></div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
                                                <select
                                                    value={article.category}
                                                    onChange={(e) => handleArticleChange(idx, 'category', e.target.value)}
                                                    className={`w-full px-3 py-2 border ${formErrors.articles[idx]?.category ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white`}
                                                >
                                                    <option value="">Select a category</option>
                                                    {categories.map(category => (
                                                        <option key={category} value={category}>{category}</option>
                                                    ))}
                                                </select>
                                                {formErrors.articles[idx]?.category && (
                                                    <p className="text-red-500 text-sm">Please select a category</p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Page Number*</label>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    placeholder="1"
                                                    value={article.pageNumber}
                                                    onChange={(e) => handleArticleChange(idx, 'pageNumber', Number(e.target.value))}
                                                    className={`w-full px-3 py-2 border ${formErrors.articles[idx]?.pageNumber ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                                />
                                                {formErrors.articles[idx]?.pageNumber && (
                                                    <p className="text-red-500 text-sm">Please enter a page number</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="mt-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Content*</label>
                                            <textarea
                                                placeholder="Write the article content here..."
                                                value={article.content}
                                                onChange={(e) => handleArticleChange(idx, 'content', e.target.value)}
                                                className={`w-full px-3 py-2 border ${formErrors.articles[idx]?.content ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                                rows={4}
                                            />
                                            {formErrors.articles[idx]?.content && (
                                                <p className="text-red-500 text-sm">Please enter content</p>
                                            )}
                                        </div>

                                        <div className="mt-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Bounding Box (Position on Page)</label>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                {[
                                                    { label: 'X Position', key: 'x' },
                                                    { label: 'Y Position', key: 'y' },
                                                    { label: 'Width', key: 'width' },
                                                    { label: 'Height', key: 'height' }
                                                ].map((dim) => (
                                                    <div key={dim.key}>
                                                        <label className="block text-xs text-gray-500 mb-1">{dim.label}</label>
                                                        <input
                                                            type="number"
                                                            value={article.bbox[dim.key as keyof typeof article.bbox]}
                                                            onChange={(e) =>
                                                                handleArticleChange(idx, 'bbox', {
                                                                    [dim.key]: Number(e.target.value),
                                                                })
                                                            }
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="mt-4 flex items-center">
                                            <input
                                                id={`leading-${article.id}`}
                                                type="checkbox"
                                                checked={article.isLeading}
                                                onChange={(e) => handleArticleChange(idx, 'isLeading', e.target.checked)}
                                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                            <label htmlFor={`leading-${article.id}`} className="ml-2 text-sm font-medium text-gray-700">
                                                Mark as Leading Article
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Submit Section */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className={`flex items-center px-6 py-3 rounded-lg font-semibold transition shadow-lg ${uploadStatuses.some(status => !status.isComplete && !status.isError)
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-green-600 hover:bg-green-700 text-white'
                                }`}
                            disabled={uploadStatuses.some(status => !status.isComplete && !status.isError)}
                        >
                            {uploadStatuses.some(status => !status.isComplete && !status.isError) ? (
                                <>
                                    <FaSpinner className="animate-spin mr-2" /> Uploading...
                                </>
                            ) : (
                                <>
                                    <FaSave className="mr-2" /> Save E-Paper
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
            {toast && (
                <Toast type={toast.type} message={toast.message} onClose={hideToast} />
            )}
        </div>
    );
};

export default CreateEpaper;