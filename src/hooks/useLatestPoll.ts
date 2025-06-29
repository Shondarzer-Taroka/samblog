'use client'
import { useState, useEffect } from 'react';

interface Poll {
  id: string;
  question: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  options: {
    id: string;
    text: string;
  }[];
  user: {
    id: string;
    name: string;
    email: string;
    image: string | null;
  };
}

const useLatestPoll = () => {
  const [latestPoll, setLatestPoll] = useState<Poll | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestPoll = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/poll/getLatestPoll`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch latest poll');
        }

        const data = await response.json();
        if (data.success) {
          setLatestPoll(data.data);
        } else {
          throw new Error(data.message || 'No poll found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchLatestPoll();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const isActive = (endDate: string) => {
    const now = new Date();
    const end = new Date(endDate);
    return now < end;
  };

  return { latestPoll, loading, error, formatDate, isActive };
};

export default useLatestPoll;