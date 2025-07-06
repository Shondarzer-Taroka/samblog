'use client'

import { useAuthProvider } from '@/Providers/AuthProvider';
import { useState, useRef, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { CldUploadButton, CldUploadWidgetResults } from 'next-cloudinary';
import { toast } from 'react-hot-toast';
import { useToast } from '@/hooks/useToast';

interface OpinionFormData {
    title: string;
    content: string;
    image: string | null;
}

const OpinionForm = () => {
    const { loading, user } = useAuthProvider();
    const { hideToast, showToast, toast } = useToast()
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<OpinionFormData>({
        title: '',
        content: '',
        image: null
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = (result: CldUploadWidgetResults) => {
        if (result?.event === 'success') {
            const info = result.info as { secure_url: string };
            setFormData(prev => ({
                ...prev,
                image: info.secure_url
            }));
            toast.success('Image uploaded successfully!');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Replace with your API call to submit the opinion
            const response = await fetch('/api/opinions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    authorId: user?.id
                }),
            });

            if (response.ok) {
                toast.success('Opinion published successfully!');
                router.push('/opinions');
            } else {
                throw new Error('Failed to submit opinion');
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again.');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <div className="text-center py-12">Loading...</div>;
    if (!user) {
        router.push('/login');
        return null;
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 sm:p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Share Your Opinion</h2>
                    <p className="text-gray-600 mb-6">Express your thoughts with the community</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                Opinion Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                placeholder="What's your opinion about?"
                            />
                        </div>

                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                                Your Thoughts
                            </label>
                            <textarea
                                id="content"
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                required
                                rows={6}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                placeholder="Share your detailed opinion here..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Featured Image
                            </label>
                            <div className="flex flex-col sm:flex-row gap-4">
                                {formData.image ? (
                                    <div className="relative group">
                                        <img
                                            src={formData.image}
                                            alt="Preview"
                                            className="w-full h-48 object-cover rounded-lg border border-gray-200"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, image: null }))}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                ) : (
                                    <CldUploadButton
                                        uploadPreset="your_cloudinary_preset" // Replace with your Cloudinary upload preset
                                        onUpload={handleImageUpload}
                                        options={{
                                            sources: ['local', 'url', 'camera'],
                                            multiple: false,
                                            maxFiles: 1,
                                            cropping: true,
                                            croppingAspectRatio: 16 / 9,
                                        }}
                                        className="w-full"
                                    >
                                        <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <p className="text-gray-500">Click to upload an image</p>
                                            <p className="text-xs text-gray-400 mt-1">Recommended size: 1200x675 pixels</p>
                                        </div>
                                    </CldUploadButton>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Publishing...
                                    </span>
                                ) : (
                                    'Publish Opinion'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default OpinionForm;