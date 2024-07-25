/**
 * Get random integer
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 */
export function getRandomInt(min: number, max: number): number {
  // return Math.floor(Math.random() * (max - min) + min)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Number format helper
 */
export function simpleNumberFormat (
  value: number,
  precision = 2,
  // locale: string = 'en-EN'
): string {
  return value.toFixed(precision);
};

/**
 * Currency format helper
 * Uses standart Intl NumberFromat
 * Details: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options
 */
export const numberFormat = (
  value: number,
  minimumFractionDigits = 0,
  currency = 'USD',
): string => {
  const options = {
    style: 'currency',
    currency,
    currencyDisplay: 'code',
    minimumFractionDigits: value > 0 ? minimumFractionDigits : 0
  };

  value = parseFloat(value.toFixed(minimumFractionDigits));
  let result = new Intl.NumberFormat('en-US', options).format(value);
  result = result.replace(currency, '').trim().replaceAll(',', ' ');
  return result;
};

/**
 * Round number
 */
export function round(value: number, precision = 2): number{
  return +value.toFixed(precision);
}

/**
 * Get fibonacci number by index
 */
export function fibo(n: number): number {
  return n <= 1 ? n : fibo(n - 1) + fibo(n - 2);
}
