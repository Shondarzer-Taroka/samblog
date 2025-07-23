/* eslint-disable @typescript-eslint/no-explicit-any */
// app/components/NotificationPanel.tsx
'use client';

import { useEffect, useState } from 'react';
import { useAuthProvider } from '@/Providers/AuthProvider';

export default function NotificationPanel({ onClose }: { onClose: () => void }) {
  const { user } = useAuthProvider();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchNotifications = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notifications?userId=${user.id}`);
        const data = await res.json();
        if (res.ok) {
          setNotifications(data.notifications);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, [user]);

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50 border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-800">Notifications</h3>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {isLoading ? (
          <div className="p-4 text-center">Loading...</div>
        ) : notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No notifications</div>
        ) : (
          <ul>
            {notifications.map((notification) => (
              <li key={notification.id} className="border-b border-gray-100 last:border-0">
                <div className={`p-4 ${!notification.isRead ? 'bg-blue-50' : ''}`}>
                  <p className="text-sm text-gray-800">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <div className="p-2 border-t border-gray-200 text-center">
        <button
          onClick={onClose}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Close
        </button>
      </div>
    </div>
  );
}