import he from 'he';


export const stripHtmlAndLimit = (
  raw: string,
  limit: number = 40
): { short: string; isTruncated: boolean } => {
  // Decode HTML entities (e.g. &lt; → <)
  const decoded = he.decode(raw);

  // Strip all HTML tags
  const plainText = decoded.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

  const words = plainText.split(' ');
  const isTruncated = words.length > limit;

  const short = isTruncated
    ? words.slice(0, limit).join(' ') + '...'
    : plainText;

  return { short, isTruncated };
};



export const stripHtmlAndLimitForArray = (
  raw: string,
  limit: number = 40
): { short: string; isTruncated: boolean } => {
  // Decode HTML entities (e.g. &lt; → <)
  const decoded = he.decode(raw);

  // Strip all HTML tags
  const plainText = decoded.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

  const words = plainText.split(' ');
  const isTruncated = words.length > limit;

  const short = isTruncated
    ? words.slice(0, limit).join(' ') + '...'
    : plainText;

  return { short, isTruncated };
};





export const stripHtmlAndLimitWithSpace = (
  raw: string,
  limit: number = 100
): { short: string; isTruncated: boolean } => {
  // Decode HTML entities (e.g. &lt; → <)
  const decoded = he.decode(raw);

  // Strip all HTML tags and normalize spaces
  const plainText = decoded.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

  const isTruncated = plainText.length > limit;

  const short = isTruncated
    ? plainText.slice(0, limit) + '...'
    : plainText;

  return { short, isTruncated };
};
