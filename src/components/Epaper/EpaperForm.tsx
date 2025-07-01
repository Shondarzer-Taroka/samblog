/* eslint-disable @typescript-eslint/no-explicit-any */
// components/epapers/EpaperForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaSave, FaImage, FaCalendarAlt, FaPlus } from 'react-icons/fa';
// import { categories } from '@/types/epaper';
// import ArticleEditor from './ArticleEditor';
// import LoadingSpinner from '../ui/LoadingSpinner';
import { createEpaper, updateEpaper, getEpaperById } from '@/lib/api/epaper';
import LoadingSpinner from '../ui/LoadingSpinner';
import ArticleEditor from './ArticleEditor';

interface EpaperFormProps {
  epaperId?: number;
}

export default function EpaperForm({ epaperId }: EpaperFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(!!epaperId);
  const [saving, setSaving] = useState(false);
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

  useEffect(() => {
    if (epaperId) {
      const fetchEpaper = async () => {
        try {
          const data = await getEpaperById(epaperId);
          setEpaperData({
            mainEpaperImage: data.mainEpaperImage,
            date: data.date.toISOString().split('T')[0],
            articles: data.articles.map((article: { bboxX: any; bboxY: any; bboxWidth: any; bboxHeight: any; }) => ({
              ...article,
              bbox: {
                x: article.bboxX,
                y: article.bboxY,
                width: article.bboxWidth,
                height: article.bboxHeight
              }
            }))
          });
        } catch (error) {
          console.error('Error fetching e-paper:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchEpaper();
    }
  }, [epaperId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (epaperId) {
        await updateEpaper(epaperId, epaperData);
      } else {
        await createEpaper(epaperData);
      }
      router.push('/epapers');
    } catch (error) {
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
              <div className="flex items-center space-x-4">
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
                <div>
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={epaperData.mainEpaperImage}
                    onChange={(e) => setEpaperData(prev => ({
                      ...prev,
                      mainEpaperImage: e.target.value
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Paste the URL of your e-paper cover image
                  </p>
                </div>
              </div>
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
                />
              ))}
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push('/epapers')}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:bg-green-400"
          >
            {saving ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
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
    </div>
  );
}