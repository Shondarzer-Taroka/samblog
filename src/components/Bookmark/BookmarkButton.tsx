// ✅ components/BookmarkButton.tsx
import { FaBookmark } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { addBookmark, removeBookmark, isBookmarked } from '@/utils/bookmark.utils';
import { NewsItem } from '@/types/news.types';

const BookmarkButton = ({ article }: { article: NewsItem }) => {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if (article?.id) setBookmarked(isBookmarked(article.id));
  }, [article?.id]);

  const toggleBookmark = () => {
    if (bookmarked) {
      removeBookmark(article.id);
    } else {
      addBookmark(article);
    }
    setBookmarked(!bookmarked);
  };

  return (
    <button
      onClick={toggleBookmark}
      className={`text-gray-400 hover:text-red-600 transition-colors ${bookmarked ? 'text-red-600' : ''}`}
    >
      <FaBookmark />
    </button>
  );
};

export default BookmarkButton;