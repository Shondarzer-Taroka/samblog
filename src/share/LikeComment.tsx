// 'use client';

// import { useState } from 'react';
// import { FaHeart, FaRegHeart, FaComment, FaRegComment, FaShare, FaEllipsisH } from 'react-icons/fa';
// import { motion, AnimatePresence } from 'framer-motion';

// interface LikeCommentProps {
//   initialLikes: number;
//   initialComments: number;
//   initialIsLiked: boolean;
//   onLike?: (liked: boolean) => void;
//   onComment?: () => void;
//   onShare?: () => void;
// }

// export default function LikeComment({
//   initialLikes = 0,
//   initialComments = 0,
//   initialIsLiked = false,
//   onLike,
//   onComment,
//   onShare,
// }: LikeCommentProps) {
//   const [likes, setLikes] = useState(initialLikes);
//   const [isLiked, setIsLiked] = useState(initialIsLiked);
//   const [showCommentBox, setShowCommentBox] = useState(false);
//   const [comment, setComment] = useState('');

//   const handleLike = () => {
//     const newLikedState = !isLiked;
//     setIsLiked(newLikedState);
//     setLikes(newLikedState ? likes + 1 : likes - 1);
//     onLike?.(newLikedState);
//   };

//   const handleCommentSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (comment.trim()) {
//       // Handle comment submission
//       setComment('');
//       setShowCommentBox(false);
//     }
//   };

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between border-t border-b border-gray-100 py-3">
//         {/* Like Button */}
//         <motion.button
//           whileTap={{ scale: 1.2 }}
//           onClick={handleLike}
//           className={`flex items-center space-x-1 px-4 py-2 rounded-full transition-colors ${
//             isLiked ? 'text-red-500' : 'text-gray-500 hover:text-gray-700'
//           }`}
//         >
//           {isLiked ? (
//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ type: 'spring', stiffness: 500 }}
//             >
//               <FaHeart className="text-red-500" />
//             </motion.div>
//           ) : (
//             <FaRegHeart />
//           )}
//           <span className="text-sm font-medium">{likes}</span>
//         </motion.button>

//         {/* Comment Button */}
//         <button
//           onClick={() => {
//             setShowCommentBox(!showCommentBox);
//             onComment?.();
//           }}
//           className="flex items-center space-x-1 px-4 py-2 rounded-full text-gray-500 hover:text-blue-500 transition-colors"
//         >
//           {showCommentBox ? <FaComment className="text-blue-500" /> : <FaRegComment />}
//           <span className="text-sm font-medium">{initialComments}</span>
//         </button>

//         {/* Share Button */}
//         <button
//           onClick={onShare}
//           className="flex items-center space-x-1 px-4 py-2 rounded-full text-gray-500 hover:text-green-500 transition-colors"
//         >
//           <FaShare />
//           <span className="text-sm font-medium">Share</span>
//         </button>

//         {/* Options Button */}
//         <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors">
//           <FaEllipsisH />
//         </button>
//       </div>

//       {/* Comment Box */}
//       <AnimatePresence>
//         {showCommentBox && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: 'auto' }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.3 }}
//             className="px-4 overflow-hidden"
//           >
//             <form onSubmit={handleCommentSubmit} className="space-y-3">
//               <div className="flex space-x-3">
//                 <div className="flex-shrink-0">
//                   <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
//                     <span className="text-gray-500">👤</span>
//                   </div>
//                 </div>
//                 <div className="flex-1">
//                   <textarea
//                     value={comment}
//                     onChange={(e) => setComment(e.target.value)}
//                     placeholder="Write a comment..."
//                     className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent resize-none"
//                     rows={2}
//                   />
//                 </div>
//               </div>
//               <div className="flex justify-end space-x-2">
//                 <button
//                   type="button"
//                   onClick={() => setShowCommentBox(false)}
//                   className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={!comment.trim()}
//                   className={`px-4 py-2 text-sm rounded-lg transition-colors ${
//                     comment.trim()
//                       ? 'bg-blue-500 text-white hover:bg-blue-600'
//                       : 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                   }`}
//                 >
//                   Post
//                 </button>
//               </div>
//             </form>

//             {/* Sample Comments (would be dynamic in real app) */}
//             <div className="mt-4 space-y-4">
//               <div className="flex space-x-3">
//                 <div className="flex-shrink-0">
//                   <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
//                     <span className="text-gray-500">👤</span>
//                   </div>
//                 </div>
//                 <div className="flex-1">
//                   <div className="bg-gray-50 p-3 rounded-lg">
//                     <div className="flex items-center space-x-2">
//                       <span className="font-medium text-sm">John Doe</span>
//                       <span className="text-xs text-gray-400">2h ago</span>
//                     </div>
//                     <p className="mt-1 text-sm text-gray-700">
//                       This is a great post! I really enjoyed reading it.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }
































'use client';

import { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart, FaComment, FaRegComment, FaShare, FaEllipsisH } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import useSWR from 'swr';
import axios from 'axios';

interface LikeCommentProps {
  opinionId: string;
  initialLikes: number;
  initialComments: number;
  initialIsLiked: boolean;
  onComment?: () => void;
  onShare?: () => void;
}

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export default function LikeComment({
  opinionId,
  initialLikes = 0,
  initialComments = 0,
  initialIsLiked = false,
  onComment,
  onShare,
}: LikeCommentProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState('');
  const [commentCount, setCommentCount] = useState(initialComments);

  // Fetch like status on mount
  const { data: likeData } = useSWR(`/api/opinions/${opinionId}/like-status`, fetcher, {
    revalidateOnFocus: false,
    fallbackData: { liked: initialIsLiked, likeCount: initialLikes }
  });

  // Fetch comments with pagination
  const { data: commentsData, mutate: mutateComments } = useSWR(
    showCommentBox ? `/api/opinions/${opinionId}/comments?page=1&limit=5` : null,
    fetcher
  );

  useEffect(() => {
    if (likeData) {
      setIsLiked(likeData.liked);
      setLikes(likeData.likeCount);
    }
  }, [likeData]);

  const handleLike = async () => {
    try {
      const { data } = await axios.post(`/api/opinions/${opinionId}/like`);
      setIsLiked(data.liked);
      setLikes(data.likeCount);
    } catch (error) {
      console.error('Like failed:', error);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      try {
        const { data } = await axios.post(`/api/opinions/${opinionId}/comments`, {
          content: comment
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true
        });
        setComment('');
        setCommentCount(data.commentCount);
        mutateComments();
      } catch (error) {
        console.error('Comment failed:', error);
        if (error.response?.status === 401) {
          // Handle authentication required
          alert('Please login to comment');
        }
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-t border-b border-gray-100 py-3">
        {/* Like Button */}
        <motion.button
          whileTap={{ scale: 1.2 }}
          onClick={handleLike}
          className={`flex items-center space-x-1 px-4 py-2 rounded-full transition-colors ${
            isLiked ? 'text-red-500' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {isLiked ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500 }}
            >
              <FaHeart className="text-red-500" />
            </motion.div>
          ) : (
            <FaRegHeart />
          )}
          <span className="text-sm font-medium">{likes}</span>
        </motion.button>

        {/* Comment Button */}
        <button
          onClick={() => {
            setShowCommentBox(!showCommentBox);
            onComment?.();
          }}
          className="flex items-center space-x-1 px-4 py-2 rounded-full text-gray-500 hover:text-blue-500 transition-colors"
        >
          {showCommentBox ? <FaComment className="text-blue-500" /> : <FaRegComment />}
          <span className="text-sm font-medium">{commentCount}</span>
        </button>

        {/* Share Button */}
        <button
          onClick={onShare}
          className="flex items-center space-x-1 px-4 py-2 rounded-full text-gray-500 hover:text-green-500 transition-colors"
        >
          <FaShare />
          <span className="text-sm font-medium">Share</span>
        </button>

        {/* Options Button */}
        <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors">
          <FaEllipsisH />
        </button>
      </div>

      {/* Comment Box */}
      <AnimatePresence>
        {showCommentBox && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="px-4 overflow-hidden"
          >
            <form onSubmit={handleCommentSubmit} className="space-y-3">
              <div className="flex space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">👤</span>
                  </div>
                </div>
                <div className="flex-1">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent resize-none"
                    rows={2}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowCommentBox(false)}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!comment.trim()}
                  className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                    comment.trim()
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Post
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="mt-4 space-y-4">
              {commentsData?.comments?.map((comment: any) => (
                <div key={comment.id} className="flex space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      {comment.user.image ? (
                        <img 
                          src={comment.user.image} 
                          alt={comment.user.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-500">👤</span>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-sm">{comment.user.name}</span>
                        <span className="text-xs text-gray-400">
                          {new Date(comment.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-700">{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {commentsData?.hasMore && (
                <button
                  onClick={async () => {
                    // Implement pagination loading here
                  }}
                  className="w-full py-2 text-sm text-blue-500 hover:text-blue-700 transition-colors"
                >
                  Load more comments...
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}