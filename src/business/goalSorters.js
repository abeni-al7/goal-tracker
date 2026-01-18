/**
 * Goal sorting utilities
 * Each function has a single responsibility: sort goals by one criterion
 */

/**
 * Compares two dates, handling null values
 * @param {Date|string|null} a - First date
 * @param {Date|string|null} b - Second date
 * @returns {number} Comparison result
 */
function compareDates(a, b) {
  if (!a && !b) return 0;
  if (!a) return 1;
  if (!b) return -1;
  return new Date(a) - new Date(b);
}

/**
 * Sorts goals by due date (earliest first)
 * @param {Array} goals - Array of goals
 * @returns {Array} Sorted goals
 */
function sortByDueDate(goals) {
  return [...goals].sort((a, b) => compareDates(a.dueDate, b.dueDate));
}

/**
 * Sorts goals by priority (high to low)
 * @param {Array} goals - Array of goals
 * @returns {Array} Sorted goals
 */
function sortByPriority(goals) {
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  return [...goals].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
}

/**
 * Sorts goals by creation date (newest first)
 * @param {Array} goals - Array of goals
 * @returns {Array} Sorted goals
 */
function sortByCreatedDate(goals) {
  return [...goals].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

/**
 * Sorts goals by title alphabetically
 * @param {Array} goals - Array of goals
 * @returns {Array} Sorted goals
 */
function sortByTitle(goals) {
  return [...goals].sort((a, b) => a.title.localeCompare(b.title));
}

module.exports = {
  sortByDueDate,
  sortByPriority,
  sortByCreatedDate,
  sortByTitle
};
