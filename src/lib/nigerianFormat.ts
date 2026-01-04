/**
 * Nigerian Formatting Utilities
 * Provides locale-appropriate formatting for Nigerian context
 */

/**
 * Format currency in Nigerian Naira (₦)
 * @param amount - The amount to format
 * @param showDecimal - Whether to show decimal places (default: true)
 */
export function formatNaira(amount: number, showDecimal = true): string {
  const formatted = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: showDecimal ? 2 : 0,
    maximumFractionDigits: showDecimal ? 2 : 0,
  }).format(amount);
  
  // Replace NGN with ₦ symbol for cleaner display
  return formatted.replace('NGN', '₦').replace(/\s+/g, '');
}

/**
 * Format number with comma separators (Nigerian standard)
 * @param num - The number to format
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-NG').format(num);
}

/**
 * Format date in Nigerian DD/MM/YYYY format
 * @param date - Date object or ISO string
 * @param options - Formatting options
 */
export function formatNigerianDate(
  date: Date | string,
  options: {
    includeTime?: boolean;
    style?: 'short' | 'medium' | 'long' | 'full';
  } = {}
): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const { includeTime = false, style = 'medium' } = options;

  if (style === 'short') {
    // DD/MM/YYYY
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    const dateStr = `${day}/${month}/${year}`;
    
    if (includeTime) {
      const hours = d.getHours().toString().padStart(2, '0');
      const minutes = d.getMinutes().toString().padStart(2, '0');
      return `${dateStr} ${hours}:${minutes}`;
    }
    return dateStr;
  }

  if (style === 'medium') {
    // 4 January 2026
    return d.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  if (style === 'long') {
    // 4th January, 2026
    const day = d.getDate();
    const suffix = getOrdinalSuffix(day);
    const month = d.toLocaleDateString('en-GB', { month: 'long' });
    const year = d.getFullYear();
    return `${day}${suffix} ${month}, ${year}`;
  }

  if (style === 'full') {
    // Saturday, 4th January, 2026
    const dayName = d.toLocaleDateString('en-GB', { weekday: 'long' });
    const day = d.getDate();
    const suffix = getOrdinalSuffix(day);
    const month = d.toLocaleDateString('en-GB', { month: 'long' });
    const year = d.getFullYear();
    return `${dayName}, ${day}${suffix} ${month}, ${year}`;
  }

  return d.toLocaleDateString('en-GB');
}

/**
 * Get ordinal suffix for a number (1st, 2nd, 3rd, etc.)
 */
function getOrdinalSuffix(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}

/**
 * Format academic publication date (Month Year format)
 * @param date - Date object or ISO string
 */
export function formatPublicationDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Format Nigerian phone number
 * @param phone - Phone number (with or without country code)
 */
export function formatNigerianPhone(phone: string): string {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Handle different formats
  if (cleaned.startsWith('234')) {
    // Already has country code
    const local = cleaned.slice(3);
    return `+234 ${formatLocalPhone(local)}`;
  } else if (cleaned.startsWith('0')) {
    // Local format with leading 0
    return `+234 ${formatLocalPhone(cleaned.slice(1))}`;
  } else if (cleaned.length === 10) {
    // 10 digits without leading 0
    return `+234 ${formatLocalPhone(cleaned)}`;
  }
  
  // Return original if format not recognized
  return phone;
}

function formatLocalPhone(digits: string): string {
  // Format as XXX XXX XXXX
  if (digits.length >= 10) {
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 10)}`;
  }
  return digits;
}

/**
 * Format journal volume and issue
 * @param volume - Volume number
 * @param issue - Issue number
 * @param year - Publication year
 */
export function formatVolumeIssue(volume: number | string | undefined, issue: number | string | undefined, year?: number): string {
  const vol = volume ?? '—';
  const iss = issue ?? '—';
  const volIssue = `Vol. ${vol}, No. ${iss}`;
  return year ? `${volIssue} (${year})` : volIssue;
}

/**
 * Format page range for citations
 * @param startPage - Start page number
 * @param endPage - End page number
 */
export function formatPageRange(startPage: number | string, endPage?: number | string): string {
  if (endPage && startPage !== endPage) {
    return `pp. ${startPage}–${endPage}`;
  }
  return `p. ${startPage}`;
}

/**
 * Format article DOI as clickable link
 * @param doi - DOI string (with or without prefix)
 */
export function formatDOI(doi: string): { display: string; url: string } {
  const cleanDoi = doi.replace(/^https?:\/\/doi\.org\//, '').replace(/^doi:/, '');
  return {
    display: `https://doi.org/${cleanDoi}`,
    url: `https://doi.org/${cleanDoi}`,
  };
}

/**
 * Format author list for citation
 * @param authors - Array of author names
 * @param maxAuthors - Maximum authors to show before "et al."
 */
export function formatAuthorList(authors: string[], maxAuthors = 3): string {
  if (authors.length === 0) return '';
  if (authors.length === 1) return authors[0];
  if (authors.length === 2) return `${authors[0]} & ${authors[1]}`;
  if (authors.length <= maxAuthors) {
    return `${authors.slice(0, -1).join(', ')} & ${authors[authors.length - 1]}`;
  }
  return `${authors.slice(0, maxAuthors).join(', ')} et al.`;
}

/**
 * Nigerian academic calendar helpers
 */
export const NIGERIAN_ACADEMIC_MONTHS = {
  FIRST_SEMESTER_START: 9, // September
  FIRST_SEMESTER_END: 1,   // January
  SECOND_SEMESTER_START: 2, // February
  SECOND_SEMESTER_END: 6,   // June
};

/**
 * Get current Nigerian academic year
 */
export function getCurrentAcademicYear(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  
  // Academic year runs September to August
  if (month >= 9) {
    return `${year}/${year + 1}`;
  }
  return `${year - 1}/${year}`;
}
