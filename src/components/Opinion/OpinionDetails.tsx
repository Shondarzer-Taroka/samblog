
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import { FiShare2, FiClock, FiUser } from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp, FaTelegram } from 'react-icons/fa';
import { Advertisement } from '@/share/DetailsPageNewsSection';
import LikeComment from '@/share/LikeComment';
import { useAuthProvider } from '@/Providers/AuthProvider';
// import { Advertisement } from '@/share/Advertisement';

interface Opinion {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  author: {
    name: string;
    image?: string;
    bio?: string;
  };
  tags?: string[];
}

export default function OpinionDetails() {
  const { id } = useParams();
  const [opinion, setOpinion] = useState<Opinion | null>(null);
  const [relatedOpinions, setRelatedOpinions] = useState<Opinion[]>([]);
  const [loading, setLoading] = useState(true);
  const {user,loading:spring}=useAuthProvider()
  const [showShareOptions, setShowShareOptions] = useState(false);
  
  console.log(opinion);

   const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: opinion?.title,
        text: opinion?.content.substring(0, 100) + '...',
        url: window.location.href,
      }).catch(err => console.log('Error sharing:', err));
    } else {
      setShowShareOptions(!showShareOptions);
    }
  };
  
const handleUnauthorized = () => {
  // Show login modal or redirect
  alert('Please login to like');
};
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [opinionRes, relatedRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/opinion/getSingleOpinion/${id}`),
          fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/opinion/related?currentId=${id}`)
        ]);

        const [opinionData, relatedData] = await Promise.all([
          opinionRes.json(),
          relatedRes.json()
        ]);

        setOpinion(opinionData.data);
        setRelatedOpinions(relatedData.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="h-10 bg-gray-200 rounded w-3/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (spring) {
    return <h1>loading</h1>
  }

  if (!opinion) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-700">মতামত খুঁজে পাওয়া যায়নি</h2>
        <p className="mt-2 text-gray-600">আপনি যে মতামতটি খুঁজছেন তা পাওয়া যায়নি</p>
        <Link href="/opinions" className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
          সকল মতামত দেখুন
        </Link>
      </div>
    );
  }

  const shareOnSocial = (platform: string) => {
    const url = window.location.href;
    const text = `${opinion.title} - ${opinion.author.name}`;

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`, '_blank');
        break;
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
        break;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="lg:w-2/3">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="text-blue-600 hover:underline hover:text-blue-700 transition">প্রথম পাতা</Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/opinions" className="text-blue-600 hover:underline hover:text-blue-700 transition">মতামত</Link>
              </li>
              <li>/</li>
              <li className="text-gray-800 font-medium truncate max-w-xs">{opinion.title}</li>
            </ol>
          </nav>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6 text-gray-900">
            {opinion.title}
          </h1>

          {/* Author Info */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-shrink-0">
              {opinion.author.image ? (
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow">
                  <Image
                    src={opinion.author.image}
                    alt={opinion.author.name}
                    width={56}
                    height={56}
                    className="object-cover w-full h-full"
                  />
                </div>
              ) : (
                <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
                  <FiUser className="text-gray-500 text-xl" />
                </div>
              )}
            </div>
            <div>
              <p className="font-medium text-gray-900">{opinion.author.name}</p>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <FiClock className="mr-1" />
                <span>প্রকাশিত: {formatDate(opinion.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Social Share */}
          <div className="flex flex-wrap items-center gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <FiShare2 className="text-gray-600 mr-2" />
              <span className="text-gray-700 font-medium">শেয়ার করুন:</span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => shareOnSocial('facebook')}
                className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition"
                aria-label="Facebook এ শেয়ার করুন"
              >
                <FaFacebook className="text-lg" />
              </button>
              <button
                onClick={() => shareOnSocial('twitter')}
                className="w-10 h-10 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500 transition"
                aria-label="Twitter এ শেয়ার করুন"
              >
                <FaTwitter className="text-lg" />
              </button>
              <button
                onClick={() => shareOnSocial('linkedin')}
                className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition"
                aria-label="LinkedIn এ শেয়ার করুন"
              >
                <FaLinkedin className="text-lg" />
              </button>
              <button
                onClick={() => shareOnSocial('whatsapp')}
                className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition"
                aria-label="WhatsApp এ শেয়ার করুন"
              >
                <FaWhatsapp className="text-lg" />
              </button>
              <button
                onClick={() => shareOnSocial('telegram')}
                className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition"
                aria-label="Telegram এ শেয়ার করুন"
              >
                <FaTelegram className="text-lg" />
              </button>
            </div>
          </div>

          {/* Main Image */}
          {opinion.imageUrl && (
            <div className="relative w-full h-96 mb-8 rounded-xl overflow-hidden shadow-md">
              <Image
                src={opinion.imageUrl}
                alt={opinion.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          )}

          {/* Article Content */}

          <div>
            <div
              className="prose max-w-none text-gray-800 text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: opinion.content }}
            />



            <LikeComment
              opinionId={opinion.id}
              initialLikes={opinion.likesCount || 0}
              initialComments={opinion.commentsCount || 0}
              initialIsLiked={opinion.isLiked || false}
              onUnauthorized={handleUnauthorized}
              currentUserId={user?.id}
              handleShare={handleShare}
            />





          </div>




          {/* Tags */}
          {opinion.tags && opinion.tags.length > 0 && (
            <div className="mt-10">
              <h3 className="text-lg font-medium text-gray-900 mb-3">ট্যাগসমূহ:</h3>
              <div className="flex flex-wrap gap-2">
                {opinion.tags.map(tag => (
                  <Link
                    key={tag}
                    href={`/opinions/tags/${tag}`}
                    className="px-4 py-2 bg-gray-100 text-gray-800 text-sm rounded-full hover:bg-gray-200 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/3 space-y-8">

          <Advertisement position='Sidebar' />



          {/* Related Opinions */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-xl text-gray-900 mb-6 pb-3 border-b border-gray-200">
              সম্পর্কিত মতামত
            </h3>
            <div className="space-y-5">
              {relatedOpinions.map((item) => (
                <Link
                  key={item.id}
                  href={`/news/opinions/${item.id}`}
                  className="block group transition"
                >
                  <div className="flex gap-4">
                    {item.imageUrl ? (
                      <div className="flex-shrink-0 relative w-20 h-20 rounded-lg overflow-hidden shadow">
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                    ) : (
                      <div className="flex-shrink-0 w-20 h-20 rounded-lg bg-gray-200 flex items-center justify-center">
                        <FiUser className="text-gray-400 text-xl" />
                      </div>
                    )}
                    <div>
                      <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {item.title}
                      </h4>
                      <div className="flex items-center text-xs text-gray-500 mt-2">
                        <FiClock className="mr-1" />
                        <span>{formatDate(item.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
            <h3 className="font-bold text-lg text-blue-800 mb-3">নিউজলেটার সাবস্ক্রাইব করুন</h3>
            <p className="text-sm text-blue-700 mb-4">সর্বশেষ মতামত এবং খবর পেতে ইমেইল নিবন্ধন করুন</p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="আপনার ইমেইল ঠিকানা"
                className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                সাবস্ক্রাইব করুন
              </button>
            </form>
          </div>

          {/* Popular Tags */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-xl text-gray-900 mb-6 pb-3 border-b border-gray-200">
              জনপ্রিয় ট্যাগ
            </h3>
            <div className="flex flex-wrap gap-2">
              {['রাজনীতি', 'অর্থনীতি', 'সমাজ', 'আন্তর্জাতিক', 'প্রযুক্তি', 'ক্রীড়া'].map(tag => (
                <Link
                  key={tag}
                  href={`/opinions/tags/${tag}`}
                  className="px-4 py-2 bg-gray-100 text-gray-800 text-sm rounded-full hover:bg-gray-200 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>




      {/* More Opinions Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 pb-3 border-b border-gray-200">
          আরও পড়ুন
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedOpinions.slice(0, 3).map((item) => (
            <Link
              key={item.id}
              href={`/news/opinions/${item.id}`}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              {item.imageUrl ? (
                <div className="relative h-48 w-full">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              ) : (
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <FiUser className="text-gray-400 text-4xl" />
                </div>
              )}
              <div className="p-5">
                <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2">
                  {item.title}
                </h3>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="flex items-center">
                    <FiUser className="mr-1" />
                    {item.author.name}
                  </span>
                  <span className="mx-2">•</span>
                  <span className="flex items-center">
                    <FiClock className="mr-1" />
                    {formatDate(item.createdAt)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/news/opinions"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            সকল মতামত দেখুন
          </Link>
        </div>
      </div>
    </div>
  );
}