export const formatBengaliDate = (isoDate: string): string => {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  const toBengaliDigits = (input: string) =>
    input.replace(/\d/g, (d) => bnDigits[parseInt(d)]);

  const date = new Date(isoDate);
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  // Format using bn-BD locale
  let formatted = new Intl.DateTimeFormat('bn-BD', options).format(date);

  // Normalize AM/PM to uppercase Bengali style
  formatted = formatted.replace('পূর্বাহ্ণ', 'এএম').replace('অপরাহ্ণ', 'পিএম');

  return toBengaliDigits(formatted);
};
