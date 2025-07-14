/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import ProfileForm from '@/components/Authentication/ProfileForm';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useToast } from '@/hooks/useToast';
import { useAuthProvider } from '@/Providers/AuthProvider';
import Toast from '@/share/Toast';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';


interface UserData {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    division?: string;
    district?: string;
    thana?: string;
    union?: string;
    postCode?: string;
    image?: string;
}

const ProfilePage = () => {
    const { user } = useAuthProvider();
    const { showToast, toast, hideToast } = useToast();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams()


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (!user?.id) return;

                setLoading(true);
                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/users/singleUserInfo/${user.id}`,
                    { withCredentials: true }
                );

                setUserData(res.data.user);
            } catch (err) {
                console.error('Failed to fetch user data:', err);
                showToast('error', 'Failed to load profile data');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [user?.id, showToast]);

    const handleUpdate = async (formData: any) => {
        try {
            if (!user?.id) return;

            setLoading(true);
            const res = await axios.put(
                `${process.env.NEXT_PUBLIC_BASE_URL}/users/updateUser/${id}`,
                formData,
                { withCredentials: true }
            );

            setUserData(res.data.user);
            showToast('success', 'Profile updated successfully');
        } catch (err) {
            console.error('Failed to update profile:', err);
            showToast('error', 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    if (loading || !userData) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold text-center mb-8">আপনার প্রোফাইল</h1>
            <div className="max-w-2xl mx-auto">
                <ProfileForm
                    initialData={userData}
                    onSubmit={handleUpdate}
                    isUpdate={true}
                    loadingText="আপডেট হচ্ছে..."
                />
            </div>
            {toast && (
                <Toast type={toast.type} message={toast.message} onClose={hideToast} />
            )}
        </div>
    );
};

export default ProfilePage;