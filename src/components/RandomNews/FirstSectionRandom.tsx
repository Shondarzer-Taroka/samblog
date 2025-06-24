
import Image from 'next/image';
import React from 'react';

const FirstSectionRandom = () => {
    const randomNews=[
        {
            title:'বাংলাদেশ ৪৭তম',
            date: '৮ এপ্রিল ২০২৫, ০৬:৪৯ পিএম',
            image:'https://media.prothomalo.com/prothomalo-bangla%2F2025-04-09%2F4tewt7yk%2Firan-us.webp?rect=57%2C0%2C864%2C576&w=622&auto=format%2Ccompress&fmt=avif'
        },
        {
            title:'বাংলাদেশ ৪৭তম',
            date: '৮ এপ্রিল ২০২৫, ০৬:৪৯ পিএম',
            image:'https://media.prothomalo.com/prothomalo-bangla%2F2025-04-09%2F4tewt7yk%2Firan-us.webp?rect=57%2C0%2C864%2C576&w=622&auto=format%2Ccompress&fmt=avif'
        },
        {
            title:'বাংলাদেশ ৪৭তম',
            date: '৮ এপ্রিল ২০২৫, ০৬:৪৯ পিএম',
            image:'https://media.prothomalo.com/prothomalo-bangla%2F2025-04-09%2F4tewt7yk%2Firan-us.webp?rect=57%2C0%2C864%2C576&w=622&auto=format%2Ccompress&fmt=avif'
        },
        {
            title:'বাংলাদেশ ৪৭তম',
            date: '৮ এপ্রিল ২০২৫, ০৬:৪৯ পিএম',
            image:'https://media.prothomalo.com/prothomalo-bangla%2F2025-04-09%2F4tewt7yk%2Firan-us.webp?rect=57%2C0%2C864%2C576&w=622&auto=format%2Ccompress&fmt=avif'
        },
     

    ]
  return (
    <section className=" grid grid-cols-1 xl:grid-cols-2">
      {/* First Aside - Image with text wrapping */}
      <aside className="mb-6 w-full lg:w-[600px] h-[460px]">
        <div className="text-gray-800 text-[17px] leading-relaxed w-full h-full overflow-hidden">
          {/* Title & Date */}
          <h2 className="text-2xl font-bold mb-1">বাংলাদেশ ৪৭তম</h2>
          <p className="text-sm text-gray-500 mb-4">৮ এপ্রিল ২০২৫, ০৬:৪৯ পিএম</p>

          {/* Floating Image */}
          <Image
          width={400}
          height={300}
            src="https://media.prothomalo.com/prothomalo-bangla%2F2025-04-09%2F4tewt7yk%2Firan-us.webp?rect=57%2C0%2C864%2C576&w=622&auto=format%2Ccompress&fmt=avif"
            alt="News"
            className="float-left w-[400px] h-auto mr-4 mb-2 rounded"
          />

          {/* Paragraph */}
          <p>
            বিশ্বে সবচেয়ে ক্ষমতাধর দেশের তালিকায় ৪৭তম স্থানে রয়েছে বাংলাদেশ। যুক্তরাষ্ট্রভিত্তিক
            সংবাদমাধ্যম ইউএস নিউজ এ তালিকা করেছে। এতে শীর্ষ পাঁচে রয়েছে যথাক্রমে যুক্তরাষ্ট্র,
            রাশিয়া, চীন, জার্মানি এবং যুক্তরাজ্য। বাংলাদেশ দক্ষিণ এশিয়ার অন্যতম গুরুত্বপূর্ণ দেশ
            হিসেবে বিবেচিত হচ্ছে। প্রতিবেদনে বাংলাদেশের অর্থনৈতিক অগ্রগতি, জনসংখ্যা এবং আঞ্চলিক
            প্রভাবের উল্লেখ করা হয়েছে। Sed dapibus pulvinar nibh tempor porta. Cras ac leo purus.
            Mauris quis diam velit.
            বিশ্বে সবচেয়ে ক্ষমতাধর দেশের তালিকায় ৪৭তম স্থানে রয়েছে বাংলাদেশ। যুক্তরাষ্ট্রভিত্তিক
            সংবাদমাধ্যম ইউএস নিউজ এ তালিকা করেছে। এতে শীর্ষ পাঁচে রয়েছে যথাক্রমে যুক্তরাষ্ট্র,
            রাশিয়া, চীন, জার্মানি এবং যুক্তরাজ্য। বাংলাদেশ দক্ষিণ এশিয়ার অন্যতম গুরুত্বপূর্ণ দেশ
            হিসেবে বিবেচিত হচ্ছে। প্রতিবেদনে বাংলাদেশের অর্থনৈতিক অগ্রগতি, জনসংখ্যা এবং আঞ্চলিক
            প্রভাবের উল্লেখ করা হয়েছে। Sed dapibus pulvinar nibh tempor porta. Cras ac leo purus.
            Mauris quis diam velit.
            বিশ্বে সবচেয়ে ক্ষমতাধর দেশের তালিকায় ৪৭তম স্থানে রয়েছে বাংলাদেশ। যুক্তরাষ্ট্রভিত্তিক
            সংবাদমাধ্যম ইউএস নিউজ এ তালিকা করেছে। এতে শীর্ষ পাঁচে রয়েছে যথাক্রমে যুক্তরাষ্ট্র,
            রাশিয়া, চীন, জার্মানি এবং যুক্তরাজ্য। বাংলাদেশ দক্ষিণ এশিয়ার অন্যতম গুরুত্বপূর্ণ দেশ
            হিসেবে বিবেচিত হচ্ছে। প্রতিবেদনে বাংলাদেশের অর্থনৈতিক অগ্রগতি, জনসংখ্যা এবং আঞ্চলিক
            প্রভাবের উল্লেখ করা হয়েছে। Sed dapibus pulvinar nibh tempor porta. Cras ac leo purus.
            Mauris quis diam velit.
            বিশ্বে সবচেয়ে ক্ষমতাধর দেশের তালিকায় ৪৭তম স্থানে রয়েছে বাংলাদেশ। যুক্তরাষ্ট্রভিত্তিক
            সংবাদমাধ্যম ইউএস নিউজ এ তালিকা করেছে। এতে শীর্ষ পাঁচে রয়েছে যথাক্রমে যুক্তরাষ্ট্র,
            রাশিয়া, চীন, জার্মানি এবং যুক্তরাজ্য। বাংলাদেশ দক্ষিণ এশিয়ার অন্যতম গুরুত্বপূর্ণ দেশ
            হিসেবে বিবেচিত হচ্ছে। প্রতিবেদনে বাংলাদেশের অর্থনৈতিক অগ্রগতি, জনসংখ্যা এবং আঞ্চলিক
            প্রভাবের উল্লেখ করা হয়েছে। Sed dapibus pulvinar nibh tempor porta. Cras ac leo purus.
            Mauris quis diam velit.
            বিশ্বে সবচেয়ে ক্ষমতাধর দেশের তালিকায় ৪৭তম স্থানে রয়েছে বাংলাদেশ। যুক্তরাষ্ট্রভিত্তিক
            সংবাদমাধ্যম ইউএস নিউজ এ তালিকা করেছে। এতে শীর্ষ পাঁচে রয়েছে যথাক্রমে যুক্তরাষ্ট্র,
            রাশিয়া, চীন, জার্মানি এবং যুক্তরাজ্য। বাংলাদেশ দক্ষিণ এশিয়ার অন্যতম গুরুত্বপূর্ণ দেশ
            হিসেবে বিবেচিত হচ্ছে। প্রতিবেদনে বাংলাদেশের অর্থনৈতিক অগ্রগতি, জনসংখ্যা এবং আঞ্চলিক
            প্রভাবের উল্লেখ করা হয়েছে। Sed dapibus pulvinar nibh tempor porta. Cras ac leo purus.
            Mauris quis diam velit.

          </p>
        </div>
        <div className="clear-both"></div>
      </aside>

      {/* Second Aside - 4 Cards */}
      <aside className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {randomNews.map((item, index) => (
            <div key={index+987} className='h-[225px]'> 
             <div className="text-gray-800 text-[17px] leading-relaxed w-full h-full overflow-hidden">
             {/* Title & Date */}
           <div className='leading-3 mb-1.5'>
           <h2 className="text-[15px] font-bold">{item.title}</h2>
           <p className="text-[12px] text-gray-500">{item.date}</p>
           </div>
   
             {/* Floating Image */}
             <Image
             width={400}
             height={300}
               src={item.image}
               alt="News"
               className="float-left w-[160px] h-auto mr-2 rounded"
             />
   
             {/* Paragraph */}
             <p className='text-[15px]'>
               বিশ্বে সবচেয়ে ক্ষমতাধর দেশের তালিকায় ৪৭তম স্থানে রয়েছে বাংলাদেশ। যুক্তরাষ্ট্রভিত্তিক
               সংবাদমাধ্যম ইউএস নিউজ এ তালিকা করেছে। এতে শীর্ষ পাঁচে রয়েছে যথাক্রমে যুক্তরাষ্ট্র,
               রাশিয়া, চীন, জার্মানি এবং যুক্তরাজ্য। বাংলাদেশ দক্ষিণ এশিয়ার অন্যতম গুরুত্বপূর্ণ দেশ
               হিসেবে বিবেচিত হচ্ছে। প্রতিবেদনে বাংলাদেশের অর্থনৈতিক অগ্রগতি, জনসংখ্যা এবং আঞ্চলিক
               প্রভাবের উল্লেখ করা হয়েছে। Sed dapibus pulvinar nibh tempor porta. Cras ac leo purus.
               Mauris quis diam velit.
               বিশ্বে সবচেয়ে ক্ষমতাধর দেশের তালিকায় ৪৭তম স্থানে রয়েছে বাংলাদেশ। যুক্তরাষ্ট্রভিত্তিক
               সংবাদমাধ্যম ইউএস নিউজ এ তালিকা করেছে। এতে শীর্ষ পাঁচে রয়েছে যথাক্রমে যুক্তরাষ্ট্র,
               রাশিয়া, চীন, জার্মানি এবং যুক্তরাজ্য। বাংলাদেশ দক্ষিণ এশিয়ার অন্যতম গুরুত্বপূর্ণ দেশ
               হিসেবে বিবেচিত হচ্ছে। প্রতিবেদনে বাংলাদেশের অর্থনৈতিক অগ্রগতি, জনসংখ্যা এবং আঞ্চলিক
               প্রভাবের উল্লেখ করা হয়েছে। Sed dapibus pulvinar nibh tempor porta. Cras ac leo purus.
               Mauris quis diam velit.
               বিশ্বে সবচেয়ে ক্ষমতাধর দেশের তালিকায় ৪৭তম স্থানে রয়েছে বাংলাদেশ। যুক্তরাষ্ট্রভিত্তিক
               সংবাদমাধ্যম ইউএস নিউজ এ তালিকা করেছে। এতে শীর্ষ পাঁচে রয়েছে যথাক্রমে যুক্তরাষ্ট্র,
               রাশিয়া, চীন, জার্মানি এবং যুক্তরাজ্য। বাংলাদেশ দক্ষিণ এশিয়ার অন্যতম গুরুত্বপূর্ণ দেশ
               হিসেবে বিবেচিত হচ্ছে। প্রতিবেদনে বাংলাদেশের অর্থনৈতিক অগ্রগতি, জনসংখ্যা এবং আঞ্চলিক
               প্রভাবের উল্লেখ করা হয়েছে। Sed dapibus pulvinar nibh tempor porta. Cras ac leo purus.
               Mauris quis diam velit.
               বিশ্বে সবচেয়ে ক্ষমতাধর দেশের তালিকায় ৪৭তম স্থানে রয়েছে বাংলাদেশ। যুক্তরাষ্ট্রভিত্তিক
               সংবাদমাধ্যম ইউএস নিউজ এ তালিকা করেছে। এতে শীর্ষ পাঁচে রয়েছে যথাক্রমে যুক্তরাষ্ট্র,
               রাশিয়া, চীন, জার্মানি এবং যুক্তরাজ্য। বাংলাদেশ দক্ষিণ এশিয়ার অন্যতম গুরুত্বপূর্ণ দেশ
               হিসেবে বিবেচিত হচ্ছে। প্রতিবেদনে বাংলাদেশের অর্থনৈতিক অগ্রগতি, জনসংখ্যা এবং আঞ্চলিক
               প্রভাবের উল্লেখ করা হয়েছে। Sed dapibus pulvinar nibh tempor porta. Cras ac leo purus.
               Mauris quis diam velit.
               বিশ্বে সবচেয়ে ক্ষমতাধর দেশের তালিকায় ৪৭তম স্থানে রয়েছে বাংলাদেশ। যুক্তরাষ্ট্রভিত্তিক
               সংবাদমাধ্যম ইউএস নিউজ এ তালিকা করেছে। এতে শীর্ষ পাঁচে রয়েছে যথাক্রমে যুক্তরাষ্ট্র,
               রাশিয়া, চীন, জার্মানি এবং যুক্তরাজ্য। বাংলাদেশ দক্ষিণ এশিয়ার অন্যতম গুরুত্বপূর্ণ দেশ
               হিসেবে বিবেচিত হচ্ছে। প্রতিবেদনে বাংলাদেশের অর্থনৈতিক অগ্রগতি, জনসংখ্যা এবং আঞ্চলিক
               প্রভাবের উল্লেখ করা হয়েছে। Sed dapibus pulvinar nibh tempor porta. Cras ac leo purus.
               Mauris quis diam velit.
   
             </p>
           </div>
           <div className="clear-both"></div>
           </div>
        ))}
      </aside>
    </section>
  );
};

export default FirstSectionRandom;
