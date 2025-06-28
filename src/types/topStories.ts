// types/topStories.ts
export interface TopStory {
  id: number;        // rank (1‑5, 1‑10, etc.)
  title: string;     // headline
  href?: string;     // optional link
  highlight?: boolean; // to color words (e.g. “বিনোদন”)
}
