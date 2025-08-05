// /* eslint-disable @next/next/no-img-element */

// 'use client'
// import { useState, useEffect } from 'react';
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
// import useSWR from 'swr';
// import axios from 'axios';
// import { formatBengaliDate } from '@/utils/formatBengaliDate';

// interface LikeCommentProps {
//   opinionId: string;
//   initialLikes: number;
//   initialComments: number;
//   initialIsLiked: boolean;
//   currentUserId?: string;
//   onUnauthorized?: () => void;
//   handleShare:()=> void;
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

// const fetcher = (url: string) => axios.get(url, { withCredentials: true }).then(res => res.data);

// export default function LikeComment({
//   opinionId,
//   initialLikes = 0,
//   initialComments = 0,
//   initialIsLiked = false,
//   currentUserId,
//   onUnauthorized,
//   handleShare
// }: LikeCommentProps) {
//   const [localLiked, setLocalLiked] = useState(initialIsLiked);
//   const [localLikes, setLocalLikes] = useState(initialLikes);
//   const [localComments, setLocalComments] = useState(initialComments);
//   const [showCommentBox, setShowCommentBox] = useState(false);
//   const [commentContent, setCommentContent] = useState('');
//   const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
//   const [editCommentContent, setEditCommentContent] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   // Fetch like status
//   const { data: likeData, mutate: mutateLike } = useSWR(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/likeComment/opinions/${opinionId}/like-status`,
//     fetcher,
//     {
//       revalidateOnFocus: true,
//       fallbackData: { 
//         liked: initialIsLiked, 
//         likeCount: initialLikes,
//         success: true 
//       }
//     }
//   );

//   // Fetch comments
//   const { data: commentsData, mutate: mutateComments } = useSWR(
//     showCommentBox ? `${process.env.NEXT_PUBLIC_BASE_URL}/likeComment/opinions/${opinionId}/comments?page=1&limit=10` : null,
//     fetcher
//   );

//   useEffect(() => {
//     if (likeData?.success) {
//       setLocalLiked(likeData.liked);
//       setLocalLikes(likeData.likeCount);
//     }
//   }, [likeData]);

//   const handleLike = async () => {
//     if (isLoading) return;
    
//     if (!currentUserId) {
//       onUnauthorized?.();
//       return;
//     }

//     setIsLoading(true);
//     try {
//       // Optimistic update
//       const newLikedState = !localLiked;
//       const newLikeCount = newLikedState ? localLikes + 1 : localLikes - 1;
      
//       setLocalLiked(newLikedState);
//       setLocalLikes(newLikeCount);
      
//       // Make API call
//       const { data } = await axios.post(
//         `${process.env.NEXT_PUBLIC_BASE_URL}/likeComment/opinions/${opinionId}/like`,
//         {},
//         { withCredentials: true }
//       );

//       if (data.success) {
//         mutateLike(data, false);
//       } else {
//         // Revert if failed
//         setLocalLiked(!newLikedState);
//         setLocalLikes(newLikedState ? newLikeCount - 1 : newLikeCount + 1);
//       }
//     } catch (error) {
//       console.error('Like action failed:', error);
//       setLocalLiked(!localLiked);
//       setLocalLikes(localLiked ? localLikes - 1 : localLikes + 1);
      
//       if (axios.isAxiosError(error) && error.response?.status === 401) {
//         onUnauthorized?.();
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCommentSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!commentContent.trim()) return;

//     setIsLoading(true);
//     try {
//       const { data } = await axios.post(
//         `${process.env.NEXT_PUBLIC_BASE_URL}/likeComment/opinions/${opinionId}/comments`,
//         { content: commentContent },
//         { withCredentials: true }
//       );

//       setCommentContent('');
//       setLocalComments(data.commentCount);
//       mutateComments();
//     } catch (error) {
//       console.error('Comment failed:', error);
//       if (axios.isAxiosError(error) && error.response?.status === 401) {
//         onUnauthorized?.();
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleUpdateComment = async (commentId: string) => {
//     if (!editCommentContent.trim()) return;
    
//     setIsLoading(true);
//     try {
//       const { data } = await axios.put(
//         `${process.env.NEXT_PUBLIC_BASE_URL}/likeComment/opinions/comments/${commentId}`,
//         { content: editCommentContent },
//         { withCredentials: true }
//       );
      
//       setEditingCommentId(null);
//       setEditCommentContent('');
//       setLocalComments(data.commentCount);
//       mutateComments();
//     } catch (error) {
//       console.error('Update comment failed:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDeleteComment = async (commentId: string) => {
//     if (!window.confirm('Are you sure you want to delete this comment?')) return;
    
//     setIsLoading(true);
//     try {
//       const { data } = await axios.delete(
//         `${process.env.NEXT_PUBLIC_BASE_URL}/likeComment/opinions/comments/${commentId}`,
//         { withCredentials: true }
//       );
      
//       setLocalComments(data.commentCount);
//       mutateComments();
//     } catch (error) {
//       console.error('Delete comment failed:', error);
//     } finally {
//       setIsLoading(false);
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
//           whileTap={{ scale: currentUserId ? 1.1 : 1 }}
//           onClick={handleLike}
//           disabled={isLoading}
//           className={`flex items-center space-x-1 px-4 py-2 rounded-full transition-colors ${
//             localLiked ? 'text-red-500' : 'text-gray-500 hover:text-gray-700'
//           } ${
//             isLoading ? 'opacity-70 cursor-not-allowed' : 
//             currentUserId ? 'cursor-pointer' : 'cursor-default'
//           }`}
//           aria-label={localLiked ? 'Unlike' : 'Like'}
//         >
//           {localLiked ? (
//             <motion.div
//               initial={{ scale: 0.8 }}
//               animate={{ scale: 1 }}
//               transition={{ type: 'spring', stiffness: 500 }}
//             >
//               <FaHeart className="text-red-500" />
//             </motion.div>
//           ) : (
//             <FaRegHeart />
//           )}
//           <span className="text-sm font-medium">{localLikes}</span>
//         </motion.button>

//         {/* Comment Button */}
//         <button
//           onClick={() => setShowCommentBox(!showCommentBox)}
//           disabled={isLoading}
//           className={`flex items-center space-x-1 px-4 py-2 rounded-full ${
//             showCommentBox ? 'text-blue-500' : 'text-gray-500 hover:text-blue-500'
//           } transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
//           aria-label={showCommentBox ? 'Hide comments' : 'Show comments'}
//         >
//           {showCommentBox ? <FaComment className="text-blue-500" /> : <FaRegComment />}
//           <span className="text-sm font-medium">{localComments}</span>
//         </button>

//         {/* Share Button */}
//         <button
//           className="flex items-center space-x-1 px-4 py-2 rounded-full text-gray-500 hover:text-green-500 transition-colors"
//           aria-label="Share"
//           onClick={handleShare}
//         >
//           <FaShare />
//           <span className="text-sm font-medium">Share</span>
//         </button>

//         {/* Options Button */}
//         <button 
//           className="hidden p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
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
//             {currentUserId && (
//               <form onSubmit={handleCommentSubmit} className="space-y-3 mb-4">
//                 <div className="flex space-x-3">
//                   <div className="flex-shrink-0">
//                     <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
//                       <FaUserAlt className="text-gray-500" />
//                     </div>
//                   </div>
//                   <div className="flex-1">
//                     <textarea
//                       value={commentContent}
//                       onChange={(e) => setCommentContent(e.target.value)}
//                       placeholder="Write a comment..."
//                       className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent resize-none"
//                       rows={2}
//                       disabled={isLoading}
//                     />
//                   </div>
//                 </div>
//                 <div className="flex justify-end space-x-2">
//                   <button
//                     type="button"
//                     onClick={() => setShowCommentBox(false)}
//                     disabled={isLoading}
//                     className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={!commentContent.trim() || isLoading}
//                     className={`px-4 py-2 text-sm rounded-lg transition-colors ${
//                       commentContent.trim()
//                         ? 'bg-blue-500 text-white hover:bg-blue-600'
//                         : 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                     } ${isLoading ? 'opacity-70' : ''}`}
//                   >
//                     {isLoading ? 'Posting...' : 'Post'}
//                   </button>
//                 </div>
//               </form>
//             )}

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
//                         <FaUserAlt className="text-gray-500" />
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
//                           disabled={isLoading}
//                         />
//                         <div className="flex justify-end space-x-2 mt-2">
//                           <button
//                             onClick={cancelEditing}
//                             disabled={isLoading}
//                             className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 flex items-center"
//                           >
//                             <FaTimes className="mr-1" /> Cancel
//                           </button>
//                           <button
//                             onClick={() => handleUpdateComment(comment.id)}
//                             disabled={!editCommentContent.trim() || isLoading}
//                             className={`px-3 py-1 text-sm rounded-lg flex items-center ${
//                               editCommentContent.trim()
//                                 ? 'bg-blue-500 text-white hover:bg-blue-600'
//                                 : 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                             } ${isLoading ? 'opacity-70' : ''}`}
//                           >
//                             <FaCheck className="mr-1" /> {isLoading ? 'Saving...' : 'Save'}
//                           </button>
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="bg-gray-50 p-3 rounded-lg">
//                         <div className="flex items-center space-x-2">
//                           <span className="font-medium text-sm">{comment.user.name}</span>
//                           <span className="text-xs text-gray-400">
//                             {formatBengaliDate(comment.createdAt)}
//                             {/* {new Date(comment.createdAt).toLocaleString()} */}
//                           </span>
//                         </div>
//                         <p className="mt-1 text-sm text-gray-700">{comment.content}</p>
                        
//                         {currentUserId === comment.user.id && (
//                           <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
//                             <button
//                               onClick={() => startEditing(comment)}
//                               disabled={isLoading}
//                               className="p-1 text-gray-500 hover:text-blue-500 transition-colors"
//                             >
//                               <FaEdit size={14} />
//                             </button>
//                             <button
//                               onClick={() => handleDeleteComment(comment.id)}
//                               disabled={isLoading}
//                               className="p-1 text-gray-500 hover:text-red-500 transition-colors"
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































/* eslint-disable @next/next/no-img-element */

'use client'
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
import useSWR from 'swr';
import axios from 'axios';
import { formatBengaliDate } from '@/utils/formatBengaliDate';
import { useAlert } from '@/hooks/useAlert';

type EntityType = 'opinion' | 'news';

interface LikeCommentProps {
  entityId: string;
  entityType: EntityType;
  initialLikes: number;
  initialComments: number;
  initialIsLiked: boolean;
  currentUserId?: string;
  onUnauthorized?: () => void;
  handleShare?: () => void;
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

const fetcher = (url: string) => axios.get(url, { withCredentials: true }).then(res => res.data);

export default function LikeComment({
  entityId,
  entityType,
  initialLikes = 0,
  initialComments = 0,
  initialIsLiked = false,
  currentUserId,
  onUnauthorized,
  handleShare
}: LikeCommentProps) {
  const [localLiked, setLocalLiked] = useState(initialIsLiked);
  const [localLikes, setLocalLikes] = useState(initialLikes);
  const [localComments, setLocalComments] = useState(initialComments);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentContent, setCommentContent] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editCommentContent, setEditCommentContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { showAlert, AlertDialog } = useAlert();
  
  // Fetch like status
  const { data: likeData, mutate: mutateLike } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/likeComment/${entityType}/${entityId}/like-status`,
    fetcher,
    {
      revalidateOnFocus: true,
      fallbackData: { 
        liked: initialIsLiked, 
        likeCount: initialLikes,
        success: true 
      }
    }
  );

  // Fetch comments
  const { data: commentsData, mutate: mutateComments } = useSWR(
    showCommentBox ? `${process.env.NEXT_PUBLIC_BASE_URL}/likeComment/${entityType}/${entityId}/comments?page=1&limit=10` : null,
    fetcher
  );

  useEffect(() => {
    if (likeData?.success) {
      setLocalLiked(likeData.liked);
      setLocalLikes(likeData.likeCount);
    }
  }, [likeData]);

  const handleLike = async () => {
    if (isLoading) return;
    
    if (!currentUserId) {
        showAlert('warning', {
          title: 'সতর্কতা',
          message: 'আপনাকে লগইন করতে হবে',
          confirmText:'লগইন করুন',
          onConfirm() {
            
          },
        });
      onUnauthorized?.();
      return;
    }

    setIsLoading(true);
    try {
      // Optimistic update
      const newLikedState = !localLiked;
      const newLikeCount = newLikedState ? localLikes + 1 : localLikes - 1;
      
      setLocalLiked(newLikedState);
      setLocalLikes(newLikeCount);
      
      // Make API call
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/likeComment/${entityType}/${entityId}/like`,
        {},
        { withCredentials: true }
      );

      if (data.success) {
        mutateLike(data, false);
      } else {
        // Revert if failed
        setLocalLiked(!newLikedState);
        setLocalLikes(newLikedState ? newLikeCount - 1 : newLikeCount + 1);
      }
    } catch (error) {
      console.error('Like action failed:', error);
      setLocalLiked(!localLiked);
      setLocalLikes(localLiked ? localLikes - 1 : localLikes + 1);
      
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        onUnauthorized?.();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentContent.trim()) return;

    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/likeComment/${entityType}/${entityId}/comments`,
        { content: commentContent },
        { withCredentials: true }
      );

      setCommentContent('');
      setLocalComments(data.commentCount);
      mutateComments();
    } catch (error) {
      console.error('Comment failed:', error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        onUnauthorized?.();
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
        `${process.env.NEXT_PUBLIC_BASE_URL}/likeComment/comments/${commentId}`,
        { content: editCommentContent },
        { withCredentials: true }
      );
      
      setEditingCommentId(null);
      setEditCommentContent('');
      setLocalComments(data.commentCount);
      mutateComments();
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
        `${process.env.NEXT_PUBLIC_BASE_URL}/likeComment/comments/${commentId}`,
        { withCredentials: true }
      );
      
      setLocalComments(data.commentCount);
      mutateComments();
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
      <AlertDialog/>
      <div className="flex items-center justify-between border-t border-b border-gray-100 py-3">
        {/* Like Button */}
        <motion.button
          whileTap={{ scale: currentUserId ? 1.1 : 1 }}
          onClick={handleLike}
          disabled={isLoading}
          className={`flex items-center space-x-1 px-4 py-2 rounded-full transition-colors ${
            localLiked ? 'text-red-500' : 'text-gray-500 hover:text-gray-700'
          } ${
            isLoading ? 'opacity-70 cursor-not-allowed' : 
            currentUserId ? 'cursor-pointer' : 'cursor-default'
          }`}
          aria-label={localLiked ? 'Unlike' : 'Like'}
        >
          {localLiked ? (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500 }}
            >
              <FaHeart className="text-red-500" />
            </motion.div>
          ) : (
            <FaRegHeart />
          )}
          <span className="text-sm font-medium">{localLikes}</span>
        </motion.button>

        {/* Comment Button */}
        <button
          onClick={() => setShowCommentBox(!showCommentBox)}
          disabled={isLoading}
          className={`flex items-center space-x-1 px-4 py-2 rounded-full ${
            showCommentBox ? 'text-blue-500' : 'text-gray-500 hover:text-blue-500'
          } transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
          aria-label={showCommentBox ? 'Hide comments' : 'Show comments'}
        >
          {showCommentBox ? <FaComment className="text-blue-500" /> : <FaRegComment />}
          <span className="text-sm font-medium">{localComments}</span>
        </button>

        {/* Share Button */}
        {handleShare && (
          <button
            className="flex items-center space-x-1 px-4 py-2 rounded-full text-gray-500 hover:text-green-500 transition-colors"
            aria-label="Share"
            onClick={handleShare}
          >
            <FaShare />
            <span className="text-sm font-medium">Share</span>
          </button>
        )}

        {/* Options Button */}
        <button 
          className="hidden p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
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
            {currentUserId && (
              <form onSubmit={handleCommentSubmit} className="space-y-3 mb-4">
                <div className="flex space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <FaUserAlt className="text-gray-500" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={commentContent}
                      onChange={(e) => setCommentContent(e.target.value)}
                      placeholder="Write a comment..."
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent resize-none"
                      rows={2}
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
                    disabled={!commentContent.trim() || isLoading}
                    className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                      commentContent.trim()
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    } ${isLoading ? 'opacity-70' : ''}`}
                  >
                    {isLoading ? 'Posting...' : 'Post'}
                  </button>
                </div>
              </form>
            )}

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
                        <FaUserAlt className="text-gray-500" />
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
                            disabled={!editCommentContent.trim() || isLoading}
                            className={`px-3 py-1 text-sm rounded-lg flex items-center ${
                              editCommentContent.trim()
                                ? 'bg-blue-500 text-white hover:bg-blue-600'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            } ${isLoading ? 'opacity-70' : ''}`}
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
                            {formatBengaliDate(comment.createdAt)}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-700">{comment.content}</p>
                        
                        {currentUserId === comment.user.id && (
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                            <button
                              onClick={() => startEditing(comment)}
                              disabled={isLoading}
                              className="p-1 text-gray-500 hover:text-blue-500 transition-colors"
                            >
                              <FaEdit size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteComment(comment.id)}
                              disabled={isLoading}
                              className="p-1 text-gray-500 hover:text-red-500 transition-colors"
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