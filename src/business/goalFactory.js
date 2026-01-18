/**
 * Goal factory - Creates goal objects with default values
 * Single responsibility: Create properly structured goal objects
 */

const { generateId } = require('../utils/idGenerator');

/**
 * Creates a new goal object with all required fields
 * @param {Object} goalData - The goal data
 * @returns {Object} A complete goal object
 */
function createGoal(goalData) {
  return {
    id: generateId(),
    title: goalData.title,
    description: goalData.description || '',
    priority: goalData.priority || 'medium',
    status: goalData.status || 'not-started',
    dueDate: goalData.dueDate || null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

/**
 * Updates an existing goal with new data
 * @param {Object} existingGoal - The current goal object
 * @param {Object} updates - The fields to update
 * @returns {Object} The updated goal object
 */
function updateGoal(existingGoal, updates) {
  return {
    ...existingGoal,
    ...updates,
    id: existingGoal.id, // Ensure ID doesn't change
    createdAt: existingGoal.createdAt, // Ensure createdAt doesn't change
    updatedAt: new Date().toISOString()
  };
}

module.exports = {
  createGoal,
  updateGoal
};
