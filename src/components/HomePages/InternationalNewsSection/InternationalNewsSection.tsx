
// import { NewsItem } from '@/types/news.types';
// import Image from 'next/image';
// import Link from 'next/link';
// import React from 'react';
// import { FaDownload, FaFacebookF, FaTwitter, FaLink, FaEnvelope } from 'react-icons/fa';

// const InternationalNewsSection = ({ data }: { data: NewsItem[] }) => {
 
//   const newsItems = data
//   return (
//     <section className=" grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-4 xl:gap-8 py-6 px-2 mt-24">
//       {/* International News */}
//       <div>
//         <h2 className="text-xl font-semibold border-b pb-2 mb-4">
//           <span className="text-red-600 mr-2">■</span>আন্তর্জাতিক
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {newsItems.map((item, i) => (
//             <Link href={`/news/${item.category}/${item.id}`} key={i}>
//               <div className="space-y-2">
//                 <Image src={item.imageUrl || ''} width={150} height={200} alt={item.title} className="rounded md:h-[160px] w-full" />
//                 <h3 className="text-sm font-semibold leading-snug hover:text-red-600 cursor-pointer">
//                   {item.title}
//                 </h3>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>

//       {/* Online Vote */}
//       <div className='w-full'>
//         <h2 className="text-xl font-semibold border-b pb-2 mb-4 flex items-center justify-between">
//           <span>
//             <span className="text-red-600 mr-2">■</span>অনলাইন ভোট
//           </span>
//           <span className="text-xl cursor-pointer text-gray-600 hover:text-red-600">
//             <FaDownload />
//           </span>
//         </h2>

//         <div className="border w-full p-4 rounded space-y-3 text-sm bg-white">
//           <p className="text-gray-500">১০ এপ্রিল ২০২৫</p>

//           <p>
//             অর্থনীতিবিদ হোসেন সোহেল বলেন, মার্কিন প্রেসিডেন্ট ডোনাল্ড ট্রাম্প হেয়ারে বাণিজ্য
//             ঘাটতি কমাতে চাচ্ছেন, সেভাবে ঘাটতি কমানো সম্ভব নয়। আপনি কি তাই মনে করেন?
//           </p>

//           {/* Voting Options */}
//           <div className="space-y-2">
//             <div className="flex justify-between items-center">
//               <label className="flex items-center gap-2">
//                 <input type="radio" name="vote" className="accent-red-600" />
//                 হ্যাঁ ভোট
//               </label>
//               <span className="font-semibold">৯১%</span>
//             </div>
//             <div className="flex justify-between items-center">
//               <label className="flex items-center gap-2">
//                 <input type="radio" name="vote" className="accent-red-600" />
//                 না ভোট
//               </label>
//               <span className="font-semibold">৮%</span>
//             </div>
//             <div className="flex justify-between items-center">
//               <label className="flex items-center gap-2">
//                 <input type="radio" name="vote" className="accent-red-600" />
//                 মন্তব্য নেই
//               </label>
//               <span className="font-semibold">১%</span>
//             </div>
//           </div>

//           <p className="text-gray-500 mt-2">মোট ভোটদাতা: ১৪৮৪ জন</p>

//           {/* Share Icons */}
//           <div className="flex items-center gap-4 pt-3 border-t text-lg text-gray-600">
//             <span className="text-sm">3 Shares</span>
//             <FaLink className="cursor-pointer hover:text-red-600" title="Copy link" />
//             <FaFacebookF className="cursor-pointer hover:text-blue-600" title="Share on Facebook" />
//             <FaTwitter className="cursor-pointer hover:text-sky-500" title="Share on Twitter" />
//             <FaEnvelope className="cursor-pointer hover:text-green-600" title="Share by Email" />
//           </div>
//         </div>
//       </div>

//     </section>
//   );
// };

// export default InternationalNewsSection;










import { NewsItem } from '@/types/news.types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaDownload, FaFacebookF, FaTwitter, FaLink, FaEnvelope, FaShareAlt, FaRegThumbsUp, FaRegThumbsDown, FaRegCommentAlt } from 'react-icons/fa';

const InternationalNewsSection = ({ data }: { data: NewsItem[] }) => {
  const newsItems = data;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-6 xl:gap-8">
        {/* International News */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 relative pl-4">
              <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-6 bg-red-600 rounded-full"></span>
              আন্তর্জাতিক
            </h2>
            <Link href="/international" className="text-sm font-medium text-red-600 hover:text-red-800 flex items-center">
              সব দেখুন
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow">
            {newsItems.map((item, i) => (
              <Link href={`/news/${item.category}/${item.id}`} key={i}>
                <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <Image 
                      src={item.imageUrl || '/default-news.jpg'} 
                      alt={item.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                      আন্তর্জাতিক
                    </div>
                  </div>
                  <div className="p-4 flex-grow flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-red-600 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <div className="mt-auto">
                      <div className="flex items-center text-xs text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {new Date(item.createdAt).toLocaleDateString('bn-BD')}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Online Vote - Improved spacing and user experience */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 relative pl-4">
              <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-6 bg-blue-600 rounded-full"></span>
              অনলাইন ভোট
            </h2>
            <button className="text-gray-600 hover:text-blue-600 transition-colors">
              <FaDownload className="text-lg" />
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex-grow flex flex-col">
            <div className="p-5 flex-grow">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {new Date().toLocaleDateString('bn-BD')}
                </span>
                <div className="flex items-center text-xs text-gray-500">
                  <FaShareAlt className="mr-1" />
                  <span>3 Shares</span>
                </div>
              </div>

              <p className="text-gray-700 mb-5 leading-relaxed">
                অর্থনীতিবিদ হোসেন সোহেল বলেন, মার্কিন প্রেসিডেন্ট ডোনাল্ড ট্রাম্প হেয়ারে বাণিজ্য
                ঘাটতি কমাতে চাচ্ছেন, সেভাবে ঘাটতি কমানো সম্ভব নয়। আপনি কি তাই মনে করেন?
              </p>

              {/* Voting Options with Icons */}
              <div className="space-y-4 mb-6">
                {[
                  { label: "হ্যাঁ ভোট", percentage: 91, icon: <FaRegThumbsUp className="text-green-500" /> },
                  { label: "না ভোট", percentage: 8, icon: <FaRegThumbsDown className="text-red-500" /> },
                  { label: "মন্তব্য নেই", percentage: 1, icon: <FaRegCommentAlt className="text-blue-500" /> }
                ].map((option, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{option.icon}</span>
                          <input 
                            type="radio" 
                            name="vote" 
                            className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                          />
                          <span className="text-gray-700">{option.label}</span>
                        </div>
                      </label>
                      <span className="font-semibold text-gray-700">{option.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          index === 0 ? 'bg-green-500' : 
                          index === 1 ? 'bg-red-500' : 'bg-blue-500'
                        }`} 
                        style={{ width: `${option.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Voting Stats and Button */}
              <div className="bg-gray-50 p-3 rounded-lg mb-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">মোট ভোটদাতা:</span> ১৪৮৪ জন
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center shadow-sm">
                    ভোট দিন
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Share Icons - More compact design */}
            <div className="bg-gray-50 px-5 py-3 border-t">
              <h4 className="text-sm font-medium text-gray-600 mb-3">এই পোল শেয়ার করুন:</h4>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition-colors shadow-sm">
                    <FaFacebookF />
                  </button>
                  <button className="w-9 h-9 rounded-full bg-sky-100 text-sky-500 flex items-center justify-center hover:bg-sky-200 transition-colors shadow-sm">
                    <FaTwitter />
                  </button>
                  <button className="w-9 h-9 rounded-full bg-green-100 text-green-600 flex items-center justify-center hover:bg-green-200 transition-colors shadow-sm">
                    <FaEnvelope />
                  </button>
                </div>
                <button className="w-9 h-9 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center hover:bg-gray-300 transition-colors shadow-sm">
                  <FaLink />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InternationalNewsSection;