export function formatPrice(price: number | unknown): string {
  const numericPrice = typeof price === 'number' ? price : Number(price);
  
  // Custom FCFA formatting for Minimalist Professional Luxury
  return new Intl.NumberFormat('fr-FR', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numericPrice) + ' FCFA';
}

/**
 * Formats a date object or string into a localized readable string.
 * @param date - The date to format
 * @param includeTime - Whether to include hours and minutes
 * @returns Formatted date string
 */
export function formatDate(date: Date | string, includeTime = false): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...(includeTime && { hour: '2-digit', minute: '2-digit' }),
  };
  
  return new Intl.DateTimeFormat('fr-FR', options).format(d);
}
