/**
 * Goal validation utilities
 * Each function has a single responsibility: validate one aspect of a goal
 */

/**
 * Validates if a title is non-empty and within length limits
 * @param {string} title - The goal title to validate
 * @returns {boolean} True if valid, false otherwise
 */
function isValidTitle(title) {
  return typeof title === 'string' && title.trim().length > 0 && title.length <= 100;
}

/**
 * Validates if a description is within length limits
 * @param {string} description - The goal description to validate
 * @returns {boolean} True if valid, false otherwise
 */
function isValidDescription(description) {
  if (description === null || description === undefined || description === '') {
    return true; // Description is optional
  }
  return typeof description === 'string' && description.length <= 500;
}

/**
 * Validates if a priority is a valid value
 * @param {string} priority - The priority to validate
 * @returns {boolean} True if valid, false otherwise
 */
function isValidPriority(priority) {
  const validPriorities = ['low', 'medium', 'high'];
  return validPriorities.includes(priority);
}

/**
 * Validates if a status is a valid value
 * @param {string} status - The status to validate
 * @returns {boolean} True if valid, false otherwise
 */
function isValidStatus(status) {
  const validStatuses = ['not-started', 'in-progress', 'completed'];
  return validStatuses.includes(status);
}

/**
 * Validates if a due date is valid (either null or a future date)
 * @param {Date|string|null} dueDate - The due date to validate
 * @returns {boolean} True if valid, false otherwise
 */
function isValidDueDate(dueDate) {
  if (dueDate === null || dueDate === undefined) {
    return true; // Due date is optional
  }
  
  const date = new Date(dueDate);
  return !isNaN(date.getTime());
}

/**
 * Validates all goal fields
 * @param {Object} goal - The goal object to validate
 * @returns {Object} Validation result with isValid and errors array
 */
function validateGoal(goal) {
  const errors = [];
  
  if (!isValidTitle(goal.title)) {
    errors.push('Title must be a non-empty string with maximum 100 characters');
  }
  
  if (!isValidDescription(goal.description)) {
    errors.push('Description must be a string with maximum 500 characters');
  }
  
  if (!isValidPriority(goal.priority)) {
    errors.push('Priority must be one of: low, medium, high');
  }
  
  if (!isValidStatus(goal.status)) {
    errors.push('Status must be one of: not-started, in-progress, completed');
  }
  
  if (!isValidDueDate(goal.dueDate)) {
    errors.push('Due date must be a valid date');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

module.exports = {
  isValidTitle,
  isValidDescription,
  isValidPriority,
  isValidStatus,
  isValidDueDate,
  validateGoal
};
