/**
 * Goal service - Business logic for goal operations
 * Single responsibility: Coordinate goal CRUD operations with validation
 */

const { createGoal, updateGoal } = require('./goalFactory');
const { validateGoal } = require('./goalValidator');
const {
  saveGoal,
  getAllGoals,
  findGoalById,
  updateGoalById,
  deleteGoalById
} = require('./goalRepository');

/**
 * Creates a new goal with validation
 * @param {Object} goalData - The goal data
 * @returns {Object} Result with success status, goal, and any errors
 */
function addGoal(goalData) {
  const validation = validateGoal(goalData);
  
  if (!validation.isValid) {
    return {
      success: false,
      errors: validation.errors
    };
  }
  
  const goal = createGoal(goalData);
  const savedGoal = saveGoal(goal);
  
  return {
    success: true,
    goal: savedGoal
  };
}

/**
 * Retrieves all goals
 * @returns {Array} Array of all goals
 */
function listGoals() {
  return getAllGoals();
}

/**
 * Retrieves a specific goal by ID
 * @param {string} id - The goal ID
 * @returns {Object|null} The goal if found, null otherwise
 */
function getGoal(id) {
  return findGoalById(id);
}

/**
 * Updates an existing goal with validation
 * @param {string} id - The goal ID
 * @param {Object} updates - The fields to update
 * @returns {Object} Result with success status, goal, and any errors
 */
function modifyGoal(id, updates) {
  const existingGoal = findGoalById(id);
  
  if (!existingGoal) {
    return {
      success: false,
      errors: ['Goal not found']
    };
  }
  
  const updatedGoal = updateGoal(existingGoal, updates);
  const validation = validateGoal(updatedGoal);
  
  if (!validation.isValid) {
    return {
      success: false,
      errors: validation.errors
    };
  }
  
  const savedGoal = updateGoalById(id, updatedGoal);
  
  return {
    success: true,
    goal: savedGoal
  };
}

/**
 * Deletes a goal
 * @param {string} id - The goal ID
 * @returns {Object} Result with success status
 */
function removeGoal(id) {
  const deleted = deleteGoalById(id);
  
  return {
    success: deleted,
    errors: deleted ? [] : ['Goal not found']
  };
}

module.exports = {
  addGoal,
  listGoals,
  getGoal,
  modifyGoal,
  removeGoal
};
