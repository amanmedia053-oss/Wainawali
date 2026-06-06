/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Segments a string into an array of individual grapheme clusters.
 * This ensures that multi-codepoint characters (like emojis),
 * combined Arabic/Pashto characters with combining marks/diacritics,
 * and surrogate pairs are treated as a single unit or "letter"
 * when driving typewriter or chunking animations.
 */
export function segmentText(text: string): string[] {
  if (!text) return [];

  // Use Intl.Segmenter if supported by the environment (modern browsers, Node, and Capacitor)
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    try {
      const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
      return Array.from(segmenter.segment(text)).map((s) => s.segment);
    } catch (e) {
      // Fallback if Segmenter fails or is not supported
    }
  }

  // Robust Fallback: Custom grapheme cluster grouping for combining diacritics and Arabic marks
  const chars = Array.from(text);
  const result: string[] = [];

  for (const char of chars) {
    const code = char.charCodeAt(0);
    
    // Check if the character is a combining mark.
    // This includes:
    // - Combining Diacritical Marks: [U+0300, U+036F]
    // - Arabic/Pashto tashkeel, superscript alef, and combining honorifics/vowels: [U+0610, U+061A], [U+064B, U+065F], U+0670
    // - Arabic Quranic or combining ornamentation marks: [U+06D6, U+06DC], [U+06DF, U+06E4], [U+06E7, U+06E8], [U+06EA, U+06ED]
    const isCombining = (
      (code >= 0x0300 && code <= 0x036F) || 
      (code >= 0x0610 && code <= 0x061A) || 
      (code >= 0x064B && code <= 0x065F) || 
      (code === 0x0670) ||
      (code >= 0x06D6 && code <= 0x06DC) ||
      (code >= 0x06DF && code <= 0x06E4) ||
      (code >= 0x06E7 && code <= 0x06E8) ||
      (code >= 0x06EA && code <= 0x06ED)
    );

    if (isCombining && result.length > 0) {
      result[result.length - 1] += char;
    } else {
      result.push(char);
    }
  }

  return result;
}
