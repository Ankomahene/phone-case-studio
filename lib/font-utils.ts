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
