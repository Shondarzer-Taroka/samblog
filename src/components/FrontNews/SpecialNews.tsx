// import React from 'react';

// const SpecialNews = () => {
//     return (
//         <div>

//         </div>
//     );
// };

// export default SpecialNews;












import React from 'react';
import NewsTabs from './NewsTabs';


const SpecialNews = () => {
    return (
        <section className='flex flex-col md:flex-row gap-4'>
            <div className="flex flex-col-reverse md:flex-row gap-6 bg-white p-6 rounded-lg shadow max-w-screen-xl mx-auto">
                {/* Left Content */}
                <div className="flex-1">
                    <h2 className="text-3xl md:text-4xl font-extrabold leading-snug text-gray-800">
                        বিশ্বে সবচেয়ে ক্ষমতাধর দেশের তালিকায় বাংলাদেশ ৪৭তম
                    </h2>
                    <p className="mt-3 text-gray-700 text-lg">
                        বিশ্বে সবচেয়ে ক্ষমতাধর দেশের তালিকায় ৪৭তম স্থানে রয়েছে বাংলাদেশ।
                        যুক্তরাষ্ট্রভিত্তিক সংবাদমাধ্যম ইউএস নিউজ এ তালিকা করেছে। এতে শীর্ষ পাঁচে রয়েছে যথাক্রমে ...
                    </p>
                    <p className="text-sm text-gray-500 mt-4 flex items-center gap-2">
                        <span>🕒</span> ০৮ এপ্রিল ২০২৫, ০৬:৪৯ পিএম
                    </p>
                </div>

                {/* Right Content */}
                <div className="flex-shrink-0 w-full md:w-[320px] relative">
                    <div className="w-full h-full relative">
                        <img
                            src="https://cdn.jugantor.com/assets/news_photos/2025/04/08/dr-yunus-67f51f95a19ac.jpg" // Replace with your image path
                            alt="Yunus"
                            className="rounded-md object-cover w-full"
                        />

                    </div>
                </div>

               

            </div>

            <div>
                <NewsTabs />
            </div>
          
        </section>
    );
};

export default SpecialNews;
