// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuthProvider } from '@/Providers/AuthProvider';
// import { useSocket } from '@/context/SocketContext';
// import { FiBell } from 'react-icons/fi';

// export default function AdminNotificationPanel({ onClose }: { onClose: () => void }) {
//   const { user } = useAuthProvider();
//   const { socket } = useSocket();
//   const [notifications, setNotifications] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       setIsLoading(true);
//       try {
//         const endpoint = user?.role === 'admin' 
//           ? `${process.env.NEXT_PUBLIC_BASE_URL}/notifications/admin` 
//           : `${process.env.NEXT_PUBLIC_BASE_URL}/notifications/user`;
        
//         const res = await fetch(endpoint, {
//           credentials: 'include',
          
//         });
        
//         const data = await res.json();
//         if (res.ok) {
//           setNotifications(data.notifications || []);
//         }
//       } catch (error) {
//         console.error('Error fetching notifications:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchNotifications();
//   }, [user]);

//   useEffect(() => {
//     if (!socket || !user) return;

//     const handleNewNotification = (notification: any) => {
//       setNotifications(prev => [notification, ...prev]);
//     };

//     socket.on('new_notification', handleNewNotification);

//     return () => {
//       socket.off('new_notification', handleNewNotification);
//     };
//   }, [socket, user]);

//   const handleViewOpinion = (opinionId: string) => {
//     router.push(user?.role === 'admin' 
//       ? `${process.env.NEXT_PUBLIC_BASE_URL}/admin/opinions/${opinionId}` 
//       : `${process.env.NEXT_PUBLIC_BASE_URL}/opinions/${opinionId}`);
//     onClose();
//   };

//   const markAsRead = async (notificationId: string) => {
//     try {
//       await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/notifications/${notificationId}/read`, {
//         method: 'POST',
//         credentials: 'include',
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       });
      
//       setNotifications(prev => 
//         prev.map(n => 
//           n.id === notificationId ? { ...n, read: true } : n
//         )
//       );
//     } catch (error) {
//       console.error('Error marking notification as read:', error);
//     }
//   };

//   return (
//     <div className="absolute right-0 mt-2 w-96 bg-white rounded-md shadow-lg z-50 border border-gray-200">
//       <div className="p-4 border-b border-gray-200">
//         <h3 className="text-lg font-medium text-gray-800">
//           {user?.role === 'admin' ? 'Admin' : 'My'} Notifications
//         </h3>
//       </div>
      
//       <div className="max-h-96 overflow-y-auto">
//         {isLoading ? (
//           <div className="p-4 text-center">Loading...</div>
//         ) : notifications.length === 0 ? (
//           <div className="p-4 text-center text-gray-500">No notifications</div>
//         ) : (
//           <ul>
//             {notifications.map((notification) => (
//               <li 
//                 key={notification.id} 
//                 className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
//                 onClick={() => {
//                   if (!notification.read) markAsRead(notification.id);
//                   if (notification.opinionId) handleViewOpinion(notification.opinionId);
//                 }}
//               >
//                 <div className={`p-4 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''}`}>
//                   <div className="flex justify-between items-start">
//                     <p className="text-sm text-gray-800">{notification.message}</p>
//                     {!notification.read && (
//                       <span className="inline-block h-2 w-2 rounded-full bg-blue-500"></span>
//                     )}
//                   </div>
//                   <p className="text-xs text-gray-500 mt-1">
//                     {new Date(notification.createdAt).toLocaleString()}
//                   </p>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
      
//       <div className="p-2 border-t border-gray-200 text-center">
//         <button
//           onClick={onClose}
//           className="text-sm text-blue-600 hover:text-blue-800"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// }