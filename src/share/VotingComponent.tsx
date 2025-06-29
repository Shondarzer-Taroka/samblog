'use client'
import React, { useEffect, useState } from 'react';
import { FaRegThumbsUp, FaRegThumbsDown, FaRegCommentAlt, FaShareAlt, FaFacebookF, FaTwitter, FaEnvelope, FaLink, FaDownload, FaSpinner } from 'react-icons/fa';



interface Poll {
  id: string;
  question: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  options: {
    id: string;
    text: string;
  }[];
  user: {
    id: string;
    name: string;
    email: string;
    image: string | null;
  };
}

const VotingComponent = () => {
   const [latestPoll, setLatestPoll] = useState<Poll | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);




   useEffect(() => {
    const fetchLatestPoll = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/poll/getLatestPoll`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch latest poll');
        }

        const data = await response.json();
        if (data.success) {
          setLatestPoll(data.data);
        } else {
          throw new Error(data.message || 'No poll found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchLatestPoll();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isActive = (endDate: string) => {
    const now = new Date();
    const end = new Date(endDate);
    return now < end;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px]">
        <FaSpinner className="animate-spin text-blue-500 text-2xl mb-2" />
        <p className="text-gray-600">Loading latest poll...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!latestPoll) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-700">
        <p>No polls available yet.</p>
      </div>
    );
  }


    return (
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
                                        className={`h-2.5 rounded-full ${index === 0 ? 'bg-green-500' :
                                            index === 1 ? 'bg-red-500' : 'bg-blue-500'
                                            }`}
                                        style={{ width: `${option.percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>


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
    );
};

export default VotingComponent;