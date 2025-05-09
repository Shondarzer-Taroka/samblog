
import React from 'react';

const PoliticsSection = () => {
    return (
        <section className="w-[960px] mx-auto grid grid-cols-[512px_1fr] gap-6 py-6">
            {/* Left (Featured News) */}
            <div className="border-b pb-4">
                <h2 className="text-lg font-semibold text-red-600 mb-2">রাজনীতি</h2>
                <div className="relative">
                    {/* Background Image */}
                    <img
                        src="https://images.prothomalo.com/prothomalo-bangla%2F2024-09%2F1f24c38a-1f21-4ce6-9bd5-0c85a4b3896f%2FIMG_6761.jpeg"
                        alt="main"
                        className="w-full h-[250px] object-cover rounded"
                    />
                    {/* Overlay Logo */}
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/6/6d/Placeholder_logo.png"
                        alt="logo"
                        className="absolute top-4 left-4 w-28 bg-white p-1 rounded shadow"
                    />
                    {/* Overlay Image */}
                    <img
                        src="https://media.prothomalo.com/prothomalo-bangla%2F2025-01-29%2Fovetyxbt%2FAhasan-H-mansur-16.jpg?rect=503%2C0%2C3340%2C3340&w=180&auto=format%2Ccompress&fmt=avif"
                        alt="person"
                        className="absolute bottom-0 right-0 w-24 h-28 object-cover rounded-tl-xl"
                    />
                </div>
                <h3 className="text-xl font-bold mt-4">
                    জাতীয় নিরাপত্তা উপদেষ্টার নিয়োগ বাতিলের দাবি জাতীয় বিপ্লবী পরিষদের
                </h3>
                <p className="text-gray-600 text-sm mt-2">
                    অভ্যন্তরীণ সরকারের প্রধান উপদেষ্টা রোহিঙ্গাবিষয়ক ফান্ড রিক্রুটমেন্টে
                    খলিলুর রহমানকে জাতীয় নিরাপত্তা উপদেষ্টা পদে নিয়োগের বিরোধিতা করেছে জাতীয় বিপ্লবী পরিষদ।...
                </p>
            </div>

            {/* Right (Small News Cards) */}
            <div className="flex flex-col gap-4">
                {/* News item */}
                <div className="flex gap-4 items-start">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Political_Party_Logos_Bangladesh.svg/512px-Political_Party_Logos_Bangladesh.svg.png"
                        alt="party"
                        className="w-28 h-20 object-cover rounded"
                    />
                    <h4 className="text-md font-semibold leading-snug hover:text-red-600 cursor-pointer">
                        সংস্কার নিয়ে কোন দল কী চায়, কী চায় না? কোথায় আপত্তি?
                    </h4>
                </div>

                {/* News item */}
                <div className="flex gap-4 items-start">
                    <img
                        src="https://media.prothomalo.com/prothomalo-bangla%2F2025-04-09%2Fp812kgyj%2FPratex-players-MOHOR-Sk-reacts-after-taking-wicket-1.jpg?rect=927%2C0%2C3657%2C3657&w=180&auto=format%2Ccompress&fmt=avif"
                        alt="news"
                        className="w-28 h-20 object-cover rounded"
                    />
                    <h4 className="text-md font-semibold leading-snug hover:text-red-600 cursor-pointer">
                        নির্বাচনের আগে সংস্কার খুবই গুরুত্বপূর্ণ: চরমোনাই পীর
                    </h4>
                </div>

                {/* News item */}
                <div className="flex gap-4 items-start">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Placeholder_logo.png/480px-Placeholder_logo.png"
                        alt="mahmud"
                        className="w-28 h-20 object-cover rounded"
                    />
                    <h4 className="text-md font-semibold leading-snug hover:text-red-600 cursor-pointer">
                        সাক্ষাৎকার ড. মাহদি আমিন: সংস্কারের প্রধান প্রস্তাবক ও ধারক বিএনপি
                    </h4>
                </div>
            </div>
        </section>
    );
};

export default PoliticsSection;
