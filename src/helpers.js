/**
 * Creates a duplicate-free version of an array
 * @param arr {Array<*>}
 * @returns {Array<*>}
 */
export function arrayUnique(arr) {
  return arr.filter((v, i, a) => a.indexOf(v) === i);
}

/**
 * Checks if given value is string
 * @param val {*}
 * @returns {boolean}
 */
export function isString(val) {
  return typeof val === 'string';
}

/**
 * Checks if given value is plain object
 * @param val {*}
 * @returns {boolean}
 */
export function isObject(val) {
  return val !== null && typeof val === 'object' && Array.isArray(val) === false;
}
