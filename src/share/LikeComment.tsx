/* eslint-disable @next/next/no-img-element */


// 'use client';

// import { useState } from 'react';
// import { 
//   FaHeart, 
//   FaRegHeart, 
//   FaComment, 
//   FaRegComment, 
//   FaShare, 
//   FaEllipsisH, 
//   FaUserAlt, 
//   FaEdit, 
//   FaTrash, 
//   FaTimes, 
//   FaCheck 
// } from 'react-icons/fa';
// import { motion, AnimatePresence } from 'framer-motion';
// import useSWR, { mutate } from 'swr';
// import axios from 'axios';

// interface LikeCommentProps {
//   opinionId: string;
//   initialLikes: number;
//   initialComments: number;
//   initialIsLiked: boolean;
//   currentUserId?: string;
//   onComment?: () => void;
//   onShare?: () => void;
// }

// interface Comment {
//   id: string;
//   content: string;
//   createdAt: string;
//   user: {
//     id: string;
//     name: string;
//     image?: string;
//   };
// }

// const fetcher = (url: string) => axios.get(url).then(res => res.data);

// export default function LikeComment({
//   opinionId,
//   initialLikes = 0,
//   initialComments = 0,
//   initialIsLiked = false,
//   currentUserId,
//   onComment,
//   onShare,
// }: LikeCommentProps) {
//   const [likes, setLikes] = useState(initialLikes);
//   const [isLiked, setIsLiked] = useState(initialIsLiked);
//   const [showCommentBox, setShowCommentBox] = useState(false);
//   const [comment, setComment] = useState('');
//   const [commentCount, setCommentCount] = useState(initialComments);
//   const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
//   const [editCommentContent, setEditCommentContent] = useState('');

//   // Fetch like status
//   const { data: likeData } = useSWR(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/likeComment/opinions/${opinionId}/like-status`, 
//     fetcher, 
//     {
//       revalidateOnFocus: false,
//       fallbackData: { liked: initialIsLiked, likeCount: initialLikes }
//     }
//   );

//   // Fetch comments
//   const { data: commentsData } = useSWR(
//     showCommentBox ? `${process.env.NEXT_PUBLIC_BASE_URL}/likeComment/opinions/${opinionId}/comments?page=1&limit=10` : null,
//     fetcher
//   );

//   // Update state when data changes
//   if (likeData && (likeData.liked !== isLiked || likeData.likeCount !== likes)) {
//     setIsLiked(likeData.liked);
//     setLikes(likeData.likeCount);
//   }

//   const handleLike = async () => {
//     try {
//       const { data } = await axios.post(
//         `${process.env.NEXT_PUBLIC_BASE_URL}/likeComment/opinions/${opinionId}/like`,
//         {},
//         { withCredentials: true }
//       );
//       setIsLiked(data.liked);
//       setLikes(data.likeCount);
//     } catch (error) {
//       console.error('Like failed:', error);
//     }
//   };

//   const handleCommentSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!comment.trim()) return;

//     try {
//       const { data } = await axios.post(
//         `${process.env.NEXT_PUBLIC_BASE_URL}/likeComment/opinions/${opinionId}/comments`,
//         { content: comment },
//         {
//           headers: { 'Content-Type': 'application/json' },
//           withCredentials: true
//         }
//       );
      
//       setComment('');
//       setCommentCount(data.commentCount);
//       mutate(`${process.env.NEXT_PUBLIC_BASE_URL}/likeComment/opinions/${opinionId}/comments?page=1&limit=10`);
//     } catch (error) {
//       console.error('Comment failed:', error);
//       if (axios.isAxiosError(error) && error.response?.status === 401) {
//         alert('Please login to comment');
//       }
//     }
//   };

//   const handleUpdateComment = async (commentId: string) => {
//     if (!editCommentContent.trim()) return;
    
//     try {
//       const { data } = await axios.put(
//         `${process.env.NEXT_PUBLIC_BASE_URL}/likeComment/opinions/comments/${commentId}`,
//         { content: editCommentContent },
//         { withCredentials: true }
//       );
      
//       setEditingCommentId(null);
//       setEditCommentContent('');
//       setCommentCount(data.commentCount);
//       mutate(`${process.env.NEXT_PUBLIC_BASE_URL}/likeComment/opinions/${opinionId}/comments?page=1&limit=10`);
//     } catch (error) {
//       console.error('Update comment failed:', error);
//     }
//   };

//   const handleDeleteComment = async (commentId: string) => {
//     if (!window.confirm('Are you sure you want to delete this comment?')) return;
    
//     try {
//       const { data } = await axios.delete(
//         `${process.env.NEXT_PUBLIC_BASE_URL}/likeComment/opinions/comments/${commentId}`,
//         { withCredentials: true }
//       );
      
//       setCommentCount(data.commentCount);
//       mutate(`${process.env.NEXT_PUBLIC_BASE_URL}/likeComment/opinions/${opinionId}/comments?page=1&limit=10`);
//     } catch (error) {
//       console.error('Delete comment failed:', error);
//     }
//   };

//   const startEditing = (comment: Comment) => {
//     setEditingCommentId(comment.id);
//     setEditCommentContent(comment.content);
//   };

//   const cancelEditing = () => {
//     setEditingCommentId(null);
//     setEditCommentContent('');
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
//           aria-label={isLiked ? 'Unlike' : 'Like'}
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
//           aria-label={showCommentBox ? 'Hide comments' : 'Show comments'}
//         >
//           {showCommentBox ? <FaComment className="text-blue-500" /> : <FaRegComment />}
//           <span className="text-sm font-medium">{commentCount}</span>
//         </button>

//         {/* Share Button */}
//         <button
//           onClick={onShare}
//           className="flex items-center space-x-1 px-4 py-2 rounded-full text-gray-500 hover:text-green-500 transition-colors"
//           aria-label="Share"
//         >
//           <FaShare />
//           <span className="text-sm font-medium">Share</span>
//         </button>

//         {/* Options Button */}
//         <button 
//           className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
//           aria-label="More options"
//         >
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
//             {/* Comment Form */}
//             <form onSubmit={handleCommentSubmit} className="space-y-3 mb-4">
//               <div className="flex space-x-3">
//                 <div className="flex-shrink-0">
//                   <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
//                     <FaUserAlt className="text-gray-500" />
//                   </div>
//                 </div>
//                 <div className="flex-1">
//                   <textarea
//                     value={comment}
//                     onChange={(e) => setComment(e.target.value)}
//                     placeholder="Write a comment..."
//                     className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent resize-none"
//                     rows={2}
//                     aria-label="Comment input"
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

//             {/* Comments List */}
//             <div className="space-y-4">
//               {commentsData?.comments?.map((comment: Comment) => (
//                 <div key={comment.id} className="flex space-x-3 group">
//                   <div className="flex-shrink-0">
//                     <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
//                       {comment.user.image ? (
//                         <img 
//                           src={comment.user.image} 
//                           alt={comment.user.name}
//                           className="w-full h-full object-cover"
//                         />
//                       ) : (
//                         <FaUserAlt className="text-gray-500 w-5 h-5" />
//                       )}
//                     </div>
//                   </div>
//                   <div className="flex-1 relative">
//                     {editingCommentId === comment.id ? (
//                       <div className="bg-gray-50 p-3 rounded-lg">
//                         <textarea
//                           value={editCommentContent}
//                           onChange={(e) => setEditCommentContent(e.target.value)}
//                           className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
//                           rows={3}
//                           aria-label="Edit comment"
//                         />
//                         <div className="flex justify-end space-x-2 mt-2">
//                           <button
//                             onClick={cancelEditing}
//                             className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 flex items-center"
//                           >
//                             <FaTimes className="mr-1" /> Cancel
//                           </button>
//                           <button
//                             onClick={() => handleUpdateComment(comment.id)}
//                             className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
//                           >
//                             <FaCheck className="mr-1" /> Save
//                           </button>
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="bg-gray-50 p-3 rounded-lg">
//                         <div className="flex items-center space-x-2">
//                           <span className="font-medium text-sm">{comment.user.name}</span>
//                           <span className="text-xs text-gray-400">
//                             {new Date(comment.createdAt).toLocaleString()}
//                           </span>
//                         </div>
//                         <p className="mt-1 text-sm text-gray-700">{comment.content}</p>
                        
//                         {currentUserId === comment.user.id && (
//                           <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
//                             <button
//                               onClick={() => startEditing(comment)}
//                               className="p-1 text-gray-500 hover:text-blue-500 transition-colors"
//                               aria-label="Edit comment"
//                             >
//                               <FaEdit size={14} />
//                             </button>
//                             <button
//                               onClick={() => handleDeleteComment(comment.id)}
//                               className="p-1 text-gray-500 hover:text-red-500 transition-colors"
//                               aria-label="Delete comment"
//                             >
//                               <FaTrash size={14} />
//                             </button>
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }













import { useState, useEffect } from 'react';
import { 
  FaHeart, 
  FaRegHeart, 
  FaComment, 
  FaRegComment, 
  FaShare, 
  FaEllipsisH, 
  FaUserAlt, 
  FaEdit, 
  FaTrash, 
  FaTimes, 
  FaCheck 
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import useSWR, { mutate } from 'swr';
import axios from 'axios';

interface LikeCommentProps {
  opinionId: string;
  initialLikes: number;
  initialComments: number;
  initialIsLiked: boolean;
  currentUserId?: string;
  onComment?: () => void;
  onShare?: () => void;
}

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    image?: string;
  };
}

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export default function LikeComment({
  opinionId,
  initialLikes = 0,
  initialComments = 0,
  initialIsLiked = false,
  currentUserId,
  onComment,
  onShare,
}: LikeCommentProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState('');
  const [commentCount, setCommentCount] = useState(initialComments);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editCommentContent, setEditCommentContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch like status with more frequent polling
  const { data: likeData } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/likeComment/opinions/${opinionId}/like-status`, 
    fetcher, 
    {
      refreshInterval: 5000, // Poll every 5 seconds
      revalidateOnFocus: true,
      fallbackData: { liked: initialIsLiked, likeCount: initialLikes }
    }
  );

  // Fetch comments
  const { data: commentsData } = useSWR(
    showCommentBox ? `${process.env.NEXT_PUBLIC_BASE_URL}/likeComment/opinions/${opinionId}/comments?page=1&limit=10` : null,
    fetcher
  );

  // Update state when data changes
  useEffect(() => {
    if (likeData) {
      setIsLiked(likeData.liked);
      setLikes(likeData.likeCount);
    }
  }, [likeData]);

  const handleLike = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/likeComment/opinions/${opinionId}/like`,
        {},
        { withCredentials: true }
      );
      setIsLiked(data.liked);
      setLikes(data.likeCount);
      // Immediately update the SWR cache
      mutate(`${process.env.NEXT_PUBLIC_BASE_URL}/likeComment/opinions/${opinionId}/like-status`, 
        { ...likeData, liked: data.liked, likeCount: data.likeCount }, 
        false
      );
    } catch (error) {
      console.error('Like failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/likeComment/opinions/${opinionId}/comments`,
        { content: comment },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      
      setComment('');
      setCommentCount(data.commentCount);
      mutate(`${process.env.NEXT_PUBLIC_BASE_URL}/likeComment/opinions/${opinionId}/comments?page=1&limit=10`);
    } catch (error) {
      console.error('Comment failed:', error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        alert('Please login to comment');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateComment = async (commentId: string) => {
    if (!editCommentContent.trim()) return;
    
    setIsLoading(true);
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/likeComment/opinions/comments/${commentId}`,
        { content: editCommentContent },
        { withCredentials: true }
      );
      
      setEditingCommentId(null);
      setEditCommentContent('');
      setCommentCount(data.commentCount);
      mutate(`${process.env.NEXT_PUBLIC_BASE_URL}/likeComment/opinions/${opinionId}/comments?page=1&limit=10`);
    } catch (error) {
      console.error('Update comment failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;
    
    setIsLoading(true);
    try {
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/likeComment/opinions/comments/${commentId}`,
        { withCredentials: true }
      );
      
      setCommentCount(data.commentCount);
      mutate(`${process.env.NEXT_PUBLIC_BASE_URL}/likeComment/opinions/${opinionId}/comments?page=1&limit=10`);
    } catch (error) {
      console.error('Delete comment failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const startEditing = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditCommentContent(comment.content);
  };

  const cancelEditing = () => {
    setEditingCommentId(null);
    setEditCommentContent('');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-t border-b border-gray-100 py-3">
        {/* Like Button */}
        <motion.button
          whileTap={{ scale: 1.2 }}
          onClick={handleLike}
          disabled={isLoading}
          className={`flex items-center space-x-1 px-4 py-2 rounded-full transition-colors ${
            isLiked ? 'text-red-500' : 'text-gray-500 hover:text-gray-700'
          } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          aria-label={isLiked ? 'Unlike' : 'Like'}
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
          disabled={isLoading}
          className={`flex items-center space-x-1 px-4 py-2 rounded-full ${
            showCommentBox ? 'text-blue-500' : 'text-gray-500 hover:text-blue-500'
          } transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          aria-label={showCommentBox ? 'Hide comments' : 'Show comments'}
        >
          {showCommentBox ? <FaComment className="text-blue-500" /> : <FaRegComment />}
          <span className="text-sm font-medium">{commentCount}</span>
        </button>

        {/* Share Button */}
        <button
          onClick={onShare}
          disabled={isLoading}
          className={`flex items-center space-x-1 px-4 py-2 rounded-full text-gray-500 hover:text-green-500 transition-colors ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          aria-label="Share"
        >
          <FaShare />
          <span className="text-sm font-medium">Share</span>
        </button>

        {/* Options Button */}
        <button 
          disabled={isLoading}
          className={`p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          aria-label="More options"
        >
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
            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="space-y-3 mb-4">
              <div className="flex space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <FaUserAlt className="text-gray-500" />
                  </div>
                </div>
                <div className="flex-1">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent resize-none"
                    rows={2}
                    aria-label="Comment input"
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowCommentBox(false)}
                  disabled={isLoading}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!comment.trim() || isLoading}
                  className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                    comment.trim()
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  } ${isLoading ? 'opacity-50' : ''}`}
                >
                  {isLoading ? 'Posting...' : 'Post'}
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
              {commentsData?.comments?.map((comment: Comment) => (
                <div key={comment.id} className="flex space-x-3 group">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      {comment.user.image ? (
                        <img 
                          src={comment.user.image} 
                          alt={comment.user.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FaUserAlt className="text-gray-500 w-5 h-5" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1 relative">
                    {editingCommentId === comment.id ? (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <textarea
                          value={editCommentContent}
                          onChange={(e) => setEditCommentContent(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
                          rows={3}
                          aria-label="Edit comment"
                          disabled={isLoading}
                        />
                        <div className="flex justify-end space-x-2 mt-2">
                          <button
                            onClick={cancelEditing}
                            disabled={isLoading}
                            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 flex items-center"
                          >
                            <FaTimes className="mr-1" /> Cancel
                          </button>
                          <button
                            onClick={() => handleUpdateComment(comment.id)}
                            disabled={isLoading || !editCommentContent.trim()}
                            className={`px-3 py-1 text-sm rounded-lg flex items-center ${
                              editCommentContent.trim()
                                ? 'bg-blue-500 text-white hover:bg-blue-600'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            } ${isLoading ? 'opacity-50' : ''}`}
                          >
                            <FaCheck className="mr-1" /> {isLoading ? 'Saving...' : 'Save'}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-sm">{comment.user.name}</span>
                          <span className="text-xs text-gray-400">
                            {new Date(comment.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-700">{comment.content}</p>
                        
                        {currentUserId === comment.user.id && (
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                            <button
                              onClick={() => startEditing(comment)}
                              disabled={isLoading}
                              className="p-1 text-gray-500 hover:text-blue-500 transition-colors"
                              aria-label="Edit comment"
                            >
                              <FaEdit size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteComment(comment.id)}
                              disabled={isLoading}
                              className="p-1 text-gray-500 hover:text-red-500 transition-colors"
                              aria-label="Delete comment"
                            >
                              <FaTrash size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}