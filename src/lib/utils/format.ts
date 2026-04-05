/**
 * Formats a number as a price string in Euros.
 * @param price - The price to format (number or Decimal)
 * @returns Formatted price string (e.g., 99,99 €)
 */
export function formatPrice(price: number | unknown): string {
  const numericPrice = typeof price === 'number' ? price : Number(price);
  
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(numericPrice);
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
