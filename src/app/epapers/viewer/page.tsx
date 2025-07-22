/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Slider from 'react-slick';
import Image from 'next/image';
import {
  FaChevronLeft,
  FaChevronRight,
  FaFont,
  FaImage,
  FaSearchPlus,
  FaSearchMinus,
  FaDownload,
  FaShare,
  FaEnvelope,
  FaPrint,
  FaBookmark,
  
} from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { formatBengaliDate } from '@/utils/formatBengaliDate';

/* ---------- Types ---------- */
interface Article {
  id: number;
  title: string;
  contentImage: string;
  content: string;
  bbox: { x: number; y: number; width: number; height: number };
  category: string;
  pageNumber: number;
  isLeading?: boolean;
}

interface Epaper {
  id: number;
  mainEpaperImage: string;
  date: string;
  articles: Article[];
  createdAt: string;
  updatedAt: string;
}

interface PaginatedResponse {
  data: Epaper[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}

/* ---------- Arrow Component ---------- */
const Arrow = ({ dir, onClick }: { dir: 'left' | 'right'; onClick?: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className={`absolute ${dir === 'left' ? 'left-0' : 'right-0'} top-1/2 -translate-y-1/2 z-10 
      bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-md`}
  >
    {dir === 'left' ? <FaChevronLeft /> : <FaChevronRight />}
  </button>
);

/* ---------- Article Detail Page ---------- */
function ArticleDetailPage({ article, epaper, onBack }: {
  article: Article,
  epaper: Epaper,
  onBack: () => void
}) {
  const [viewMode, setViewMode] = useState<'text' | 'image'>('text');
  const [fontSize, setFontSize] = useState(16);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const handleDownload = () => {
    // Implement download functionality
    console.log('Downloading article...');
  };

  const handleEmail = () => {
    // Implement email functionality
    console.log('Emailing article...');
  };

  const handlePrint = () => {
    // Implement print functionality
    window.print();
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // Implement bookmark functionality
    console.log(isBookmarked ? 'Removing bookmark...' : 'Adding bookmark...');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.content.substring(0, 100) + '...',
        url: window.location.href,
      }).catch(err => console.log('Error sharing:', err));
    } else {
      setShowShareOptions(!showShareOptions);
    }
  };

  
  return (
    <div className="max-w-7xl mx-auto p-4 bg-gray-50 min-h-screen">
      {/* Enhanced Navigation Bar */}
      <div className="md:flex justify-between items-center mb-6 p-4 bg-white rounded-lg shadow-md">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 mb-6 md:mb-0 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all"
        >
          <FaChevronLeft />
          <span>Back to Epaper</span>
        </button>

        <div className="flex items-center space-x-4">
          {/* View Mode Toggle */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('text')}
              className={`md:p-2 rounded-lg flex items-center md:space-x-1 ${viewMode === 'text' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
              title="Text View"
            >
              <FaFont className="text-gray-700" />
              <span className="text-sm hidden md:inline">Text</span>
            </button>
            <button
              onClick={() => setViewMode('image')}
              className={`md:p-2 rounded-lg flex items-center space-x-1 ${viewMode === 'image' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
              title="Image View"
            >
              <FaImage className="text-gray-700" />
              <span className="text-sm hidden md:inline">Image</span>
            </button>
          </div>

          {/* Font Size Controls */}
          <div className="flex items-center md:space-x-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setFontSize(f => Math.max(12, f - 1))}
              className="md:p-2 rounded-lg hover:bg-gray-200"
              title="Decrease Font Size"
            >
              <FaSearchMinus className="text-gray-700" />
            </button>
            <span className="text-sm w-8 text-center font-medium">{fontSize}px</span>
            <button
              onClick={() => setFontSize(f => Math.min(24, f + 1))}
              className="md:p-2 rounded-lg hover:bg-gray-200"
              title="Increase Font Size"
            >
              <FaSearchPlus className="text-gray-700" />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-1">
            <button
              onClick={toggleBookmark}
              className={`md:p-2 rounded-lg ${isBookmarked ? 'text-yellow-500 bg-yellow-50' : 'text-gray-700 hover:bg-gray-200'}`}
              title={isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
            >
              <FaBookmark />
            </button>

            <button
              onClick={handleDownload}
              className="md:p-2 rounded-lg text-gray-700 hover:bg-gray-200"
              title="Download"
            >
              <FaDownload />
            </button>

            <div className="relative">
              <button
                onClick={handleShare}
                className="md:p-2 rounded-lg text-gray-700 hover:bg-gray-200"
                title="Share"
              >
                <FaShare />
              </button>

              {showShareOptions && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <button
                    onClick={handleEmail}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    <FaEnvelope className="mr-2" />
                    Email
                  </button>
                  <button
                    onClick={handlePrint}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    <FaPrint className="mr-2" />
                    Print
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Article Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
              {article.category}
            </span>
            {article.isLeading && (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-[12px] font-medium rounded-full">
                Leading Story
              </span>
            )}
            <span className="text-gray-500 text-sm">
              Page {article.pageNumber} • {formatBengaliDate(epaper.date)}
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
        </div>

        {/* Article Body */}
        {viewMode === 'text' ? (
          <div
            className="prose max-w-none"
            style={{ fontSize: `${fontSize}px`, lineHeight: '1.6' }}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        ) : (
          <div className="relative w-full h-max border rounded-lg overflow-hidden">
            <Image
              src={article.contentImage}
              alt={article.title}
              width={1000}
              height={1000}
              className="w-full object-contain bg-gray-100"
            />
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Main Epaper Viewer Component ---------- */
export default function EpaperViewerPage() {
  const router = useRouter();
  const params = useSearchParams();

  const page = Number(params.get('page') ?? '1');
  const selectedQ = Number(params.get('selected') ?? '0');
  const articleId = params.get('article');

  /* ─ State ─ */
  const [epapers, setEpapers] = useState<Epaper[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(selectedQ);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  console.log(epapers, 'e paper');

  /* ─ Image size for bbox scaling ─ */
  const containerRef = useRef<HTMLDivElement>(null);
  const [natural, setNatural] = useState<{ w: number; h: number }>({ w: 1, h: 1 });

  /* ─ fetch epapers ─ */
  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/epapers?page=${page}&limit=10`, {
          cache: 'no-store',
          signal: controller.signal
        });
        if (!res.ok) throw new Error('Failed to fetch epapers');
        const json: PaginatedResponse = await res.json();
        setEpapers(json.data);
        setSelectedIndex(json.data[selectedIndex] ? selectedIndex : 0);
      } catch (err) {
        if ((err as any)?.name !== 'AbortError') setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    })();
    return () => controller.abort();
  }, [page, selectedIndex]);

  /* ─ Helpers ─ */
  const handleSelect = (idx: number) => {
    setSelectedIndex(idx);
    router.replace(`?page=${page}&selected=${idx}`, { scroll: false });
  };

  const handleNext = () => handleSelect(selectedIndex === epapers.length - 1 ? 0 : selectedIndex + 1);
  const handlePrev = () => handleSelect(selectedIndex === 0 ? epapers.length - 1 : selectedIndex - 1);

  const handleArticleClick = (articleId: number) => {
    router.push(`?page=${page}&selected=${selectedIndex}&article=${articleId}`);
  };

  const handleBackToEpaper = () => {
    router.replace(`?page=${page}&selected=${selectedIndex}`);
  };

  /* ─ Slick settings ─ */
  const settings = {
    dots: false,
    infinite: false,
    speed: 400,
    slidesToShow: Math.min(6, epapers.length),
    slidesToScroll: 2,
    nextArrow: <Arrow dir="right" />,
    prevArrow: <Arrow dir="left" />,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: Math.min(5, epapers.length) } },
      { breakpoint: 1024, settings: { slidesToShow: Math.min(4, epapers.length) } },
      { breakpoint: 768, settings: { slidesToShow: Math.min(3, epapers.length) } },
      { breakpoint: 480, settings: { slidesToShow: Math.min(2, epapers.length) } },
    ],
  };

  /* ─ UI branches ─ */
  if (isLoading) return <Loader />;
  if (error) return <ErrorBlock msg={error} />;
  if (!epapers.length) return <Empty />;

  const currentEpaper = epapers[selectedIndex];

  // If article ID is in URL params, show article detail view
  if (articleId) {
    const article = currentEpaper.articles.find(a => a.id === Number(articleId));
    if (!article) return <ErrorBlock msg="Article not found" />;

    return <ArticleDetailPage
      article={article}
      epaper={currentEpaper}
      onBack={handleBackToEpaper}
    />;
  }

  /* ─ scaling calc ─ */
  const cW = containerRef.current?.clientWidth ?? 1;
  const cH = containerRef.current?.clientHeight ?? 1;
  const scale = Math.min(cW / natural.w, cH / natural.h);
  const offsetX = (cW - natural.w * scale) / 2;
  const offsetY = (cH - natural.h * scale) / 2;
  console.log('scale',scale);
  

  if (epapers.length===0) {
    return <div className='flex justify-center items-center'> <h1>ই-পেপার পাওয়া যায়নি</h1></div>
  }

  return (
    <section>
      {/* ===== Big preview with bbox ===== */}
      <div className="bg-white p-4 mb-6 shadow-md  max-h-max">
        <div ref={containerRef} className="relative max-w-6xl mx-auto">

          <div className=" ">
            <Image
              src={currentEpaper.mainEpaperImage}
              alt={`Epaper ${currentEpaper.date}`}


              width={1000}
              height={1000}
              className="w-full" // ⬅️ Scale বড় করতে
              onLoadingComplete={({ naturalWidth, naturalHeight }) =>
                setNatural({ w: naturalWidth, h: naturalHeight })
              }
            />
          </div>



          {/* bounding boxes */}
          {currentEpaper.articles.map((article) => {
            const { x, y, width, height } = article.bbox;
            const style = {
              left: offsetX + x * scale,
              top: offsetY + y * scale,
              width: width * scale,
              height: height * scale,
            };
            return (
              <div
                key={article.id}
                style={style}
                className="absolute border-2 border-transparent hover:border-red-500 group cursor-pointer"
                onClick={() => handleArticleClick(article.id)}
              >
                <div className="w-full h-full bg-gray-500/30 opacity-0 group-hover:opacity-60 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {article.title}
                </div>
              </div>
            );
          })}

          {/* nav arrows */}
          {epapers.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-4 rounded-full z-10"
              >
                <FaChevronLeft size={24} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-4 rounded-full z-10"
              >
                <FaChevronRight size={24} />
              </button>
            </>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-center py-2">
            {new Date(currentEpaper.date).toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* ===== Thumbnail slider ===== */}
      <div className="bg-gray-100 py-6 px-2 ">
        <Slider {...settings}>
          {epapers.map((epaper, idx) => (
            <div key={epaper.id} className="px-2">
              <div
                onClick={() => handleSelect(idx)}
                className={`cursor-pointer border-4 rounded-md overflow-hidden shadow-md transition-all
                  ${selectedIndex === idx ? 'border-red-600 scale-105' : 'border-transparent hover:border-gray-300'}
                `}
              >
                <Image
                  src={epaper.mainEpaperImage}
                  alt={`Epaper ${epaper.date}`}
                  width={150}
                  height={200}
                  className="object-cover w-full h-[130]"
                />
              </div>
              <p className="mt-2 text-center text-sm bg-gray-800 text-white py-1 rounded">
                {new Date(epaper.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

/* ---------- Helper UI Components ---------- */
const Loader = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-red-600"></div>
  </div>
);

const ErrorBlock = ({ msg }: { msg: string }) => (
  <div className="flex justify-center items-center h-screen">
    <p className="text-red-500 text-xl">{msg}</p>
  </div>
);

const Empty = () => (
  <div className="flex justify-center items-center h-screen">
    <p className="text-xl">No epapers found</p>
  </div>
);

