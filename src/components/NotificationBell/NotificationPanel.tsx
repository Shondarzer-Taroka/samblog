/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { useAuthProvider } from '@/Providers/AuthProvider';
import { useSocket } from '@/context/SocketContext';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url, { credentials: 'include' }).then(res => res.json());

interface NotificationPanelProps {
  onClose: () => void;
  unreadCount: number;
  onMarkAllRead: () => void;
}

export default function NotificationPanel({ 
  onClose, 
  unreadCount,
  onMarkAllRead
}: NotificationPanelProps) {
  const { user } = useAuthProvider();
  const { socket } = useSocket();
  const [localUnreadCount, setLocalUnreadCount] = useState(unreadCount);

  // Fetch notifications using SWR
  const { data: notificationsData, mutate: mutateNotifications } = useSWR(
    user ? `${process.env.NEXT_PUBLIC_BASE_URL}/notifications?userId=${user.id}` : null,
    fetcher
  );

  const notifications = notificationsData?.notifications || [];

  // Socket for real-time updates
  useEffect(() => {
    if (!socket || !user) return;

    const handleNewNotification = (notification: any) => {
      if (notification.userId === user.id) {
        // Optimistically update notifications
        mutateNotifications({ notifications: [notification, ...notifications] }, false);
        setLocalUnreadCount(prev => prev + 1);
      }
    };

    socket.on('newNotification', handleNewNotification);
    return () => {
      socket.off('newNotification', handleNewNotification);
    };
  }, [socket, user, notifications]);

  const markAsRead = async (notificationId: string) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/notifications/${notificationId}/read`, {
        method: 'POST',
        credentials: 'include'
      });

      // Optimistic update
      mutateNotifications({
        notifications: notifications.map((n: { id: string; }) => 
          n.id === notificationId ? { ...n, read: true } : n
        )
      }, false);
      
      setLocalUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50 border border-gray-200">
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-800">
          Notifications
          {localUnreadCount > 0 && (
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({localUnreadCount} unread)
            </span>
          )}
        </h3>
        <div className="flex gap-2">
          {localUnreadCount > 0 && (
            <button
              onClick={onMarkAllRead}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              Mark all read
            </button>
          )}
          <button
            onClick={onClose}
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
            {notifications.map((notification: any) => (
              <li 
                key={notification.id}
                className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                onClick={() => !notification.read && markAsRead(notification.id)}
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
  );
}