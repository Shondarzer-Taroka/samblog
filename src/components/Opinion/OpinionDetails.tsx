'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { formatDate } from '@/lib/utils'; // You'll need to create this utility
import Link from 'next/link';

interface Opinion {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  author: {
    name: string;
    image?: string;
  };
}

export default function OpinionDetails() {
  const { id } = useParams();
  const [opinion, setOpinion] = useState<Opinion | null>(null);
  const [relatedOpinions, setRelatedOpinions] = useState<Opinion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch the opinion
        const opinionRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/opinion/getSingleOpinion/${id}`);
        const opinionData = await opinionRes.json();
        setOpinion(opinionData.data);

        // Fetch related opinions
        const relatedRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/opinion/related?currentId=${id}`);
        const relatedData = await relatedRes.json();
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
    return <div className="max-w-6xl mx-auto px-4 py-8">Loading...</div>;
  }

  if (!opinion) {
    return <div className="max-w-6xl mx-auto px-4 py-8">Opinion not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="lg:w-2/3">
          {/* Breadcrumb */}
          <nav className="mb-4">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link href="/" className="text-blue-600 hover:underline">Home</Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/opinions" className="text-blue-600 hover:underline">Opinions</Link>
              </li>
              <li>/</li>
              <li className="text-gray-600 truncate max-w-xs">{opinion.title}</li>
            </ol>
          </nav>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4 text-gray-900">
            {opinion.title}
          </h1>

          {/* Author Info */}
          <div className="flex items-center gap-4 mb-6">
            {opinion.author.image && (
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={opinion.author.image}
                  alt={opinion.author.name}
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <p className="font-medium text-gray-900">{opinion.author.name}</p>
              <p className="text-sm text-gray-500">
                Published: {formatDate(opinion.createdAt)}
              </p>
            </div>
          </div>

          {/* Social Share */}
          <div className="flex gap-3 items-center mb-8">
            <span className="text-sm text-gray-600">Share:</span>
            {['facebook', 'twitter', 'linkedin', 'whatsapp', 'telegram'].map((social) => (
              <button
                key={social}
                className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                aria-label={`Share on ${social}`}
              >
                {/* Replace with actual icons */}
                <span className="text-sm">{social[0].toUpperCase()}</span>
              </button>
            ))}
          </div>

          {/* Main Image */}
          {opinion.imageUrl && (
            <div className="relative w-full h-96 mb-4 rounded-lg overflow-hidden">
              <Image
                src={opinion.imageUrl}
                alt={opinion.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Article Content */}
          <div 
            className="prose max-w-none text-gray-800 text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: opinion.content }}
          />

          {/* Tags */}
          <div className="mt-8 flex flex-wrap gap-2">
            {['Politics', 'Bangladesh', 'Analysis'].map(tag => (
              <span 
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full hover:bg-gray-200 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/3 space-y-6">
          {/* Ad Card 1 */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
            <h3 className="font-bold text-lg text-blue-800 mb-2">Sponsored</h3>
            <div className="relative h-48 w-full rounded-lg overflow-hidden mb-3">
              <Image
                src="/placeholder-ad.jpg" // Replace with actual ad image
                alt="Advertisement"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-sm text-blue-700">Discover our premium services today!</p>
          </div>

          {/* Related Opinions */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-xl text-gray-900 mb-4 pb-2 border-b border-gray-200">
              আরও মতামত
            </h3>
            <div className="space-y-4">
              {relatedOpinions.map((item) => (
                <a 
                  key={item.id} 
                  href={`/opinions/${item.id}`}
                  className="block group"
                >
                  <div className="flex gap-3">
                    {item.imageUrl && (
                      <div className="flex-shrink-0 relative w-16 h-16 rounded overflow-hidden">
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(item.createdAt)}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Ad Card 2 */}
          <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-xl border border-green-100">
            <h3 className="font-bold text-lg text-green-800 mb-2">Special Offer</h3>
            <div className="relative h-48 w-full rounded-lg overflow-hidden mb-3">
              <Image
                src="/placeholder-ad2.jpg" // Replace with actual ad image
                alt="Advertisement"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-sm text-green-700">Limited time discount - Don't miss out!</p>
          </div>
        </div>
      </div>

      {/* More Opinions Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
          আরও পড়ুন মতামত
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedOpinions.slice(0, 3).map((item) => (
            <a 
              key={item.id} 
              href={`/opinions/${item.id}`}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {item.imageUrl && (
                <div className="relative h-48 w-full">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {item.author.name} · {formatDate(item.createdAt)}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}