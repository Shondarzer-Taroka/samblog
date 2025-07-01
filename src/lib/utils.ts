// lib/utils.ts
export function formatDate(dateString: string | Date) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function truncate(text: string, length = 100) {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
}