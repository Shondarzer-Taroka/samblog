import { NewsItem } from "@/types/news.types";

// ✅ utils/bookmark.utils.ts
export const getBookmarks = (): NewsItem[] => {
  if (typeof window === 'undefined') return [];
  const bookmarks = localStorage.getItem('bookmarks');
  return bookmarks ? JSON.parse(bookmarks) : [];
};

export const addBookmark = (item: NewsItem) => {
  const current = getBookmarks();
  const exists = current.find((b) => b.id === item.id);
  if (!exists) {
    localStorage.setItem('bookmarks', JSON.stringify([...current, item]));
  }
};

export const removeBookmark = (id: string) => {
  const current = getBookmarks();
  const filtered = current.filter((b) => b.id !== id);
  localStorage.setItem('bookmarks', JSON.stringify(filtered));
};

export const isBookmarked = (id: string): boolean => {
  const current = getBookmarks();
  return current.some((b) => b.id === id);
};
