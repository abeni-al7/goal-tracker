/**
 * Goal repository - Handles storage and retrieval of goals
 * Single responsibility: Manage goal persistence
 */

/**
 * In-memory storage for goals
 */
let goals = [];

/**
 * Saves a goal to storage
 * @param {Object} goal - The goal to save
 * @returns {Object} The saved goal
 */
function saveGoal(goal) {
  goals.push(goal);
  return goal;
}

/**
 * Retrieves all goals from storage
 * @returns {Array} Array of all goals
 */
function getAllGoals() {
  return [...goals]; // Return a copy to prevent external modification
}

/**
 * Finds a goal by ID
 * @param {string} id - The goal ID
 * @returns {Object|null} The goal if found, null otherwise
 */
function findGoalById(id) {
  return goals.find(goal => goal.id === id) || null;
}

/**
 * Updates a goal in storage
 * @param {string} id - The goal ID
 * @param {Object} updatedGoal - The updated goal object
 * @returns {Object|null} The updated goal if found, null otherwise
 */
function updateGoalById(id, updatedGoal) {
  const index = goals.findIndex(goal => goal.id === id);
  if (index === -1) {
    return null;
  }
  goals[index] = updatedGoal;
  return updatedGoal;
}

/**
 * Deletes a goal from storage
 * @param {string} id - The goal ID
 * @returns {boolean} True if deleted, false if not found
 */
function deleteGoalById(id) {
  const index = goals.findIndex(goal => goal.id === id);
  if (index === -1) {
    return false;
  }
  goals.splice(index, 1);
  return true;
}

/**
 * Clears all goals from storage (useful for testing)
 * @returns {void}
 */
function clearAllGoals() {
  goals = [];
}

module.exports = {
  saveGoal,
  getAllGoals,
  findGoalById,
  updateGoalById,
  deleteGoalById,
  clearAllGoals
};
