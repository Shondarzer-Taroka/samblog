// utils/englishToBengali.ts

export function englishToBengali(input: string | number): string {
  const enToBnDigits: Record<string, string> = {
    '0': '০',
    '1': '১',
    '2': '২',
    '3': '৩',
    '4': '৪',
    '5': '৫',
    '6': '৬',
    '7': '৭',
    '8': '৮',
    '9': '৯',
  };

  const enToBnWords: Record<string, string> = {
    January: 'জানুয়ারি',
    February: 'ফেব্রুয়ারি',
    March: 'মার্চ',
    April: 'এপ্রিল',
    May: 'মে',
    June: 'জুন',
    July: 'জুলাই',
    August: 'আগস্ট',
    September: 'সেপ্টেম্বর',
    October: 'অক্টোবর',
    November: 'নভেম্বর',
    December: 'ডিসেম্বর',
    Sunday: 'রবিবার',
    Monday: 'সোমবার',
    Tuesday: 'মঙ্গলবার',
    Wednesday: 'বুধবার',
    Thursday: 'বৃহস্পতিবার',
    Friday: 'শুক্রবার',
    Saturday: 'শনিবার',
    AM: 'এএম',
    PM: 'পিএম',
  };

  let output = String(input);

  // Replace digits
  output = output.replace(/\d/g, (d) => enToBnDigits[d]);

  // Replace months, days, AM/PM
  for (const [en, bn] of Object.entries(enToBnWords)) {
    const regex = new RegExp(en, 'gi');
    output = output.replace(regex, bn);
  }

  return output;
}
