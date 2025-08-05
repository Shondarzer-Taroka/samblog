'use client';

import React, { useState } from 'react';

import LikeComment from './LikeComment';
import { useAuthProvider } from '@/Providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { useAlert } from '@/hooks/useAlert';

interface LikeCommentWrapperProps {
    entityId: string;
    entityType: 'news' | 'opinion';
    initialLikes: number;
    initialComments: number;
    initialIsLiked: boolean;
    title: string;
    text: string;
}

export default function LikeCommentWrapper({
    entityId,
    entityType,
    initialLikes,
    initialComments,
    initialIsLiked,
    text,
    title
}: LikeCommentWrapperProps) {
    const { user } = useAuthProvider();
    const currentUserId = user?.id;
    const router = useRouter()
    const [showShareOptions, setShowShareOptions] = useState(false);
  const { showAlert, AlertDialog } = useAlert();
    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: title,
                text: text.substring(0, 100) + '...',
                url: window.location.href,
            }).catch(err => console.log('Error sharing:', err));
        } else {
            setShowShareOptions(!showShareOptions);
        }
    };
    return (
        <LikeComment
            entityId={entityId}
            entityType={entityType}
            initialLikes={initialLikes}
            initialComments={initialComments}
            initialIsLiked={initialIsLiked}
            currentUserId={currentUserId}
            onUnauthorized={() => {
                router.push('/login')
            }}
            handleShare={handleShare}
        />
    );
}
