// /* eslint-disable react/jsx-key */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// 'use client'
// import React, { useState } from 'react';
// import { FaRegThumbsUp, FaRegThumbsDown, FaRegCommentAlt, FaShareAlt, FaFacebookF, FaTwitter, FaEnvelope, FaLink, FaDownload, FaSpinner } from 'react-icons/fa';
// import useLatestPoll from '@/hooks/useLatestPoll';
// import { englishToBengali } from '@/utils/englishToBengali';

// const VotingComponent = () => {
//   const { latestPoll, loading, error, formatDate, isActive, submitVote, voterId } = useLatestPoll();
//   const [selectedOption, setSelectedOption] = useState<string | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [voteMessage, setVoteMessage] = useState<string | null>(null);

//   const handleVoteSubmit = async () => {
//     if (!selectedOption) {
//       setVoteMessage('Please select an option');
//       return;
//     }

//     setIsSubmitting(true);
//     setVoteMessage(null);
    
//     try {
//       const result = await submitVote(selectedOption);
//       if (result.success) {
//         // setVoteMessage('Your vote has been submitted!');
//         setVoteMessage('আপনার ভোট জমা দেওয়া হয়েছে!');

//         // Update the selected option immediately
//         setSelectedOption(null);
//       } else {
//         setVoteMessage(result.message || 'Failed to submit vote');
//       }
//     } catch (error) {
//       setVoteMessage('An error occurred while submitting your vote');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Calculate total voters from all options
//   // const totalVoters = latestPoll?.options.reduce((sum, option) => sum + option.votes, 0) || 0;
//   const totalVoters = latestPoll?.options.reduce((sum, option) => sum + option.votes, 0) || 0;
//   console.log(totalVoters);
  
//   // Get color based on option index
//   const getOptionColor = (index: number) => {
//     const colors = ['bg-green-500', 'bg-red-500', 'bg-blue-500', 'bg-yellow-500', 'bg-purple-500'];
//     return colors[index % colors.length];
//   };

//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[200px]">
//         <FaSpinner className="animate-spin text-blue-500 text-2xl mb-2" />
//         {/* <p className="text-gray-600">Loading latest poll...</p> */}
//         <p className="text-gray-600">সর্বশেষ জরিপ লোড হচ্ছে...</p>

//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
//         <p>Error: {error}</p>
//       </div>
//     );
//   }

//   if (!latestPoll) {
//     return (
//       <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-700">
//         <p>No polls available yet.</p>
//       </div>
//     );
//   }

//   // Get icons for each option
//   const getOptionIcon = (index: number) => {
//     const icons = [
//       <FaRegThumbsUp className="text-green-500" />,
//       <FaRegThumbsDown className="text-red-500" />,
//       <FaRegCommentAlt className="text-blue-500" />
//     ];
//     return icons[index] || icons[0];
//   };

//   return (
//     <div className="flex flex-col">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-2xl font-bold text-gray-800 relative pl-4">
//           <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-6 bg-blue-600 rounded-full"></span>
//           অনলাইন ভোট
//         </h2>
//         <button className="text-gray-600 hover:text-blue-600 transition-colors">
//           <FaDownload className="text-lg" />
//         </button>
//       </div>

//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex-grow flex flex-col">
//         <div className="p-5 flex-grow">
//           <div className="flex items-center justify-between mb-4">
//             <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
//               {formatDate(latestPoll.createdAt)}
//             </span>
//             <div className="flex items-center text-xs text-gray-500">
//               <FaShareAlt className="mr-1" />
//               <span>{totalVoters} Shares</span>
//             </div>
//           </div>

//           <p className="text-gray-700 mb-5 leading-relaxed">
//             {latestPoll.question}
//           </p>

//           <div className="space-y-4 mb-6">
//             {latestPoll.options.map((option, index) => {
//               const icon = getOptionIcon(index);
//               const color = getOptionColor(index);
//               const percentage = totalVoters > 0 ? Math.round((option.votes / totalVoters) * 100) : 0;
              
//               return (
//                 <div key={option.id} className="space-y-2">
//                   <div className="flex justify-between items-center">
//                     <label className="flex items-center gap-3 cursor-pointer">
//                       <div className="flex items-center gap-2">
//                         <span className="text-lg">{icon}</span>
//                         <input
//                           type="radio"
//                           name="vote"
//                           value={option.id}
//                           checked={selectedOption === option.id}
//                           onChange={() => setSelectedOption(option.id)}
//                           className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
//                           disabled={!isActive(latestPoll.endDate)}
//                         />
//                         <span className="text-gray-700">{option.text}</span>
//                       </div>
//                     </label>
//                     <div className="text-right">
//                       <span className="font-semibold text-gray-700 block">{englishToBengali(percentage)}%</span>
//                       <span className="text-xs text-gray-500">{option.votes} votes</span>
//                     </div>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-2.5">
//                     <div
//                       className={`h-2.5 rounded-full ${color}`}
//                       style={{ width: `${percentage}%` }}
//                     ></div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {voteMessage && (
//             <div className={`mb-4 p-3 rounded-lg text-center ${
//               voteMessage.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
//             }`}>
//               {voteMessage}
//             </div>
//           )}

//           <div className="bg-gray-50 p-3 rounded-lg mb-4">
//             <div className="flex items-center justify-between">
//               <div className="text-sm text-gray-600">
//                 <span className="font-medium">মোট ভোটদাতা:</span> {englishToBengali(totalVoters===0? latestPoll.totalVotes : totalVoters)} জন
//               </div>
//               <button 
//                 onClick={handleVoteSubmit}
//                 disabled={!isActive(latestPoll.endDate) || isSubmitting || !selectedOption}
//                 className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center shadow-sm ${
//                   (!isActive(latestPoll.endDate) || isSubmitting || !selectedOption ? 'opacity-50 cursor-not-allowed' : ''
//   )}`}
//               >
//                 {isSubmitting ? (
//                   <>
//                     <FaSpinner className="animate-spin mr-1" />
//                     Submitting...
//                   </>
//                 ) : (
//                   <>
//                     ভোট দিন
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
//                     </svg>
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="bg-gray-50 px-5 py-3 border-t">
//           <h4 className="text-sm font-medium text-gray-600 mb-3">এই পোল শেয়ার করুন:</h4>
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <button className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition-colors shadow-sm">
//                 <FaFacebookF />
//               </button>
//               <button className="w-9 h-9 rounded-full bg-sky-100 text-sky-500 flex items-center justify-center hover:bg-sky-200 transition-colors shadow-sm">
//                 <FaTwitter />
//               </button>
//               <button className="w-9 h-9 rounded-full bg-green-100 text-green-600 flex items-center justify-center hover:bg-green-200 transition-colors shadow-sm">
//                 <FaEnvelope />
//               </button>
//             </div>
//             <button className="w-9 h-9 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center hover:bg-gray-300 transition-colors shadow-sm">
//               <FaLink />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VotingComponent;


















/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useState, useRef } from 'react';
import { FaRegThumbsUp, FaRegThumbsDown, FaRegCommentAlt, FaShareAlt, FaFacebookF, FaTwitter, FaEnvelope, FaLink, FaDownload, FaSpinner, FaCheck } from 'react-icons/fa';
import useLatestPoll from '@/hooks/useLatestPoll';
import { englishToBengali } from '@/utils/englishToBengali';
import { toPng } from 'html-to-image';

const VotingComponent = () => {
  const { latestPoll, loading, error, formatDate, isActive, submitVote, voterId } = useLatestPoll();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voteMessage, setVoteMessage] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  const handleVoteSubmit = async () => {
    if (!selectedOption) {
      setVoteMessage('Please select an option');
      return;
    }

    setIsSubmitting(true);
    setVoteMessage(null);
    
    try {
      const result = await submitVote(selectedOption);
      if (result.success) {
        setVoteMessage('আপনার ভোট জমা দেওয়া হয়েছে!');
        setSelectedOption(null);
      } else {
        setVoteMessage(result.message || 'Failed to submit vote');
      }
    } catch (error) {
      setVoteMessage('An error occurred while submitting your vote');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownload = async () => {
    if (!componentRef.current) return;

    setIsDownloading(true);
    try {
      const dataUrl = await toPng(componentRef.current, {
        backgroundColor: '#ffffff',
        quality: 1,
        pixelRatio: 2
      });

      const link = document.createElement('a');
      link.download = `poll-${latestPoll?.id || 'latest'}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  // Get current URL for sharing
  const getPollUrl = () => {
    return typeof window !== 'undefined' ? `${window.location.origin}/polls/${latestPoll?.id}` : '';
  };

  // Share on Facebook
  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getPollUrl())}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  // Share on Twitter
  const shareOnTwitter = () => {
    const text = `Check out this poll: ${latestPoll?.question}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(getPollUrl())}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareViaEmail = () => {
  if (typeof window === 'undefined') return;

  const subject = `Poll: ${latestPoll?.question || 'Interesting Poll'}`;
  const body = `I found this interesting poll and wanted to share it with you:\n\n${latestPoll?.question || ''}\n\nVote here: ${getPollUrl()}`;

  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);

  const mailtoLink = `mailto:?subject=${encodedSubject}&body=${encodedBody}`;

  // ✅ Use location.href instead of window.open
  window.location.href = mailtoLink;
};



  // Copy link to clipboard
  const copyLinkToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getPollUrl());
      setIsLinkCopied(true);
      setTimeout(() => setIsLinkCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link: ', err);
    }
  };

  const totalVoters = latestPoll?.options.reduce((sum, option) => sum + option.votes, 0) || 0;
  
  const getOptionColor = (index: number) => {
    const colors = ['bg-green-500', 'bg-red-500', 'bg-blue-500', 'bg-yellow-500', 'bg-purple-500'];
    return colors[index % colors.length];
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px]">
        <FaSpinner className="animate-spin text-blue-500 text-2xl mb-2" />
        <p className="text-gray-600">সর্বশেষ জরিপ লোড হচ্ছে...</p>
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

  const getOptionIcon = (index: number) => {
    const icons = [
      <FaRegThumbsUp className="text-green-500" />,
      <FaRegThumbsDown className="text-red-500" />,
      <FaRegCommentAlt className="text-blue-500" />
    ];
    return icons[index] || icons[0];
  };

  return (
    <div className="flex flex-col" ref={componentRef}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 relative pl-4">
          <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-6 bg-blue-600 rounded-full"></span>
          অনলাইন ভোট
        </h2>
        <button 
          onClick={handleDownload}
          disabled={isDownloading}
          className="text-gray-600 hover:text-blue-600 transition-colors"
        >
          {isDownloading ? (
            <FaSpinner className="animate-spin text-lg" />
          ) : (
            <FaDownload className="text-lg" />
          )}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex-grow flex flex-col">
        <div className="p-5 flex-grow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {formatDate(latestPoll.createdAt)}
            </span>
            <div className="flex items-center text-xs text-gray-500">
              <FaShareAlt className="mr-1" />
              <span>{totalVoters} Shares</span>
            </div>
          </div>

          <p className="text-gray-700 mb-5 leading-relaxed">
            {latestPoll.question}
          </p>

          <div className="space-y-4 mb-6">
            {latestPoll.options.map((option, index) => {
              const icon = getOptionIcon(index);
              const color = getOptionColor(index);
              const percentage = totalVoters > 0 ? Math.round((option.votes / totalVoters) * 100) : 0;
              
              return (
                <div key={option.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{icon}</span>
                        <input
                          type="radio"
                          name="vote"
                          value={option.id}
                          checked={selectedOption === option.id}
                          onChange={() => setSelectedOption(option.id)}
                          className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                          disabled={!isActive(latestPoll.endDate)}
                        />
                        <span className="text-gray-700">{option.text}</span>
                      </div>
                    </label>
                    <div className="text-right">
                      <span className="font-semibold text-gray-700 block">{englishToBengali(percentage)}%</span>
                      <span className="text-xs text-gray-500">{option.votes} votes</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${color}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          {voteMessage && (
            <div className={`mb-4 p-3 rounded-lg text-center ${
              voteMessage.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}>
              {voteMessage}
            </div>
          )}

          <div className="bg-gray-50 p-3 rounded-lg mb-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <span className="font-medium">মোট ভোটদাতা:</span> {englishToBengali(totalVoters===0? latestPoll.totalVotes : totalVoters)} জন
              </div>
              <button 
                onClick={handleVoteSubmit}
                disabled={!isActive(latestPoll.endDate) || isSubmitting || !selectedOption}
                className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center shadow-sm ${
                  (!isActive(latestPoll.endDate) || isSubmitting || !selectedOption ? 'opacity-50 cursor-not-allowed' : ''
                )}`}
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="animate-spin mr-1" />
                    Submitting...
                  </>
                ) : (
                  <>
                    ভোট দিন
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-5 py-3 border-t">
          <h4 className="text-sm font-medium text-gray-600 mb-3">এই পোল শেয়ার করুন:</h4>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={shareOnFacebook}
                className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition-colors shadow-sm"
                aria-label="Share on Facebook"
              >
                <FaFacebookF />
              </button>
              <button 
                onClick={shareOnTwitter}
                className="w-9 h-9 rounded-full bg-sky-100 text-sky-500 flex items-center justify-center hover:bg-sky-200 transition-colors shadow-sm"
                aria-label="Share on Twitter"
              >
                <FaTwitter />
              </button>
              <button 
                onClick={shareViaEmail}
                className="w-9 h-9 rounded-full bg-green-100 text-green-600 flex items-center justify-center hover:bg-green-200 transition-colors shadow-sm"
                aria-label="Share via Email"
              >
                <FaEnvelope />
              </button>
            </div>
            <button 
              onClick={copyLinkToClipboard}
              className="w-9 h-9 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center hover:bg-gray-300 transition-colors shadow-sm"
              aria-label="Copy link to clipboard"
            >
              {isLinkCopied ? <FaCheck className="text-green-500" /> : <FaLink />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VotingComponent;


