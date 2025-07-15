export interface Author {
  name: string;
  email: string;
  image: string;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  category: string;
  subCategory: string;
  imageSource: string;
  imageTitle: string;
  keywords: string[];
  subKeywords: string[];
  imageUrl?: string;
  createdAt: string; // or Date, if you parse it
  updatedAt: string; // or Date, if you parse it
  authorId: string;
  author: Author;
}











export interface NewsFormData {
  id?: string;
  title: string;
  content: string;
  category: string;
  subCategory: string;
  keywords: string[];
  subKeywords: string[];
  imageUrl?: string;
  imageTitle?: string;
  imageSource?: string;
}

export interface NewsFormProps {
  initialData?: NewsFormData;
  onSubmit: (data: NewsFormData) => Promise<void>;
  isSubmitting: boolean;
  user?: {
    name: string;
    email: string;
    image?: string;
  };
}

export const CATEGORIES = [
  'চলমান ইস্যু',
  'রাজনীতি',
  'অর্থনীতি',
  'ধর্ম',
  'ইসলাম',
  'ইতিহাস',
  'সারাদেশ',
  'সংস্কৃতি',
  'আন্তর্জাতিক',
  'সাহিত্য',
  'মতামত',
  'ইসলাম'
];

export const SUB_CATEGORIES = [
  'জাতীয়',
  'আন্তর্জাতিক',
  'স্থানীয়',
  'খেলাধুলা',
  'বিনোদন',
  'প্রযুক্তি',
  'স্বাস্থ্য',
  'মতামত',
  'ইসলাম'
];
