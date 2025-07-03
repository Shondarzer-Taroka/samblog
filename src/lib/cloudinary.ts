// lib/cloudinary.ts
export const uploadToCloudinary = async (file: File): Promise<{ secure_url: string }> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
  
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error('Failed to upload image');
  }

  return response.json();
};






















const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;
const BASE_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}`;

export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'your_upload_preset'); // Create unsigned preset in Cloudinary

  const response = await fetch(`${BASE_URL}/image/upload`, {
    method: 'POST',
    body: formData
  });

  return response.json();
}

export async function deleteImage(publicId: string) {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = await generateSignature(publicId, timestamp);

  const response = await fetch(`${BASE_URL}/image/destroy`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      public_id: publicId,
      signature,
      timestamp,
      api_key: API_KEY
    })
  });

  return response.json();
}

export async function listImages() {
  const response = await fetch(`${BASE_URL}/resources/image`, {
    headers: {
      'Authorization': `Basic ${btoa(`${API_KEY}:${API_SECRET}`)}`
    }
  });
  return response.json();
}

async function generateSignature(publicId: string, timestamp: number) {
  const message = `public_id=${publicId}&timestamp=${timestamp}${API_SECRET}`;
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-1', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}