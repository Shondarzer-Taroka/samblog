// export interface Bbox {
//     x: number;
//     y: number;
//     width: number;
//     height: number;
// }

// export interface Article {
//     id: number;
//     title: string;
//     content: string;
//     bbox: Bbox;
//     contentImage?: string;
//     category: string;
//     isLeading?: boolean;
//     pageNumber: number;
// }

// export interface NewspaperPage {
//     id: number;
//     imageUrl: string;
//     date: string;
//     articles: Article[];
// }













// types/epaper.ts
export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Article {
  id?: number;
  title: string;
  contentImage: string;
  content: string;
  bbox: BoundingBox;
  category: string;
  isLeading?: boolean;
  pageNumber?: number;
}

export interface EpaperData {
  id?: number;
  mainEpaperImage: string;
  date: string;
  articles: Article[];
}

export interface EpaperResponse extends Omit<EpaperData, 'date'> {
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface PaginatedEpaperResponse {
  data: EpaperResponse[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const categories = [
  'জাতীয়',
  'সারাদেশ',
  'রাজনীতি',
  'অর্থনীতি',
  'খেলা',
  'বিনোদন',
  'আন্তর্জাতিক',
  'প্রযুক্তি',
  'শিক্ষা',
  'স্বাস্থ্য'
];