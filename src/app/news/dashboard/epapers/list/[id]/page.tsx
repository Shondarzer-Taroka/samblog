/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(dashboard)/epapers/[id]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaEdit, FaArrowLeft } from 'react-icons/fa';
import { getEpaperById } from '@/lib/api/epaper';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { formatDate } from '@/lib/utils';
// import LoadingSpinner from '@/components/ui/LoadingSpinner';
// import { formatDate } from '@/lib/utils';

export default function EpaperDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [epaper, setEpaper] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEpaper = async () => {
      try {
        const data = await getEpaperById(Number(params.id));
        setEpaper(data);
      } catch (error) {
        console.error('Error fetching e-paper:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEpaper();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!epaper) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white p-8 rounded-xl shadow-sm text-center">
          <h3 className="text-lg font-medium text-gray-700">E-paper not found</h3>
          <button
            onClick={() => router.push('/epapers')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Back to E-papers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => router.push('/news/dashboard/epapers/list')}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <FaArrowLeft className="mr-2" />
          Back to E-papers
        </button>
        <button
          onClick={() => router.push(`/news/dashboard/epapers/list/${epaper.id}/edit`)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <FaEdit className="mr-2" />
          Edit
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {formatDate(epaper.date)}
          </h1>
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              Created by: {epaper.user?.name || 'Unknown'}
            </p>
            <p className="text-gray-600">
              Last updated: {formatDate(epaper.updatedAt)}
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Cover Image
            </h2>
            {epaper.mainEpaperImage ? (
              <img 
                src={epaper.mainEpaperImage} 
                alt="E-paper cover" 
                className="max-h-96 w-full object-contain rounded-lg border border-gray-200"
              />
            ) : (
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                No cover image
              </div>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Articles ({epaper.articles.length})
            </h2>
            <div className="space-y-8">
              {epaper.articles.map((article: any, index: number) => (
                <div key={index} className="border-b border-gray-200 pb-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Category: {article.category} | Page: {article.pageNumber}
                        {article.isLeading && (
                          <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                            Leading Article
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  {article.contentImage && (
                    <div className="mb-4">
                      <img 
                        src={article.contentImage} 
                        alt="Article content" 
                        className="max-h-64 w-full object-contain rounded-lg border border-gray-200"
                      />
                    </div>
                  )}

                  <div className="prose max-w-none">
                    <p className="whitespace-pre-line">{article.content}</p>
                  </div>

                  <div className="mt-4 text-sm text-gray-500">
                    <p>Position: X={article.bboxX}, Y={article.bboxY}</p>
                    <p>Dimensions: {article.bboxWidth}px × {article.bboxHeight}px</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}