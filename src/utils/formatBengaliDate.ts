// export const formatBengaliDate = (isoDate: string): string => {
//   const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
//   const toBengaliDigits = (input: string) =>
//     input.replace(/\d/g, (d) => bnDigits[parseInt(d)]);

//   const date = new Date(isoDate);
//   const options: Intl.DateTimeFormatOptions = {
//     day: '2-digit',
//     month: 'long',
//     year: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit',
//     hour12: true,
//   };

//   // Format using bn-BD locale
//   let formatted = new Intl.DateTimeFormat('bn-BD', options).format(date);

//   // Normalize AM/PM to uppercase Bengali style
//   formatted = formatted.replace('পূর্বাহ্ণ', 'এ এম').replace('অপরাহ্ণ', 'পি এম');

//   return toBengaliDigits(formatted);
// };



export const formatBengaliDate = (isoDate: string): string => {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  const toBengaliDigits = (input: string) =>
    input.replace(/\d/g, (d) => bnDigits[parseInt(d)]);

  const date = new Date(isoDate);

  const day = toBengaliDigits(date.toLocaleDateString('bn-BD', { day: '2-digit' }));
  const month = date.toLocaleDateString('bn-BD', { month: 'long' });
  const year = toBengaliDigits(date.toLocaleDateString('bn-BD', { year: 'numeric' }));

  let hour = date.getHours();
  const minute = toBengaliDigits(date.getMinutes().toString().padStart(2, '0'));
  const isPM = hour >= 12;
  hour = hour % 12 || 12;
  const hourStr = toBengaliDigits(hour.toString().padStart(2, '0'));
  const period = isPM ? 'পিএম' : 'এএম';

  return `${day} ${month} ${year}, ${hourStr}:${minute} ${period}`;
};
