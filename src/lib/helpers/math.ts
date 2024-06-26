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
export function numberFormat (
  value: number,
  precision = 2,
  // locale: string = 'en-EN'
): string {
  // const intl = Intl.NumberFormat(locale, {
  //   notation: 'compact',
  //   maximumFractionDigits: 2,
  // }).format(value)
  return value.toFixed(precision);
};

/**
 * Get fibonacci number by index
 */
export function fibo(n: number): number {
  return n <= 1 ? n : fibo(n - 1) + fibo(n - 2);
}
