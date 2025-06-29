// utils/getBengaliTimeAgo.ts
export function getBengaliTimeAgo(dateString: string): string {
  const now = new Date();
  const givenDate = new Date(dateString);
  const diffMs = now.getTime() - givenDate.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return 'এইমাত্র';
  if (diffMinutes < 60) return `${convertToBengaliNumber(diffMinutes)} মিনিট আগে`;
  if (diffHours < 24) return `${convertToBengaliNumber(diffHours)} ঘণ্টা আগে`;
  return `${convertToBengaliNumber(diffDays)} দিন আগে`;
}

function convertToBengaliNumber(num: number): string {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().split('').map(d => banglaDigits[+d]).join('');
}
