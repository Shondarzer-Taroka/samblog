export interface Bbox {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface Article {
    id: number;
    title: string;
    content: string;
    bbox: Bbox;
    contentImage?: string;
    category: string;
    isLeading?: boolean;
    pageNumber: number;
}

export interface NewspaperPage {
    id: number;
    imageUrl: string;
    date: string;
    articles: Article[];
}