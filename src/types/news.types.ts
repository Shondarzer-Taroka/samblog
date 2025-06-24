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
