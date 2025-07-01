// app/(dashboard)/epapers/[id]/edit/page.tsx
'use client';

import EpaperForm from '@/components/Epaper/EpaperForm';
import { useParams } from 'next/navigation';
// import EpaperForm from '@/components/epapers/EpaperForm';

export default function EditEpaperPage() {
  const params = useParams();
  const epaperId = Number(params.id);

  return <EpaperForm epaperId={epaperId} />;
}