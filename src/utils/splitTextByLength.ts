export function splitTextByLength(text: string, length: number): string[] {
  if (!text || length <= 0) return [];

  const result: string[] = [];
  for (let i = 0; i < text.length; i += length) {
    result.push(text.slice(i, i + length));
  }
  return result;
}
