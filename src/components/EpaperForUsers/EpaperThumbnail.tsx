import Link from 'next/link';
import Image from 'next/image';
import { EpaperResponse } from '@/types/epaper';

export default function EpaperThumbnail({ epaper }: { epaper: EpaperResponse }) {
  const date = new Date(epaper.date);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/viewer/${epaper.id}`}>
        <div className="relative aspect-[3/4]">
          <Image
            src={epaper.mainEpaperImage}
            alt={`E-paper from ${formattedDate}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-3">
          <h3 className="font-semibold text-gray-800">{formattedDate}</h3>
          <p className="text-sm text-gray-500">
            {epaper.articles.length} articles
          </p>
        </div>
      </Link>
    </div>
  );
}