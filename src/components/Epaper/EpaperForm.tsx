// /* eslint-disable @next/next/no-img-element */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */


/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */


// components/epapers/EpaperForm.tsx
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { FaSave, FaImage, FaCalendarAlt, FaPlus, FaSpinner, FaTimes } from 'react-icons/fa';
import LoadingSpinner from '../ui/LoadingSpinner';
import ArticleEditor from './ArticleEditor';
import { createEpaper, getEpaperById, updateEpaper } from '@/lib/api/epaper';
import { useToast } from '@/hooks/useToast';
import Toast from '@/share/Toast';

interface UploadStatus {
  id: string;
  type: 'main' | 'content';
  articleIndex?: number;
  progress: number;
  message: string;
  isError: boolean;
}

interface EpaperFormProps {
  epaperId?: number;
}

export default function EpaperForm({ epaperId }: EpaperFormProps) {
  const { hideToast, showToast, toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(!!epaperId);
  const [saving, setSaving] = useState(false);
  const [uploadStatuses, setUploadStatuses] = useState<UploadStatus[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [activeDragIndex, setActiveDragIndex] = useState<number | null>(null);
  const mainImageInputRef = useRef<HTMLInputElement>(null);
  const mainImageDropRef = useRef<HTMLDivElement>(null);

  const [epaperData, setEpaperData] = useState({
    mainEpaperImage: '',
    date: new Date().toISOString().split('T')[0],
    articles: [] as Array<{
      id?: number;
      title: string;
      contentImage: string;
      content: string;
      bbox: { x: number; y: number; width: number; height: number };
      category: string;
      isLeading?: boolean;
      pageNumber?: number;
    }>
  });

  console.log(epaperData,'e paper data e paper form');
  
  // Handle file upload to Cloudinary
  const uploadFile = async (file: File, type: 'main' | 'content', articleIndex?: number) => {
    const uploadId = type === 'main' ? `main-${Date.now()}` : `content-${articleIndex}-${Date.now()}`;
    
    setUploadStatuses(prev => [...prev, {
      id: uploadId,
      type,
      articleIndex,
      progress: 0,
      message: type === 'main' ? 'Uploading main image...' : 'Uploading article image...',
      isError: false
    }]);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

      const xhr = new XMLHttpRequest();
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          setUploadStatuses(prev => prev.map(status => 
            status.id === uploadId ? { ...status, progress } : status
          ));
        }
      });

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) throw new Error('Upload failed');
      
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatuses(prev => prev.map(status => 
        status.id === uploadId ? { ...status, message: 'Upload failed!', isError: true } : status
      ));
      throw error;
    }
  };

  // Handle main image upload
  const handleMainImageUpload = async (file: File) => {
    try {
      const imageUrl = await uploadFile(file, 'main');
      
      setEpaperData(prev => ({
        ...prev,
        mainEpaperImage: imageUrl
      }));

      setUploadStatuses(prev => prev.map(status => 
        status.id.startsWith('main-') ? { ...status, progress: 100, message: 'Upload complete!', isError: false } : status
      ));

      setTimeout(() => {
        setUploadStatuses(prev => prev.filter(status => !status.id.startsWith('main-')));
      }, 3000);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  // Handle article content image upload
  const handleContentImageUpload = async (file: File, articleIndex: number) => {
    try {
      const imageUrl = await uploadFile(file, 'content', articleIndex);
      
      setEpaperData(prev => {
        const updatedArticles = [...prev.articles];
        updatedArticles[articleIndex].contentImage = imageUrl;
        return { ...prev, articles: updatedArticles };
      });

      setUploadStatuses(prev => prev.map(status => 
        status.id.startsWith(`content-${articleIndex}-`) ? { ...status, progress: 100, message: 'Upload complete!', isError: false } : status
      ));

      setTimeout(() => {
        setUploadStatuses(prev => prev.filter(status => !status.id.startsWith(`content-${articleIndex}-`)));
      }, 3000);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  // Drag and drop handlers for main image
  const handleMainDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleMainDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleMainDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleMainDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleMainImageUpload(e.dataTransfer.files[0]);
    }
  };

  // Drag and drop handlers for article images
  const handleArticleDragEnter = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDragIndex(index);
  };

  const handleArticleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDragIndex(null);
  };

  const handleArticleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleArticleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDragIndex(null);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleContentImageUpload(e.dataTransfer.files[0], index);
    }
  };

  // File input change handlers
  const handleMainImageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleMainImageUpload(e.target.files[0]);
    }
  };

  const handleContentImageInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.files && e.target.files[0]) {
      handleContentImageUpload(e.target.files[0], index);
    }
  };

  // Remove upload status
  const removeUploadStatus = (id: string) => {
    setUploadStatuses(prev => prev.filter(status => status.id !== id));
  };


 

  // Fetch e-paper data
  useEffect(() => {
    if (epaperId) {
      const fetchEpaper = async () => {
        try {
          const data = await getEpaperById(epaperId);

          // Ensure proper date handling
          let publicationDate;
          try {
            publicationDate = data.date instanceof Date
              ? data.date
              : new Date(data.date);

            if (isNaN(publicationDate.getTime())) {
              throw new Error('Invalid date');
            }
          } catch (error) {
            console.error('Invalid date format, using current date instead');
            publicationDate = new Date();
          }

          setEpaperData({
            mainEpaperImage: data.mainEpaperImage || '',
            date: publicationDate.toISOString().split('T')[0],
            articles: data.articles.map((article: any) => ({
              id: article.id,
              title: article.title || '',
              contentImage: article.contentImage || '',
              content: article.content || '',
              bbox: {
                x: typeof article.bboxX === 'number' ? article.bboxX : 0,
                y: typeof article.bboxY === 'number' ? article.bboxY : 0,
                width: typeof article.bboxWidth === 'number' ? article.bboxWidth : 100,
                height: typeof article.bboxHeight === 'number' ? article.bboxHeight : 100
              },
              category: article.category || '',
              isLeading: Boolean(article.isLeading),
              pageNumber: typeof article.pageNumber === 'number' ? article.pageNumber : 1
            }))
          });
        } catch (error) {
          console.error('Error fetching e-paper:', error);
          setEpaperData({
            mainEpaperImage: '',
            date: new Date().toISOString().split('T')[0],
            articles: []
          });
        } finally {
          setLoading(false);
        }
      };
      fetchEpaper();
    }
  }, [epaperId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(epaperData,'e pa data quil');
    
    setSaving(true);
    try {
      if (epaperId) {
        const data = await updateEpaper(epaperId, epaperData);
        if (data.message === 'OK') {
          showToast('success', 'ই-পেপার আপডেট হয়েছে');
        } else {
          showToast('failed', 'ই-পেপার আপডেট ব্যর্থ হয়েছে');
        }
      } else {
        const data = await createEpaper(epaperData);
        // console.log(data);
        
        if (data.message === "Created") {
          showToast('success', 'ই-পেপার তৈরি হয়েছে');
        } else {
          showToast('failed', 'ই-পেপার তৈরি ব্যর্থ হয়েছে');
        }
      }
    } catch (error) {
      showToast('error', 'Something went wrong');
      console.error('Error saving e-paper:', error);
    } finally {
      setSaving(false);
    }
  };

  const addArticle = () => {
    setEpaperData(prev => ({
      ...prev,
      articles: [
        ...prev.articles,
        {
          title: '',
          contentImage: '',
          content: '',
          bbox: { x: 0, y: 0, width: 100, height: 100 },
          category: '',
          isLeading: false,
          pageNumber: 1
        }
      ]
    }));
  };

  const removeArticle = (index: number) => {
    setEpaperData(prev => ({
      ...prev,
      articles: prev.articles.filter((_, i) => i !== index)
    }));
  };

  const updateArticle = (index: number, field: string, value: any) => {
    console.log(value,'valoe');
    
    setEpaperData(prev => {
      const updatedArticles = [...prev.articles];
      if (field === 'bbox') {
        updatedArticles[index].bbox = { ...updatedArticles[index].bbox, ...value };
      } else {
        (updatedArticles[index] as any)[field] = value;
      }
      return { ...prev, articles: updatedArticles };
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {epaperId ? 'Edit E-Paper' : 'Create New E-Paper'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Main E-Paper Info */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            E-Paper Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Main Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-paper Cover Image
              </label>
              <div 
                ref={mainImageDropRef}
                onDragEnter={handleMainDragEnter}
                onDragLeave={handleMainDragLeave}
                onDragOver={handleMainDragOver}
                onDrop={handleMainDrop}
                className={`flex items-center space-x-4 ${isDragging ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}
              >
                {epaperData.mainEpaperImage ? (
                  <img
                    src={epaperData.mainEpaperImage}
                    alt="E-paper cover"
                    className="h-32 w-32 object-cover rounded-lg"
                  />
                ) : (
                  <div className="h-32 w-32 bg-gray-100 rounded-lg flex items-center justify-center">
                    <FaImage className="text-gray-400 text-2xl" />
                  </div>
                )}
                <div className="flex-1">
                  <input
                    type="file"
                    ref={mainImageInputRef}
                    onChange={handleMainImageInputChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => mainImageInputRef.current?.click()}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition text-left"
                  >
                    {epaperData.mainEpaperImage ? 'Change Image' : 'Upload Image'}
                  </button>
                  <p className="text-xs text-gray-500 mt-1">
                    JPG, PNG, or GIF (Max 5MB). Drag & drop or click to upload.
                  </p>
                </div>
              </div>

              {/* Upload status for main image */}
              {uploadStatuses
                .filter(status => status.type === 'main')
                .map(status => (
                  <div
                    key={status.id}
                    className={`mt-2 p-2 rounded text-sm ${status.isError ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{status.message}</span>
                      <button
                        onClick={() => removeUploadStatus(status.id)}
                        className="ml-2 text-xs"
                      >
                        <FaTimes />
                      </button>
                    </div>
                    {!status.isError && (
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

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Publication Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaCalendarAlt className="text-gray-400" />
                </div>
                <input
                  type="date"
                  value={epaperData.date}
                  onChange={(e) => setEpaperData(prev => ({
                    ...prev,
                    date: e.target.value
                  }))}
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Articles */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Articles
            </h2>
            <button
              type="button"
              onClick={addArticle}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <FaPlus className="mr-2" />
              Add Article
            </button>
          </div>

          {epaperData.articles.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No articles added yet</p>
            </div>
          ) : (
            <div className="space-y-6">
              {epaperData.articles.map((article, index) => (
                <ArticleEditor

                  key={index}
                  article={article}
                  index={index}
                  onUpdate={(field, value) => updateArticle(index, field, value)}
                  onRemove={() => removeArticle(index)}
                  onImageUpload={(e) => handleContentImageInputChange(e, index)}
                  uploadStatuses={uploadStatuses.filter(
                    status => status.type === 'content' && status.articleIndex === index
                  )}
                  onRemoveUploadStatus={removeUploadStatus}
                  onDragEnter={(e) => handleArticleDragEnter(e, index)}
                  onDragLeave={handleArticleDragLeave}
                  onDragOver={handleArticleDragOver}
                  onDrop={(e) => handleArticleDrop(e, index)}
                  isDragging={activeDragIndex === index}
             
                />
              ))}
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push('/news/dashboard/epapers/list')}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving || uploadStatuses.some(status => !status.isError && status.progress < 100)}
            className={`flex items-center px-6 py-2 rounded-lg transition ${
              saving || uploadStatuses.some(status => !status.isError && status.progress < 100)
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {saving ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Saving...
              </>
            ) : (
              <>
                <FaSave className="mr-2" />
                Save E-Paper
              </>
            )}
          </button>
        </div>
      </form>
      {toast && (
        <Toast type={toast.type} message={toast.message} onClose={hideToast} />
      )}
    </div>
  );
}