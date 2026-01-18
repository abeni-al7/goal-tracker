/**
 * ID Generator utility
 * Single responsibility: Generate unique IDs
 */

let counter = 0;

/**
 * Generates a unique ID
 * @returns {string} A unique identifier
 */
function generateId() {
  const timestamp = Date.now();
  counter = (counter + 1) % 10000;
  return `goal-${timestamp}-${counter}`;
}

/**
 * Resets the counter (useful for testing)
 * @returns {void}
 */
function resetCounter() {
  counter = 0;
}

module.exports = {
  generateId,
  resetCounter
};
