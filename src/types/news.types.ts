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
  views:number
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
  'বাণী',
  'চলমান ইস্যু',
  'রাজনীতি',
  'অর্থনীতি',
  'ধর্ম',
  'ইতিহাস',
  'সারাদেশ',
  'সংস্কৃতি',
  'আন্তর্জাতিক',
  'জাতীয়',
  'সাহিত্য',
  'মতামত',
  'ইসলাম',
  'ডাক্তার আছেন',
  'বিজ্ঞান ও প্রযুক্তি',
  'পরবাস',
  'শিক্ষা',
  'প্রযুক্তি',
  'স্বাস্থ্য',
  'ভ্রমণ',
  'প্রত্নতত্ত্ব',
  'জীবনধারা',
  'বিজ্ঞান',
  'কৃষি'
];

export const SUB_CATEGORIES = [
  'জাতীয়',
  'আন্তর্জাতিক',
  'স্থানীয়',
  'খেলাধুলা',
  'বিনোদন',
  'ধর্ম',
  'প্রযুক্তি',
  'স্বাস্থ্য',
  'মতামত',
  'ইসলাম',
];