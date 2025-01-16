/**
 * Extracts a valid Google Fonts URL from various input formats:
 * - Direct URL: https://fonts.googleapis.com/css2?family=Roboto
 * - HTML link tag: <link href="https://fonts.googleapis.com/css2?family=Roboto" rel="stylesheet">
 * - CSS @import: @import url('https://fonts.googleapis.com/css2?family=Roboto')
 */
export function extractGoogleFontUrl(input: string): string {
  // Remove whitespace and newlines
  const sanitizedInput = input.trim();

  // Check if it's wrapped in a <link> tag
  const linkMatch = sanitizedInput.match(
    /href=["'](https:\/\/fonts\.googleapis\.com[^"']+)["']/
  );
  if (linkMatch) {
    return linkMatch[1];
  }

  // Check if it's an @import statement
  const importMatch = sanitizedInput.match(
    /@import\s+url\(['"]?(https:\/\/fonts\.googleapis\.com[^'"]+)['"]?\)/
  );
  if (importMatch) {
    return importMatch[1];
  }

  // Check if it's a direct URL
  if (sanitizedInput.startsWith('https://fonts.googleapis.com')) {
    return sanitizedInput;
  }

  throw new Error('Invalid Google Font URL format');
}

/**
 * Extracts the font family name from a Google Fonts URL
 * Returns the first font family if multiple are specified
 */
export function extractFontFamily(url: string): string {
  const familyMatch = url.match(/family=([^&:@]+)/);
  if (!familyMatch) {
    throw new Error('Could not find font family in URL');
  }

  // Get the first font family if multiple are specified
  const family = familyMatch[1].split('|')[0].split('+').join(' ');
  return decodeURIComponent(family);
}

interface SystemFont {
  family: string;
  fullName: string;
  postscriptName: string;
}

declare global {
  interface Window {
    queryLocalFonts?: () => Promise<SystemFont[]>;
  }
}

// Fallback fonts if system fonts can't be loaded
export const fallbackFonts = [
  'Arial',
  'Times New Roman',
  'Courier New',
  'Georgia',
  'Verdana',
  'Helvetica',
  'Tahoma',
  'Trebuchet MS',
  'Impact',
];

export async function getSystemFonts(): Promise<string[]> {
  try {
    // Check if the API is available
    if (typeof window !== 'undefined' && window.queryLocalFonts) {
      const fonts = await window.queryLocalFonts();
      // Get unique font families and sort them
      const uniqueFonts = Array.from(
        new Set(fonts.map((font) => font.family))
      ).sort();
      return uniqueFonts;
    }
  } catch (error) {
    console.warn('Could not load system fonts:', error);
  }

  // Return fallback fonts if the API is not available or fails
  return fallbackFonts;
}

// Function to check if a font is available in the system
export function isFontAvailable(fontFamily: string): boolean {
  // Create a canvas with text in the specified font
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return false;

  // Set a baseline font to compare against
  context.font = '72px monospace';
  const baselineWidth = context.measureText('mmmmmmmmmmlli').width;

  // Try to use the requested font
  context.font = `72px ${fontFamily}, monospace`;
  const testWidth = context.measureText('mmmmmmmmmmlli').width;

  // If the widths are different, the font was loaded successfully
  return baselineWidth !== testWidth;
}
