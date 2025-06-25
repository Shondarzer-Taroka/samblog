
import { NewsItem } from '@/types/news.types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaDownload, FaFacebookF, FaTwitter, FaLink, FaEnvelope } from 'react-icons/fa';

const InternationalNewsSection = ({ data }: { data: NewsItem[] }) => {
  // const newsItems = [
  //     {
  //         id: 6,
  //         img: 'https://cdn.jugantor.com/assets/news_photos/2025/04/10/medium/US-Saudi-67f78bd36ffd7.jpg',
  //         title: 'গাজায় যুদ্ধবিরতি নিয়ে যুক্তরাষ্ট্র-সৌদির শীর্ষ দুই কূটনীতিকের বৈঠক',
  //         category: 'international'
  //     },
  //     {
  //         id: 5,
  //         img: 'https://cdn.jugantor.com/assets/news_photos/2025/04/10/medium/US-Saudi-67f78bd36ffd7.jpg',
  //         title: 'মার্কিন সরকারের সঙ্গে বাণিজ্য আলোচনা হয়নি: সুইস অর্থমন্ত্রী',
  //         category: 'international'
  //     },
  //     {
  //         id: 4,
  //         img: 'https://cdn.jugantor.com/assets/news_photos/2025/04/10/medium/US-Saudi-67f78bd36ffd7.jpg',
  //         title: 'পারমাণবিক প্রযুক্তির নতুন সাফল্য উদযাপন ইরানের',
  //         category: 'national'
  //     },
  //     {
  //         id: 3,
  //         img: 'https://cdn.jugantor.com/assets/news_photos/2025/04/10/medium/US-Saudi-67f78bd36ffd7.jpg',
  //         title: 'ইরানের সঙ্গে সম্পর্ক নিয়ে নিজ দলের মধ্যেই বিক্ষোভ!',
  //         category: 'country-news'
  //     },
  //     {
  //         id: 2,
  //         img: 'https://cdn.jugantor.com/assets/news_photos/2025/04/10/medium/US-Saudi-67f78bd36ffd7.jpg',
  //         title: 'নেতানিয়াহুর বিমানে আকাশসীما ব্যবহারের অনুমতি নিয়ে আলোচনার মুখে ফ্রান্স',
  //         category: 'international'
  //     },
  //     {
  //         id: 1,
  //         img: 'https://cdn.jugantor.com/assets/news_photos/2025/04/10/medium/US-Saudi-67f78bd36ffd7.jpg',
  //         title: 'বেলুচিস্তান সংকটে নেতৃত্ব দিতে নওয়াজ শরীফকে আহ্বান',
  //         category: 'international'
  //     },

  // ];

  const newsItems = data
  return (
    <section className=" grid grid-cols-1 lg:grid-cols-[70%_30%] gap-4 xl:gap-8 py-6 px-2 mt-24">
      {/* International News */}
      <div>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">
          <span className="text-red-600 mr-2">■</span>আন্তর্জাতিক
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {newsItems.map((item, i) => (
            <Link href={`/news/${item.category}/${item.id}`} key={i}>
              <div className="space-y-2">
                <Image src={item.imageUrl || ''} width={150} height={200} alt={item.title} className="rounded md:h-[160px] w-full" />
                <h3 className="text-sm font-semibold leading-snug hover:text-red-600 cursor-pointer">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Online Vote */}
      <div className='w-full'>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4 flex items-center justify-between">
          <span>
            <span className="text-red-600 mr-2">■</span>অনলাইন ভোট
          </span>
          <span className="text-xl cursor-pointer text-gray-600 hover:text-red-600">
            <FaDownload />
          </span>
        </h2>

        <div className="border w-full p-4 rounded space-y-3 text-sm bg-white">
          <p className="text-gray-500">১০ এপ্রিল ২০২৫</p>

          <p>
            অর্থনীতিবিদ হোসেন সোহেল বলেন, মার্কিন প্রেসিডেন্ট ডোনাল্ড ট্রাম্প হেয়ারে বাণিজ্য
            ঘাটতি কমাতে চাচ্ছেন, সেভাবে ঘাটতি কমানো সম্ভব নয়। আপনি কি তাই মনে করেন?
          </p>

          {/* Voting Options */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2">
                <input type="radio" name="vote" className="accent-red-600" />
                হ্যাঁ ভোট
              </label>
              <span className="font-semibold">৯১%</span>
            </div>
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2">
                <input type="radio" name="vote" className="accent-red-600" />
                না ভোট
              </label>
              <span className="font-semibold">৮%</span>
            </div>
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2">
                <input type="radio" name="vote" className="accent-red-600" />
                মন্তব্য নেই
              </label>
              <span className="font-semibold">১%</span>
            </div>
          </div>

          <p className="text-gray-500 mt-2">মোট ভোটদাতা: ১৪৮৪ জন</p>

          {/* Share Icons */}
          <div className="flex items-center gap-4 pt-3 border-t text-lg text-gray-600">
            <span className="text-sm">3 Shares</span>
            <FaLink className="cursor-pointer hover:text-red-600" title="Copy link" />
            <FaFacebookF className="cursor-pointer hover:text-blue-600" title="Share on Facebook" />
            <FaTwitter className="cursor-pointer hover:text-sky-500" title="Share on Twitter" />
            <FaEnvelope className="cursor-pointer hover:text-green-600" title="Share by Email" />
          </div>
        </div>
      </div>

    </section>
  );
};

export default InternationalNewsSection;

