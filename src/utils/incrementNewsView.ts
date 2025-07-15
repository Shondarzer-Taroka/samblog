// utils/incrementNewsView.ts
import axios from 'axios';

/**
 * Increments the view count of a news item by ID.
 * @param id - The ID of the news article.
 * @returns A promise that resolves when the view is incremented.
 */
export const incrementNewsView = async (id: string): Promise<void> => {
  try {
    await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/news/incrementNewsView/${id}/view`);
  } catch (error) {
    console.error('Failed to increment news view:', error);
  }
};
