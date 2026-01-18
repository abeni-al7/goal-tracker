/**
 * Date formatting utilities
 * Single responsibility: Format dates for display
 */

/**
 * Formats a date to YYYY-MM-DD
 * @param {Date|string} date - The date to format
 * @returns {string} Formatted date string
 */
function formatDate(date) {
  if (!date) return '';
  const d = new Date(date);
  return d.toISOString().split('T')[0];
}

/**
 * Formats a date to a readable string
 * @param {Date|string} date - The date to format
 * @returns {string} Formatted date string
 */
function formatDateLong(date) {
  if (!date) return 'No due date';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

/**
 * Checks if a date is in the past
 * @param {Date|string} date - The date to check
 * @returns {boolean} True if the date is in the past
 */
function isPastDate(date) {
  if (!date) return false;
  return new Date(date) < new Date();
}

module.exports = {
  formatDate,
  formatDateLong,
  isPastDate
};
