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
