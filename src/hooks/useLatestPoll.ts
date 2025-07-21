/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'
import { useState, useEffect } from 'react';

interface Poll {
  id: string;
  question: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  totalVotes: number;
  options: {
    id: string;
    text: string;
    votes: number;
    percentage: number;
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
  const [voterId, setVoterId] = useState<string | null>(null);

  useEffect(() => {
    // Generate or get a unique voter ID (stored in localStorage)
    const storedVoterId = localStorage.getItem('voterId') ||
      Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem('voterId', storedVoterId);
    setVoterId(storedVoterId);
  }, []);

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

  const submitVote = async (optionId: string) => {
    if (!voterId) return { success: false, message: 'Voter ID not available' };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/poll/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          optionId,
          voterId
        })
      });

      const data = await response.json();
      if (data.success) {
        // Update local state with new vote counts
        setLatestPoll(prev => {
          if (!prev) return null;
          return {
            ...prev,
            totalVotes: data.data.totalVotes,
            options: prev.options.map(option => {
              const updatedOption = data.data.options.find((o: any) => o.id === option.id);
              return updatedOption || option;
            })
          };
        });
      }
      return data;
    } catch (err) {
      return {
        success: false,
        message: err instanceof Error ? err.message : 'Failed to submit vote'
      };
    }
  };

  useEffect(() => {
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

  return {
    latestPoll,
    loading,
    error,
    formatDate,
    isActive,
    submitVote,
    voterId,
    refetch: fetchLatestPoll
  };
};

export default useLatestPoll;