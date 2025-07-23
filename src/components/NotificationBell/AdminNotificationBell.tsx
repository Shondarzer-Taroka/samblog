/* eslint-disable @typescript-eslint/no-explicit-any */
// app/components/AdminNotificationBell.tsx
'use client';

import { useEffect, useState } from 'react';
import { FiBell } from 'react-icons/fi';
import { useAuthProvider } from '@/Providers/AuthProvider';
import { useSocket } from '@/context/SocketContext';
import AdminNotificationPanel from './AdminNotificationPanel';


export default function AdminNotificationBell() {
  const { user } = useAuthProvider();
  const { socket } = useSocket();
  const [unreadCount, setUnreadCount] = useState(0);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'admin' || !socket) return;

    // Fetch initial unread count for admin
    const fetchUnreadCount = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notifications/admin/unread-count`);
        const data = await res.json();
        if (res.ok) {
          setUnreadCount(data.count);
        }
      } catch (error) {
        console.error('Error fetching admin unread count:', error);
      }
    };

    fetchUnreadCount();

    // Join admin room for real-time updates
    socket.emit('joinAdminRoom');

    // Listen for new admin notifications
    socket.on('newNotification', (notification: any) => {
      if (notification.isAdmin) {
        setUnreadCount(prev => prev + 1);
      }
    });

    return () => {
      socket.off('newNotification');
    };
  }, [user, socket]);

  const markAsRead = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notifications/admin/mark-as-read`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking admin notifications as read:', error);
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
        <AdminNotificationPanel onClose={() => setIsPanelOpen(false)} />
      )}
    </div>
  );
}