// app/api/download/route.ts
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const imageUrl = req.nextUrl.searchParams.get('url');

  if (!imageUrl) {
    return new Response('Missing URL', { status: 400 });
  }

  try {
    const res = await fetch(imageUrl);

    if (!res.ok) {
      return new Response('Failed to fetch image', { status: 500 });
    }

    const contentType = res.headers.get('content-type') || 'application/octet-stream';
    const arrayBuffer = await res.arrayBuffer();

    return new Response(Buffer.from(arrayBuffer), {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': 'attachment; filename="downloaded.jpg"',
      },
    });
  } catch (err) {
    console.error('Download error:', err);
    return new Response('Download failed', { status: 500 });
  }
}
