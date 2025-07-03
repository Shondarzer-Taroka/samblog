/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function CloudinaryImagesPage() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/cloudinary');
      const data = await response.json();
      setImages(data.resources || []);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/cloudinary', {
        method: 'POST',
        body: formData
      });
      const newImage = await response.json();
      setImages([newImage, ...images]);
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (publicId: string) => {
    if (!confirm('Delete this image?')) return;
    
    try {
      await fetch(`/api/cloudinary?public_id=${publicId}`, {
        method: 'DELETE'
      });
      setImages(images.filter(img => img.public_id !== publicId));
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cloudinary Images</h1>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleUpload}
        accept="image/*"
        className="hidden"
        id="upload-input"
      />
      <label
        htmlFor="upload-input"
        className="inline-block mb-4 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
      >
        Upload Image
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map(image => (
          <div key={image.public_id} className="border rounded overflow-hidden">
            <div className="relative h-48">
              <Image
                src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${image.public_id}.${image.format}`}
                alt={image.public_id}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-3">
              <button
                onClick={() => handleDelete(image.public_id)}
                className="mt-2 px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}