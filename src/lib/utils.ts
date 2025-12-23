import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import numberToWords from 'number-to-words';

// Currency symbol/code mapping
const currencyMap: Record<string, string> = {
  'USD': 'US Dollars',
  'KWD': 'Kuwaiti Dinars',
  'AED': 'UAE Dirhams',
  'SAR': 'Saudi Riyals',
  'QAR': 'Qatari Riyals',
  'BHD': 'Bahraini Dinars',
  'OMR': 'Omani Rials',
  'EGP': 'Egyptian Pounds',
  'JOD': 'Jordanian Dinars',
  'GBP': 'British Pounds',
  'EUR': 'Euros',
  'INR': 'Indian Rupees',
  'AUD': 'Australian Dollars',
  'CAD': 'Canadian Dollars',
  'CHF': 'Swiss Francs',
};

/**
 * Converts a numeric amount to words with currency
 * @param amount - The numeric amount to convert
 * @param currency - The currency code (e.g., 'USD', 'KWD', 'AED')
 * @returns The amount in words with currency (e.g., "Twelve Thousand, Ninety Nine US Dollars")
 */
export const convertAmountToWords = (amount: string | number, currency: string = 'USD'): string => {
  try {
    // Convert string to number if needed
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

    // Validate the amount
    if (isNaN(numAmount) || numAmount < 0) {
      return '';
    }

    // Handle zero case
    if (numAmount === 0) {
      return `Zero ${currency}`;
    }

    // Get currency name or use code if not found
    const currencyName = currencyMap[currency] || currency;

    // Convert to words
    const words = numberToWords.toWords(Math.floor(numAmount));
    
    // Remove commas and capitalize first letter
    const cleanWords = words.replace(/,/g, '');
    const capitalizedWords = cleanWords.charAt(0).toUpperCase() + cleanWords.slice(1);

    return `${capitalizedWords} ${currencyName}`;
  } catch (error) {
    console.error('Error converting amount to words:', error);
    return '';
  }
};

/**
 * Converts amount with both whole and decimal parts
 * @param amount - The numeric amount (including decimals)
 * @param currency - The currency code
 * @returns Amount in words (e.g., "Twelve Thousand, Ninety Nine UAE Dirhams")
 */
export const convertAmountToWordsWithDecimals = (
  amount: string | number,
  currency: string = 'USD'
): string => {
  try {
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

    if (isNaN(numAmount) || numAmount < 0) {
      return '';
    }

    if (numAmount === 0) {
      return `Zero ${currency}`;
    }

    // Split into whole and decimal parts
    const [wholePart, decimalPart] = numAmount.toString().split('.');

    const wholeNumber = parseInt(wholePart, 10);
    const currencyName = currencyMap[currency] || currency;

    // Convert whole part
    const wholeWords = numberToWords.toWords(wholeNumber);
    // Capitalize first letter and remove commas for cleaner output
    const cleanWholeWords = wholeWords.replace(/,/g, '');
    const capitalizedWholeWords = cleanWholeWords.charAt(0).toUpperCase() + cleanWholeWords.slice(1);

    // If no decimal part, return just the whole amount
    if (!decimalPart || parseInt(decimalPart, 10) === 0) {
      return `${capitalizedWholeWords} ${currencyName}`;
    }

    // Convert decimal part
    const decimalNumber = parseInt(decimalPart.padEnd(2, '0'), 10);
    const decimalWords = numberToWords.toWords(decimalNumber).replace(/,/g, '');
    const capitalizedDecimalWords = decimalWords.charAt(0).toUpperCase() + decimalWords.slice(1);

    return `${capitalizedWholeWords} ${currencyName} and ${capitalizedDecimalWords} Cents`;
  } catch (error) {
    console.error('Error converting amount to words with decimals:', error);
    return '';
  }
};
