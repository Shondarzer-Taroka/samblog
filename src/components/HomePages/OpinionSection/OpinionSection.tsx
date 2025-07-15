/* eslint-disable @next/next/no-img-element */



// import TitleNewsOverSection from "@/share/TitleNewsOverSection";
// import React from "react";

// export default function OpinionSection() {
//   const opinions = [
//     {
//       title: "আওয়ামী সমর্থকেরা কাকে ভোট দেবে",
//       author: "সোহরাব হাসান",
//       role: "প্রথম আলো'র যুগ্ম-সম্পাদক ও কবি",
//       avatar: "https://randomuser.me/api/portraits/men/75.jpg",
//     },
//     {
//       title: "ইরান-ইসরায়েল যুদ্ধ চীন কেন দূরে বসে দেখছে",
//       author: "নাঈম গোপাল",
//       avatar: "https://randomuser.me/api/portraits/men/42.jpg",
//     },
//     {
//       title: "গণতান্ত্রিক রূপান্তরের সংকটে 'জনগণ' কীভাবে কথা বলবে",
//       author: "রেহানা আক্তার",
//       avatar: "https://randomuser.me/api/portraits/women/33.jpg",
//     },
//     {
//       title: "মামদানি'র জয় থেকে ডেমোক্র্যাটরা কি শিক্ষা নেবেন",
//       author: "বাণী সাত্তার",
//       avatar: "https://randomuser.me/api/portraits/women/68.jpg",
//     },
//   ];

//   return (
//     <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-6 px-2 md:px-4 font-noto">
//       {/* <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center relative pb-4">
//         <span className="relative z-10 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white py-2 rounded-lg shadow-lg">
//           মতামত বিভাগ
//         </span>
//         <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 w-24 bg-yellow-400 rounded-full"></span>
//       </h2> */}

//       <div className="mb-8">
//         <TitleNewsOverSection headline="মতামত বিভাগ"/>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Highlighted Opinion Card */}
//         <div className="relative group">
//           <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
//           <div className="relative bg-white p-6 rounded-xl shadow-xl border border-gray-100 h-full flex flex-col">
//             <div className="flex items-center mb-4">
//               <span className="bg-blue-800 text-white px-3 py-1 rounded-full text-sm font-bold mr-2">
//                 বিশেষ মতামত
//               </span>
//               <span className="bg-yellow-400 text-gray-800 px-3 py-1 rounded-full text-sm font-bold">
//                 এসএসসির ফলাফল
//               </span>
//             </div>
//             <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight">
//               এসএসসির ফলাফল যেন আত্মহত্যার কারণ না হয়
//             </h3>
//             <p className="text-gray-600 mb-4 flex-grow">
//               আত্মহত্যার পেছনে নানা কারণ রয়েছে—মানসিক অবসাদ, সামাজিক বিচ্ছিন্নতা, বুলিং, বৈষম্য ও
//               বিশেষভাবে উল্লেখযোগ্য একটি কারণ হলো পাবলিক পরীক্ষায় কাঙ্ক্ষিত ফল না পাওয়া।
//             </p>
//             <div className="flex items-center mt-auto">
//               <div className="w-10 h-10 rounded-full overflow-hidden mr-3 border-2 border-blue-200">
//                 <img
//                   src="https://randomuser.me/api/portraits/men/32.jpg"
//                   alt="author"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div>
//                 <p className="text-sm font-semibold text-gray-700">ড. রফিকুল ইসলাম</p>
//                 <p className="text-xs text-gray-500">মনোবিজ্ঞানী ও শিক্ষাবিদ</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Other Opinions */}
//         <div className="space-y-6">
//           {opinions.map((item, idx) => (
//             <div
//               key={idx}
//               className="group relative bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-blue-500 hover:border-yellow-400 flex items-start"
//             >
//               <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full group-hover:bg-yellow-400 transition-colors"></div>

//               <div className="flex-shrink-0 mr-4 relative">
//                 <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md">
//                   {item.avatar ? (
//                     <img
//                       src={item.avatar}
//                       alt="avatar"
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-600">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                       </svg>
//                     </div>
//                   )}
//                 </div>
//                 <div className="absolute -bottom-1 -right-1 bg-yellow-400 rounded-full w-5 h-5 flex items-center justify-center">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//               </div>

//               <div className="flex-grow">
//                 <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">
//                   {item.title}
//                 </h3>
//                 {item.author && (
//                   <div className="flex items-center text-sm text-gray-600">
//                     <span className="font-medium mr-1">{item.author}</span>
//                     {item.role && <span className="text-xs text-gray-500 before:content-['•'] before:mx-1">{item.role}</span>}
//                   </div>
//                 )}
//                 <div className="mt-2 flex items-center text-xs text-gray-400">
//                   <span className="mr-2">5 মিনিট আগে</span>
//                   <span className="flex items-center">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
//                     </svg>
//                     ১২৪
//                   </span>
//                 </div>
//               </div>

//               <button className="text-blue-500 hover:text-blue-700 ml-2 transition-colors">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
//                 </svg>
//               </button>
//             </div>
//           ))}

//           <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg font-bold shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center">
//             আরও মতামত দেখুন
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }













/* eslint-disable @next/next/no-img-element */
import TitleNewsOverSection from "@/share/TitleNewsOverSection";
import { NewsItem } from "@/types/news.types";
import { getBengaliTimeAgo } from "@/utils/getBengaliTimeAgo";
import { stripHtmlAndLimit } from "@/utils/stripAndLimitHtml";
import Image from "next/image";
import React from "react";

export default function OpinionSection({ data }: { data: NewsItem[] }) {
  // const opinions = [
  //   {
  //     title: "আওয়ামী সমর্থকেরা কাকে ভোট দেবে",
  //     author: "সোহরাব হাসান",
  //     role: "প্রথম আলো'র যুগ্ম-সম্পাদক ও কবি",
  //     avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  //   },
  //   {
  //     title: "ইরান-ইসরায়েল যুদ্ধ চীন কেন দূরে বসে দেখছে",
  //     author: "নাঈম গোপাল",
  //     avatar: "https://randomuser.me/api/portraits/men/42.jpg",
  //   },
  //   {
  //     title: "গণতান্ত্রিক রূপান্তরের সংকটে 'জনগণ' কীভাবে কথা বলবে",
  //     author: "রেহানা আক্তার",
  //     avatar: "https://randomuser.me/api/portraits/women/33.jpg",
  //   },
  //   {
  //     title: "মামদানি'র জয় থেকে ডেমোক্র্যাটরা কি শিক্ষা নেবেন",
  //     author: "বাণী সাত্তার",
  //     avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  //   },
  // ];

  const opinions = data || []
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-6 px-2 md:px-4 font-noto">
      {/* <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center relative pb-4">
        <span className="relative z-10 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white py-2 rounded-lg shadow-lg">
          মতামত বিভাগ
        </span>
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 w-24 bg-yellow-400 rounded-full"></span>
      </h2> */}

      <div className="mb-8">
        <TitleNewsOverSection headline="মতামত বিভাগ" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Highlighted Opinion Card */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
          <div className="relative bg-white p-6 rounded-xl shadow-xl border border-gray-100 h-full flex flex-col">
            <div className="flex items-center mb-4">
              <span className="bg-blue-800 text-white px-3 py-1 rounded-full text-sm font-bold mr-2">
                বিশেষ মতামত
              </span>
              <span className="bg-yellow-400 text-gray-800 px-3 py-1 rounded-full text-sm font-bold">
                {/* এসএসসির ফলাফল */}
                {opinions[0].keywords[0]}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight">
              { }
              {/* এসএসসির ফলাফল যেন আত্মহত্যার কারণ না হয় */}
            </h3>
            <p className="text-gray-600 mb-4 flex-grow">
              {/* আত্মহত্যার পেছনে নানা কারণ রয়েছে—মানসিক অবসাদ, সামাজিক বিচ্ছিন্নতা, বুলিং, বৈষম্য ও
              বিশেষভাবে উল্লেখযোগ্য একটি কারণ হলো পাবলিক পরীক্ষায় কাঙ্ক্ষিত ফল না পাওয়া। */}
              {stripHtmlAndLimit(opinions[0].content, 20).short}
            </p>
            <div className="flex items-center mt-auto">
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3 border-2 border-blue-200">
                <Image
                  width={40}
                  height={40}
                  src={opinions[0].author.image || "https://randomuser.me/api/portraits/men/32.jpg"}
                  // src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="author"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700">ড. রফিকুল ইসলাম</p>
                <p className="text-xs text-gray-500">মনোবিজ্ঞানী ও শিক্ষাবিদ</p>
              </div>
            </div>
          </div>
        </div>

        {/* Other Opinions */}
        <div className="space-y-6">
          {opinions.map((item, idx) => (
            <div
              key={idx}
              className="group relative bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-blue-500 hover:border-yellow-400 flex items-start"
            >
              <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full group-hover:bg-yellow-400 transition-colors"></div>

              <div className="flex-shrink-0 mr-4 relative">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md">
                  {item.imageUrl ? (
                    <img
                      src={item?.author?.image || 'https://randomuser.me/api/portraits/men/42.jpg'}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 bg-yellow-400 rounded-full w-5 h-5 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              <div className="flex-grow">
                <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                {item.author && (
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium mr-1">{item.author.name}</span>
                    {item.author.email && <span className="text-xs text-gray-500 before:content-['•'] before:mx-1">{item.role}</span>}
                  </div>
                )}
                <div className="mt-2 flex items-center text-xs text-gray-400">
                  <span className="mr-2">{getBengaliTimeAgo(item.createdAt)}</span>
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    ১২৪
                  </span>
                </div>
              </div>

              <button className="text-blue-500 hover:text-blue-700 ml-2 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}

          <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg font-bold shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center">
            আরও মতামত দেখুন
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}