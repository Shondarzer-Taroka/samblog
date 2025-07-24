/* eslint-disable @typescript-eslint/no-explicit-any */
// app/components/NotificationBell.tsx
'use client';

import { useEffect, useState } from 'react';
import { FiBell } from 'react-icons/fi';
import { useAuthProvider } from '@/Providers/AuthProvider';
import { useSocket } from '@/context/SocketContext';
import NotificationPanel from './NotificationPanel';


export default function NotificationBell() {
  const { user } = useAuthProvider();
  const { socket } = useSocket();
  const [unreadCount, setUnreadCount] = useState(0);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    if (!user || !socket) return;

    // Fetch initial unread count
    const fetchUnreadCount = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/notifications/unread-count?userId=${user.id}`);
        const data = await res.json();
        if (res.ok) {
          setUnreadCount(data.count);
        }
      } catch (error) {
        console.error('Error fetching unread count:', error);
      }
    };

    fetchUnreadCount();

    // Join user's room for real-time updates
    socket.emit('joinUserRoom', user.id);

    // Listen for new notifications
    socket.on('newNotification', (notification: any) => {
      if (notification.userId === user.id && !notification.isAdmin) {
        setUnreadCount(prev => prev + 1);
      }
    });

    return () => {
      socket.off('newNotification');
    };
  }, [user, socket]);

  const markAsRead = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/notifications/mark-as-read`, {
        method: 'POST',
        credentials:'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user?.id }),
      });
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking notifications as read:', error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => {
          setIsPanelOpen(!isPanelOpen);
          if (isPanelOpen) {
            markAsRead();
          }
        }}
        className="p-2 rounded-full hover:bg-gray-100 relative"
      >
        <FiBell className="text-xl text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>
      
      {isPanelOpen && (
        <NotificationPanel onClose={() => setIsPanelOpen(false)} />
      )}
    </div>
  );
}