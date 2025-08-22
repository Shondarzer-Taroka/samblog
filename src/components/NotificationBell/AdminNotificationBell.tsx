/* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable @typescript-eslint/no-explicit-any */


// 'use client';

// import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuthProvider } from '@/Providers/AuthProvider';
// import { useSocket } from '@/context/SocketContext';
// import { FaBell } from 'react-icons/fa';
// import useSWR from 'swr';

// const fetcher = (url: string) => fetch(url, { credentials: 'include' }).then(res => res.json());

// export default function AdminNotificationBell() {
//   const { user } = useAuthProvider();
//   const { socket } = useSocket();
//   const [visible, setVisible] = useState(false);
//   const router = useRouter();

//   // Fetch notifications and unread count using SWR
//   const { data: notificationsData, mutate: mutateNotifications } = useSWR(
//     user?.role === 'admin' ? `${process.env.NEXT_PUBLIC_BASE_URL}/notifications/admin` : null,
//     fetcher,
//     { refreshInterval: 60000 } // Refresh every minute
//   );

//   const { data: countData, mutate: mutateCount } = useSWR(
//     user?.role === 'admin' ? `${process.env.NEXT_PUBLIC_BASE_URL}/notifications/admin/unread-count` : null,
//     fetcher
//   );

//   const notifications = notificationsData?.notifications || [];
//   const unreadCount = countData?.count || 0;

//   // Socket listeners for real-time updates
//   useEffect(() => {
//     if (!socket || !user || user.role !== 'admin') return;

//     const handleNewNotification = (notification: any) => {
//       mutateNotifications({ notifications: [notification, ...notifications] }, false);
//       mutateCount({ count: unreadCount + 1 }, false);
//     };

//     const handleCountUpdate = ({ count }: { count: number }) => {
//       mutateCount({ count }, false);
//     };

//     socket.on('new_admin_notification', handleNewNotification);
//     socket.on('admin_notification_count', handleCountUpdate);

//     return () => {
//       socket.off('new_admin_notification', handleNewNotification);
//       socket.off('admin_notification_count', handleCountUpdate);
//     };
//   }, [socket, user, notifications, unreadCount]);

//   const handleViewOpinion = (opinionId: string) => {
//     router.push(`/admin/opinions/${opinionId}`);
//     setVisible(false);
//   };

//   const markAsRead = async (notificationId: string) => {
//     try {
//       await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/notifications/${notificationId}/read`, {
//         method: 'POST',
//         credentials: 'include',
//       });

//       mutateNotifications({
//         notifications: notifications.map((n: { id: string; }) => 
//           n.id === notificationId ? { ...n, read: true } : n
//         )
//       }, false);
      
//       mutateCount({ count: Math.max(0, unreadCount - 1) }, false);
//     } catch (error) {
//       console.error('Error marking notification as read:', error);
//     }
//   };

//   const markAllAsRead = async () => {
//     try {
//       await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/notifications/mark-as-read`, {
//         method: 'POST',
//         credentials: 'include',
//       });
      
//       mutateNotifications({
//         notifications: notifications.map((n: any) => ({ ...n, read: true }))
//       }, false);
      
//       mutateCount({ count: 0 }, false);
//     } catch (error) {
//       console.error('Error marking all as read:', error);
//     }
//   };

//   return (
//     <div className="relative">
//       <button
//         className="relative p-2 text-gray-700 hover:text-blue-600"
//         onClick={() => setVisible(!visible)}
//         aria-label="Notifications"
//       >
//         <FaBell className="w-5 h-5" />
//         {unreadCount > 0 && (
//           <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
//             {unreadCount > 99 ? '99+' : unreadCount}
//           </span>
//         )}
//       </button>

//       {visible && (
//         <div className="absolute right-0 mt-2 w-96 bg-white rounded-md shadow-xl z-50 border border-gray-200">
//           <div className="flex justify-between items-center p-4 border-b border-gray-200">
//             <h3 className="text-lg font-medium text-gray-800">
//               Admin Notifications
//               {unreadCount > 0 && (
//                 <span className="ml-2 text-sm font-normal text-gray-500">
//                   ({unreadCount} unread)
//                 </span>
//               )}
//             </h3>
//             <div className="flex gap-2">
//               {unreadCount > 0 && (
//                 <button
//                   onClick={markAllAsRead}
//                   className="text-xs text-blue-600 hover:text-blue-800"
//                 >
//                   Mark all read
//                 </button>
//               )}
//               <button
//                 onClick={() => setVisible(false)}
//                 className="text-gray-500 hover:text-gray-800"
//                 aria-label="Close"
//               >
//                 ×
//               </button>
//             </div>
//           </div>

//           <div className="max-h-96 overflow-y-auto">
//             {!notificationsData ? (
//               <div className="p-4 text-center">Loading...</div>
//             ) : notifications.length === 0 ? (
//               <div className="p-4 text-center text-gray-500">No notifications</div>
//             ) : (
//               <ul>
//                 {notifications.map((notification: { id: Key | null | undefined; read: any; opinionId: string; message: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; createdAt: string | number | Date; }) => (
                 
//                   <li
//                     key={notification.id}
//                     className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
//                     onClick={() => {
//                       if (!notification.read) markAsRead(notification.id );
//                       if (notification.opinionId) handleViewOpinion(notification.opinionId);
//                     }}
//                   >
//                     <div className={`p-4 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''}`}>
//                       <div className="flex justify-between items-start">
//                         <p className="text-sm text-gray-800">{notification.message}</p>
//                         {!notification.read && (
//                           <span className="inline-block h-2 w-2 rounded-full bg-blue-500"></span>
//                         )}
//                       </div>
//                       <p className="text-xs text-gray-500 mt-1">
//                         {new Date(notification.createdAt).toLocaleString()}
//                       </p>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }








'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthProvider } from '@/Providers/AuthProvider';
import { useSocket } from '@/context/SocketContext';
import { FaBell } from 'react-icons/fa';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url, { credentials: 'include' }).then(res => res.json());

type Notification = {
  id: string;
  read: boolean;
  opinionId: string;
  message: React.ReactNode;
  createdAt: string;
};

export default function AdminNotificationBell() {
  const { user } = useAuthProvider();
  const { socket } = useSocket();
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  const { data: notificationsData, mutate: mutateNotifications } = useSWR(
    user?.role === 'admin' ? `${process.env.NEXT_PUBLIC_BASE_URL}/notifications/admin` : null,
    fetcher,
    { refreshInterval: 60000 }
  );

  const { data: countData, mutate: mutateCount } = useSWR(
    user?.role === 'admin' ? `${process.env.NEXT_PUBLIC_BASE_URL}/notifications/admin/unread-count` : null,
    fetcher
  );

  const notifications: Notification[] = notificationsData?.notifications || [];
  const unreadCount: number = countData?.count || 0;

  useEffect(() => {
    if (!socket || !user || user.role !== 'admin') return;

    const handleNewNotification = (notification: Notification) => {
      mutateNotifications({ notifications: [notification, ...notifications] }, false);
      mutateCount({ count: unreadCount + 1 }, false);
    };

    const handleCountUpdate = ({ count }: { count: number }) => {
      mutateCount({ count }, false);
    };

    socket.on('new_admin_notification', handleNewNotification);
    socket.on('admin_notification_count', handleCountUpdate);

    return () => {
      socket.off('new_admin_notification', handleNewNotification);
      socket.off('admin_notification_count', handleCountUpdate);
    };
  }, [socket, user, notifications, unreadCount]);

  const handleViewOpinion = (opinionId: string) => {
    router.push(`/news/dashboard/opinions/${opinionId}`);
    setVisible(false);
  };

  const markAsRead = async (notificationId: string) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/notifications/${notificationId}/read`, {
        method: 'POST',
        credentials: 'include',
      });

      mutateNotifications({
        notifications: notifications.map(n =>
          n.id === notificationId ? { ...n, read: true } : n
        ),
      }, false);

      mutateCount({ count: Math.max(0, unreadCount - 1) }, false);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/notifications/mark-as-read`, {
        method: 'POST',
        credentials: 'include',
      });

      mutateNotifications({
        notifications: notifications.map(n => ({ ...n, read: true })),
      }, false);

      mutateCount({ count: 0 }, false);
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  return (
    <div className="relative">
      <button
        className="relative p-2 text-gray-700 hover:text-blue-600"
        onClick={() => setVisible(!visible)}
        aria-label="Notifications"
      >
        <FaBell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {visible && (
        <div className="absolute max-[529px]:-right-[100px] right-0 mt-2 max-[529px]:w-[320px] w-96 bg-white rounded-md shadow-xl z-50 border border-gray-200">
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-800">
              Admin Notifications
              {unreadCount > 0 && (
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({unreadCount} unread)
                </span>
              )}
            </h3>
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  Mark all read
                </button>
              )}
              <button
                onClick={() => setVisible(false)}
                className="text-gray-500 hover:text-gray-800"
                aria-label="Close"
              >
                ×
              </button>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {!notificationsData ? (
              <div className="p-4 text-center">Loading...</div>
            ) : notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No notifications</div>
            ) : (
              <ul>
                {notifications
                  .filter((notification) => typeof notification.id === 'string')
                  .map((notification) => (
                    <li
                      key={notification.id}
                      className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                      onClick={() => {
                        if (!notification.read) markAsRead(notification.id);
                        if (notification.opinionId) handleViewOpinion(notification.opinionId);
                      }}
                    >
                      <div className={`p-4 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''}`}>
                        <div className="flex justify-between items-start">
                          <p className="text-sm text-gray-800">{notification.message}</p>
                          {!notification.read && (
                            <span className="inline-block h-2 w-2 rounded-full bg-blue-500"></span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(notification.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
