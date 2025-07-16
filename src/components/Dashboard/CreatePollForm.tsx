// /* eslint-disable @next/next/no-img-element */
// 'use client'

// import React, { useState } from 'react';
// import { FiPlus, FiX, FiCalendar, FiClock } from 'react-icons/fi';
// import { useRouter } from 'next/navigation';
// import { toast } from 'react-hot-toast';
// import { useAuthProvider } from '@/Providers/AuthProvider';

// interface PollData {
//     question: string;
//     options: string[];
//     endDate: string;
//     user: { email: string; id: string; image: string; name: string; role: string }
// }

// const CreatePollForm = () => {
//     const { user } = useAuthProvider();
//     const router = useRouter();
//     const [isLoading, setIsLoading] = useState(false);
//     const [question, setQuestion] = useState('');
//     const [options, setOptions] = useState(['', '']);
//     const [endDate, setEndDate] = useState('');
//     const [endTime, setEndTime] = useState('');

//     // console.log('Current user data:', user); // Log user data to console

//     const addOption = () => {
//         if (options.length < 10) {
//             setOptions([...options, '']);
//         } else {
//             toast.error('Maximum 10 options allowed');
//         }
//     };

//     const removeOption = (index: number) => {
//         if (options.length > 2) {
//             const newOptions = [...options];
//             newOptions.splice(index, 1);
//             setOptions(newOptions);
//         }
//     };

//     const handleOptionChange = (index: number, value: string) => {
//         const newOptions = [...options];
//         newOptions[index] = value;
//         setOptions(newOptions);
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setIsLoading(true);

//         if (!question.trim()) {
//             toast.error('Please enter a question');
//             setIsLoading(false);
//             return;
//         }

//         const validOptions = options.filter(opt => opt.trim() !== '');
//         if (validOptions.length < 2) {
//             toast.error('Please provide at least 2 options');
//             setIsLoading(false);
//             return;
//         }

//         if (!endDate) {
//             toast.error('Please select an end date');
//             setIsLoading(false);
//             return;
//         }

//         try {
//             // Combine date and time
//             const endDateTime = endTime ? `${endDate}T${endTime}` : `${endDate}T23:59`;

//             const pollData: PollData = {
//                 question,
//                 options: validOptions,
//                 endDate: endDateTime,
//                 user
//             };

//             console.log('Submitting poll data:', pollData); // Log poll data to console

          

//         } catch (error) {
//             const err= error as Error
//             console.error('Poll creation error:', err);
//             toast.error(err.message || 'Failed to create poll. Please try again.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="max-w-2xl mx-auto p-4 md:p-6">
//             <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//                 <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
//                     <h1 className="text-2xl font-bold">Create New Poll</h1>
//                     <p className="opacity-90 mt-1">Engage your audience with a simple question</p>

//                     <div className="mt-4 flex items-center">
//                         {user?.image && (
//                             <img
//                                 src={user.image}
//                                 alt={user.name}
//                                 className="w-8 h-8 rounded-full mr-2"
//                             />
//                         )}
//                         <div>
//                             <p className="text-sm font-medium">{user?.name}</p>
//                             <p className="text-xs opacity-80">{user?.email}</p>
//                         </div>
//                     </div>
//                 </div>

//                 <form onSubmit={handleSubmit} className="p-6 space-y-6">
//                     <div>
//                         <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1">
//                             Poll Question *
//                         </label>
//                         <input
//                             id="question"
//                             type="text"
//                             value={question}
//                             onChange={(e) => setQuestion(e.target.value)}
//                             placeholder="What's your question?"
//                             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                             disabled={isLoading}
//                         />
//                     </div>

//                     <div>
//                         <div className="flex justify-between items-center mb-2">
//                             <label className="block text-sm font-medium text-gray-700">
//                                 Options *
//                             </label>
//                             <span className="text-xs text-gray-500">
//                                 {options.filter(opt => opt.trim() !== '').length}/10
//                             </span>
//                         </div>

//                         <div className="space-y-3">
//                             {options.map((option, index) => (
//                                 <div key={index} className="flex items-center gap-2">
//                                     <div className="flex-1 relative">
//                                         <input
//                                             type="text"
//                                             value={option}
//                                             onChange={(e) => handleOptionChange(index, e.target.value)}
//                                             placeholder={`Option ${index + 1}`}
//                                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                                             disabled={isLoading}
//                                         />
//                                         {options.length > 2 && (
//                                             <button
//                                                 type="button"
//                                                 onClick={() => removeOption(index)}
//                                                 className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
//                                                 disabled={isLoading}
//                                             >
//                                                 <FiX size={18} />
//                                             </button>
//                                         )}
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>

//                         <button
//                             type="button"
//                             onClick={addOption}
//                             className="mt-3 flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
//                             disabled={isLoading || options.length >= 10}
//                         >
//                             <FiPlus className="mr-1" />
//                             Add Option
//                         </button>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                             <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
//                                 End Date *
//                             </label>
//                             <div className="relative">
//                                 <input
//                                     id="endDate"
//                                     type="date"
//                                     value={endDate}
//                                     min={new Date().toISOString().split('T')[0]}
//                                     onChange={(e) => setEndDate(e.target.value)}
//                                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                                     disabled={isLoading}
//                                 />
//                                 <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                             </div>
//                         </div>

//                         <div>
//                             <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
//                                 End Time (optional)
//                             </label>
//                             <div className="relative">
//                                 <input
//                                     id="endTime"
//                                     type="time"
//                                     value={endTime}
//                                     onChange={(e) => setEndTime(e.target.value)}
//                                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                                     disabled={isLoading || !endDate}
//                                 />
//                                 <FiClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                             </div>
//                         </div>
//                     </div>

//                     <div className="pt-4 flex justify-end space-x-3">
//                         <button
//                             type="button"
//                             onClick={() => router.back()}
//                             className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
//                             disabled={isLoading}
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             type="submit"
//                             className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-70"
//                             disabled={isLoading}
//                         >
//                             {isLoading ? (
//                                 <span className="flex items-center justify-center">
//                                     <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                     </svg>
//                                     Creating...
//                                 </span>
//                             ) : 'Create Poll'}
//                         </button>
//                     </div>
//                 </form>
//             </div>

//             <div className="mt-6 text-center text-sm text-gray-500">
//                 <p>Poll will be visible to all users until the end date</p>
//             </div>
//         </div>
//     );
// };

// export default CreatePollForm;






















'use client'

import React, { useState } from 'react';
import { FiPlus, FiX, FiCalendar, FiClock } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { useAuthProvider } from '@/Providers/AuthProvider';
import { useToast } from '@/hooks/useToast';

interface PollData {
    question: string;
    options: string[];
    endDate: string;
    user: { email: string; id: string; image: string; name: string; role: string }
}

const CreatePollForm = () => {
    const { user } = useAuthProvider();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '']);
    const [endDate, setEndDate] = useState('');
    const [endTime, setEndTime] = useState('');
   const {}=useToast()
    const addOption = () => {
        if (options.length < 10) {
            setOptions([...options, '']);
        } else {
            toast.error('সর্বোচ্চ ১০টি অপশন যোগ করা যাবে');
        }
    };

    const removeOption = (index: number) => {
        if (options.length > 2) {
            const newOptions = [...options];
            newOptions.splice(index, 1);
            setOptions(newOptions);
        }
    };

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (!question.trim()) {
            toast.error('প্রশ্ন লিখুন');
            setIsLoading(false);
            return;
        }

        const validOptions = options.filter(opt => opt.trim() !== '');
        if (validOptions.length < 2) {
            toast.error('অন্তত ২টি অপশন দিন');
            setIsLoading(false);
            return;
        }

        if (!endDate) {
            toast.error('শেষ হওয়ার তারিখ নির্বাচন করুন');
            setIsLoading(false);
            return;
        }

        try {
            const endDateTime = endTime ? `${endDate}T${endTime}` : `${endDate}T23:59`;

            const pollData: PollData = {
                question,
                options: validOptions,
                endDate: endDateTime,
                user
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/poll/createPoll`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pollData),
            });

            if (!response.ok) {
                throw new Error('পোল তৈরি করতে সমস্যা হয়েছে');
            }

            const data = await response.json();
            toast.success('পোল সফলভাবে তৈরি হয়েছে!');
            router.push(`/news/dashboard/polls/${data.id}`);

        } catch (error) {
            const err = error as Error;
            console.error('পোল তৈরিতে ত্রুটি:', err);
            toast.error(err.message || 'পোল তৈরি করতে ব্যর্থ হয়েছে। আবার চেষ্টা করুন।');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4 md:p-6">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                    <h1 className="text-2xl font-bold">নতুন পোল তৈরি করুন</h1>
                    <p className="opacity-90 mt-1">আপনার দর্শকদের সাথে একটি সহজ প্রশ্ন শেয়ার করুন</p>

                    <div className="mt-4 flex items-center">
                        {user?.image && (
                            <img
                                src={user.image}
                                alt={user.name}
                                className="w-8 h-8 rounded-full mr-2"
                            />
                        )}
                        <div>
                            <p className="text-sm font-medium">{user?.name}</p>
                            <p className="text-xs opacity-80">{user?.email}</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div>
                        <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1">
                            পোলের প্রশ্ন *
                        </label>
                        <input
                            id="question"
                            type="text"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="আপনার প্রশ্নটি লিখুন..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            disabled={isLoading}
                        />
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-gray-700">
                                অপশনসমূহ *
                            </label>
                            <span className="text-xs text-gray-500">
                                {options.filter(opt => opt.trim() !== '').length}/১০
                            </span>
                        </div>

                        <div className="space-y-3">
                            {options.map((option, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <div className="flex-1 relative">
                                        <input
                                            type="text"
                                            value={option}
                                            onChange={(e) => handleOptionChange(index, e.target.value)}
                                            placeholder={`অপশন ${index + 1}`}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                            disabled={isLoading}
                                        />
                                        {options.length > 2 && (
                                            <button
                                                type="button"
                                                onClick={() => removeOption(index)}
                                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
                                                disabled={isLoading}
                                                aria-label="Remove option"
                                            >
                                                <FiX size={18} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={addOption}
                            className="mt-3 flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
                            disabled={isLoading || options.length >= 10}
                        >
                            <FiPlus className="mr-1" />
                            নতুন অপশন যোগ করুন
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                                শেষ হওয়ার তারিখ *
                            </label>
                            <div className="relative">
                                <input
                                    id="endDate"
                                    type="date"
                                    value={endDate}
                                    min={new Date().toISOString().split('T')[0]}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    disabled={isLoading}
                                />
                                <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
                                শেষ হওয়ার সময় (ঐচ্ছিক)
                            </label>
                            <div className="relative">
                                <input
                                    id="endTime"
                                    type="time"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    disabled={isLoading || !endDate}
                                />
                                <FiClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                            disabled={isLoading}
                        >
                            বাতিল করুন
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-70"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    তৈরি হচ্ছে...
                                </span>
                            ) : 'পোল তৈরি করুন'}
                        </button>
                    </div>
                </form>
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
                <p>পোলটি শেষ হওয়ার তারিখ পর্যন্ত সকল ব্যবহারকারীর জন্য দেখা যাবে</p>
            </div>
        </div>
    );
};

export default CreatePollForm;