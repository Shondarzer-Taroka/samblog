'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiUpload, FiImage, FiLayout, FiSave, FiX, FiPlus, FiTrash2 } from 'react-icons/fi';
import { FileText } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  content: string;
  bbox: { x: number; y: number; width: number; height: number };
  category: string;
  isLeading?: boolean;
}

export default function CreateEpaper() {
  const router = useRouter();
  const [newspaperTitle, setNewspaperTitle] = useState('প্রথম আলো');
  const [date, setDate] = useState(new Date().toLocaleDateString('bn-BD'));
  const [imageUrl, setImageUrl] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionBox, setSelectionBox] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 });
  const [activeTab, setActiveTab] = useState('layout');
  const [categories, setCategories] = useState(['জাতীয়', 'আন্তর্জাতিক', 'অর্থনীতি', 'খেলা', 'বিনোদন']);
  const [newCategory, setNewCategory] = useState('');
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Get image dimensions when loaded
  const handleImageLoad = () => {
    if (imageRef.current) {
      setImageDimensions({
        width: imageRef.current.naturalWidth,
        height: imageRef.current.naturalHeight
      });
    }
  };

  // Start selection
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || !imageUrl) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / (rect.width / imageDimensions.width);
    const y = (e.clientY - rect.top) / (rect.height / imageDimensions.height);

    setIsSelecting(true);
    setSelectionBox({ x1: x, y1: y, x2: x, y2: y });
  };

  // Update selection
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isSelecting || !imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / (rect.width / imageDimensions.width);
    const y = (e.clientY - rect.top) / (rect.height / imageDimensions.height);

    setSelectionBox(prev => ({ ...prev, x2: x, y2: y }));
  };

  // Finalize selection
  const handleMouseUp = () => {
    if (!isSelecting) return;
    setIsSelecting(false);

    const x = Math.min(selectionBox.x1, selectionBox.x2);
    const y = Math.min(selectionBox.y1, selectionBox.y2);
    const width = Math.abs(selectionBox.x2 - selectionBox.x1);
    const height = Math.abs(selectionBox.y2 - selectionBox.y1);

    if (width < 50 || height < 50) return;

    const newArticle: Article = {
      id: Date.now().toString(),
      title: `নতুন খবর ${articles.length + 1}`,
      content: 'এখানে আপনার খবরের বিস্তারিত লিখুন...',
      bbox: { x, y, width, height },
      category: categories[0]
    };

    setArticles([...articles, newArticle]);
    setSelectedArticle(newArticle);
  };

  // Update article details
  const handleArticleChange = (field: keyof Article, value: string) => {
    if (!selectedArticle) return;
    
    setArticles(articles.map(article => 
      article.id === selectedArticle.id ? { ...article, [field]: value } : article
    ));
    setSelectedArticle({ ...selectedArticle, [field]: value });
  };

  // Delete article
  const handleDeleteArticle = (id: string) => {
    setArticles(articles.filter(article => article.id !== id));
    if (selectedArticle?.id === id) {
      setSelectedArticle(null);
    }
  };

  // Add new category
  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
    }
  };

  // Save e-paper
  const handleSave = () => {
    // In a real app, you would save to database
    alert('ই-পেপার সফলভাবে সংরক্ষিত হয়েছে!');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#d9232e] text-white py-3 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">ই-পেপার তৈরি করুন</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-white text-[#d9232e] rounded font-medium hover:bg-gray-100 flex items-center"
              >
                <FiSave className="mr-2" /> সংরক্ষণ করুন
              </button>
              <button
                onClick={() => router.push('/')}
                className="px-4 py-2 bg-white text-[#d9232e] rounded font-medium hover:bg-gray-100 flex items-center"
              >
                <FiX className="mr-2" /> বাতিল করুন
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Newspaper info */}
          <div className="p-6 border-b">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">সংবাদপত্রের নাম</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#d9232e]"
                  value={newspaperTitle}
                  onChange={(e) => setNewspaperTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">তারিখ</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#d9232e]"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">প্রথম পাতা আপলোড</label>
                <div className="flex items-center">
                  <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-l border border-gray-300 flex items-center">
                    <FiUpload className="mr-2" /> ছবি নির্বাচন
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                  <span className="px-3 py-2 border border-l-0 border-gray-300 rounded-r bg-gray-50 text-sm truncate flex-1">
                    {imageUrl ? 'ছবি নির্বাচিত হয়েছে' : 'কোনো ছবি নির্বাচন করা হয়নি'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row">
            {/* Left sidebar */}
            <div className="lg:w-64 border-r p-4 bg-gray-50">
              <div className="flex border-b mb-4">
                <button
                  className={`px-4 py-2 font-medium ${activeTab === 'layout' ? 'text-[#d9232e] border-b-2 border-[#d9232e]' : 'text-gray-600'}`}
                  onClick={() => setActiveTab('layout')}
                >
                  <FiLayout className="inline mr-2" /> লেআউট
                </button>
                <button
                  className={`px-4 py-2 font-medium ${activeTab === 'content' ? 'text-[#d9232e] border-b-2 border-[#d9232e]' : 'text-gray-600'}`}
                  onClick={() => setActiveTab('content')}
                >
                  <FileText className="inline mr-2" /> কন্টেন্ট
                </button>
              </div>

              {activeTab === 'layout' ? (
                <div>
                  <h3 className="font-medium text-gray-700 mb-3">খবর ব্লক</h3>
                  <div className="space-y-2">
                    {articles.map(article => (
                      <div
                        key={article.id}
                        className={`p-2 rounded cursor-pointer ${selectedArticle?.id === article.id ? 'bg-[#d9232e] text-white' : 'bg-white border hover:border-[#d9232e]'}`}
                        onClick={() => setSelectedArticle(article)}
                      >
                        <div className="flex justify-between items-center">
                          <span className="truncate">{article.title}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteArticle(article.id);
                            }}
                            className="text-gray-500 hover:text-red-500"
                          >
                            <FiTrash2 size={14} />
                          </button>
                        </div>
                        <div className="text-xs mt-1">{article.category}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="font-medium text-gray-700 mb-3">বিভাগসমূহ</h3>
                  <div className="space-y-2 mb-4">
                    {categories.map(category => (
                      <div key={category} className="bg-white border rounded px-3 py-2">
                        {category}
                      </div>
                    ))}
                  </div>
                  <div className="flex">
                    <input
                      type="text"
                      className="flex-1 px-2 py-1 border border-gray-300 rounded-l focus:outline-none focus:ring-1 focus:ring-[#d9232e]"
                      placeholder="নতুন বিভাগ"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                    />
                    <button
                      onClick={handleAddCategory}
                      className="bg-[#d9232e] text-white px-3 rounded-r hover:bg-[#c11b26]"
                    >
                      <FiPlus />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Main content */}
            <div className="flex-1 p-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">প্রথম পাতা ডিজাইন</h2>
                <p className="text-gray-600 text-sm">
                  ছবিতে আয়তাকার এলাকা নির্বাচন করে নতুন খবর ব্লক তৈরি করুন
                </p>
              </div>

              <div className="relative border-2 border-dashed border-gray-300 rounded-lg overflow-hidden bg-gray-100"
                style={{ minHeight: '500px' }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                {imageUrl ? (
                  <>
                    <img
                      ref={imageRef}
                      src={imageUrl}
                      alt="Newspaper Page"
                      className="max-w-full h-auto"
                      onLoad={handleImageLoad}
                    />

                    {/* Selection box */}
                    {isSelecting && (
                      <div
                        className="absolute border-2 border-blue-500 bg-blue-500 bg-opacity-20"
                        style={{
                          left: `${Math.min(selectionBox.x1, selectionBox.x2)}px`,
                          top: `${Math.min(selectionBox.y1, selectionBox.y2)}px`,
                          width: `${Math.abs(selectionBox.x2 - selectionBox.x1)}px`,
                          height: `${Math.abs(selectionBox.y2 - selectionBox.y1)}px`,
                        }}
                      />
                    )}

                    {/* Article boxes */}
                    {articles.map(article => (
                      <div
                        key={article.id}
                        className={`absolute border-2 ${selectedArticle?.id === article.id ?
                          'border-[#d9232e] bg-[#d9232e] bg-opacity-20' :
                          'border-gray-400 bg-white bg-opacity-30'} 
                          cursor-pointer transition-all`}
                        style={{
                          left: `${article.bbox.x}px`,
                          top: `${article.bbox.y}px`,
                          width: `${article.bbox.width}px`,
                          height: `${article.bbox.height}px`,
                        }}
                        onClick={() => setSelectedArticle(article)}
                      >
                        <div className="absolute inset-0 p-1 overflow-hidden">
                          <div className="text-xs font-medium truncate bg-white bg-opacity-80 px-1">
                            {article.title}
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                    <FiImage size={48} className="mb-4" />
                    <p>প্রথম পাতা আপলোড করুন</p>
                    <p className="text-sm mt-1">অথবা ড্র্যাগ করে আয়তাকার এলাকা তৈরি করুন</p>
                  </div>
                )}
              </div>

              {/* Article editor */}
              {selectedArticle && (
                <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">খবর সম্পাদনা</h3>
                    <button
                      onClick={() => setSelectedArticle(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FiX size={20} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">শিরোনাম</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#d9232e]"
                          value={selectedArticle.title}
                          onChange={(e) => handleArticleChange('title', e.target.value)}
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">বিভাগ</label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#d9232e]"
                          value={selectedArticle.category}
                          onChange={(e) => handleArticleChange('category', e.target.value)}
                        >
                          {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex items-center mb-4">
                        <input
                          type="checkbox"
                          id="isLeading"
                          checked={selectedArticle.isLeading || false}
                          onChange={(e) => {
                            handleArticleChange('isLeading', e.target.checked);
                          }}
                          className="h-4 w-4 text-[#d9232e] focus:ring-[#d9232e] border-gray-300 rounded"
                        />
                        <label htmlFor="isLeading" className="ml-2 block text-sm text-gray-700">
                          প্রধান খবর হিসেবে চিহ্নিত করুন
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">বিস্তারিত</label>
                      <textarea
                        rows={5}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#d9232e]"
                        value={selectedArticle.content}
                        onChange={(e) => handleArticleChange('content', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
                    <div className="text-sm text-gray-500">
                      ব্লক সাইজ: {Math.round(selectedArticle.bbox.width)}x{Math.round(selectedArticle.bbox.height)} পিক্সেল
                    </div>
                    <button
                      onClick={() => handleDeleteArticle(selectedArticle.id)}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 flex items-center"
                    >
                      <FiTrash2 className="mr-1" /> ব্লক ডিলিট করুন
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-[#333] text-white py-6 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} প্রথম আলো ই-পেপার এডিটর. সর্বস্বত্ব সংরক্ষিত</p>
        </div>
      </footer>
    </div>
  );
}