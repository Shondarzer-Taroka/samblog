/* eslint-disable @typescript-eslint/no-explicit-any */
// app/components/AdminNotificationPanel.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminNotificationPanel({ onClose }: { onClose: () => void }) {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notifications/admin`);
        const data = await res.json();
        if (res.ok) {
          setNotifications(data.notifications);
        }
      } catch (error) {
        console.error('Error fetching admin notifications:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleViewOpinion = (opinionId: string) => {
    router.push(`/admin/opinions/${opinionId}`);
    onClose();
  };

  return (
    <div className="absolute right-0 mt-2 w-96 bg-white rounded-md shadow-lg z-50 border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-800">Admin Notifications</h3>
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
                  {notification.type === 'OPINION_SUBMITTED' && (
                    <button
                      onClick={() => handleViewOpinion(notification.relatedId)}
                      className="mt-2 text-xs text-blue-600 hover:text-blue-800"
                    >
                      View Opinion
                    </button>
                  )}
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