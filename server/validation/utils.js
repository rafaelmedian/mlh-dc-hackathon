/**
 * Creates strings of a character determined by the qty.
 * @param qty
 * @param start
 * @returns {string}
 */
const createChars = (qty, start = 0) => {
  let chars = [];
  for (let i = start; i < qty; i++) {
    chars.push('i');
  }

  return chars.join('');
};

module.exports = {
  createChars,
};