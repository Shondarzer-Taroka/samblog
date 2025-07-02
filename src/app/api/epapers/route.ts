/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import { PaginatedEpaperResponse } from '@/types/epaper';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';
  const limit = searchParams.get('limit') || '10';

  try {
    const backendUrl = `http://localhost:7700/api/epaper/getAllEpapers?page=${page}&limit=${limit}`;
    const response = await fetch(backendUrl);
    
    if (!response.ok) {
      throw new Error('Failed to fetch e-papers');
    }

    const data: PaginatedEpaperResponse = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch e-papers' },
      { status: 500 }
    );
  }
}