/**
 * Goal filtering utilities
 * Each function has a single responsibility: filter goals by one criterion
 */

/**
 * Filters goals by status
 * @param {Array} goals - Array of goals
 * @param {string} status - Status to filter by
 * @returns {Array} Filtered goals
 */
function filterByStatus(goals, status) {
  return goals.filter(goal => goal.status === status);
}

/**
 * Filters goals by priority
 * @param {Array} goals - Array of goals
 * @param {string} priority - Priority to filter by
 * @returns {Array} Filtered goals
 */
function filterByPriority(goals, priority) {
  return goals.filter(goal => goal.priority === priority);
}

/**
 * Filters goals that are overdue
 * @param {Array} goals - Array of goals
 * @returns {Array} Overdue goals
 */
function filterOverdue(goals) {
  const now = new Date();
  return goals.filter(goal => {
    if (!goal.dueDate) return false;
    return new Date(goal.dueDate) < now && goal.status !== 'completed';
  });
}

/**
 * Filters goals by search term in title or description
 * @param {Array} goals - Array of goals
 * @param {string} searchTerm - Term to search for
 * @returns {Array} Matching goals
 */
function searchGoals(goals, searchTerm) {
  const term = searchTerm.toLowerCase();
  return goals.filter(goal => 
    goal.title.toLowerCase().includes(term) ||
    (goal.description && goal.description.toLowerCase().includes(term))
  );
}

module.exports = {
  filterByStatus,
  filterByPriority,
  filterOverdue,
  searchGoals
};
