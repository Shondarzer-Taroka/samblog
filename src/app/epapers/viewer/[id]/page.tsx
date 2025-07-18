import { Suspense } from 'react';
// import ArticleDetails from '@/components/ArticleDetails';
import { notFound } from 'next/navigation';
import ArticleDetails from '@/components/EpaperForUsers/ArticleDetails';

async function getEpaper(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/epaper/${id}`);

  if (!res.ok) {
    if (res.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function EpaperViewer({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const epaper = await getEpaper((await params).id);

  if (!epaper) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        <Suspense fallback={<div>Loading e-paper...</div>}>
          <ArticleDetails epaper={epaper} />
        </Suspense>
      </div>
    </div>
  );
}