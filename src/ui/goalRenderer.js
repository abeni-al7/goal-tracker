/**
 * Goal renderer - Handles HTML rendering of goals
 * Single responsibility: Convert goal data to HTML
 * Separated from business logic - only handles presentation
 */

const { formatDateLong, isPastDate } = require('../utils/dateFormatter');

/**
 * Renders a single goal as HTML
 * @param {Object} goal - The goal object
 * @returns {string} HTML string for the goal
 */
function renderGoal(goal) {
  const statusClass = goal.status;
  const priorityClass = `priority-${goal.priority}`;
  const overdueClass = isPastDate(goal.dueDate) && goal.status !== 'completed' ? 'overdue' : '';
  
  return `
    <div class="goal-item ${statusClass} ${priorityClass} ${overdueClass}" data-id="${goal.id}">
      <div class="goal-header">
        <h3 class="goal-title">${escapeHtml(goal.title)}</h3>
        <span class="goal-priority">${goal.priority}</span>
      </div>
      <p class="goal-description">${escapeHtml(goal.description)}</p>
      <div class="goal-meta">
        <span class="goal-status">${formatStatus(goal.status)}</span>
        <span class="goal-due-date">${formatDateLong(goal.dueDate)}</span>
      </div>
      <div class="goal-actions">
        <button class="btn-edit" data-id="${goal.id}">Edit</button>
        <button class="btn-delete" data-id="${goal.id}">Delete</button>
        ${renderStatusButtons(goal)}
      </div>
    </div>
  `;
}

/**
 * Renders status change buttons
 * @param {Object} goal - The goal object
 * @returns {string} HTML for status buttons
 */
function renderStatusButtons(goal) {
  if (goal.status === 'completed') {
    return `<button class="btn-status" data-id="${goal.id}" data-status="in-progress">Reopen</button>`;
  }
  if (goal.status === 'in-progress') {
    return `<button class="btn-status" data-id="${goal.id}" data-status="completed">Complete</button>`;
  }
  return `<button class="btn-status" data-id="${goal.id}" data-status="in-progress">Start</button>`;
}

/**
 * Renders a list of goals as HTML
 * @param {Array} goals - Array of goal objects
 * @returns {string} HTML string for the goal list
 */
function renderGoalList(goals) {
  if (goals.length === 0) {
    return '<p class="no-goals">No goals found. Create one to get started!</p>';
  }
  
  return goals.map(goal => renderGoal(goal)).join('');
}

/**
 * Renders the goal form
 * @param {Object} goal - Optional goal object for editing
 * @returns {string} HTML string for the form
 */
function renderGoalForm(goal = null) {
  const isEdit = goal !== null;
  const buttonText = isEdit ? 'Update Goal' : 'Add Goal';
  
  return `
    <form id="goal-form" class="goal-form">
      <input type="hidden" id="goal-id" value="${isEdit ? goal.id : ''}">
      
      <div class="form-group">
        <label for="goal-title">Title *</label>
        <input 
          type="text" 
          id="goal-title" 
          name="title" 
          required 
          maxlength="100"
          value="${isEdit ? escapeHtml(goal.title) : ''}"
        >
      </div>
      
      <div class="form-group">
        <label for="goal-description">Description</label>
        <textarea 
          id="goal-description" 
          name="description" 
          maxlength="500"
        >${isEdit ? escapeHtml(goal.description) : ''}</textarea>
      </div>
      
      <div class="form-group">
        <label for="goal-priority">Priority</label>
        <select id="goal-priority" name="priority">
          <option value="low" ${isEdit && goal.priority === 'low' ? 'selected' : ''}>Low</option>
          <option value="medium" ${isEdit && goal.priority === 'medium' ? 'selected' : 'selected'}>Medium</option>
          <option value="high" ${isEdit && goal.priority === 'high' ? 'selected' : ''}>High</option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="goal-due-date">Due Date</label>
        <input 
          type="date" 
          id="goal-due-date" 
          name="dueDate"
          value="${isEdit && goal.dueDate ? goal.dueDate.split('T')[0] : ''}"
        >
      </div>
      
      <div class="form-actions">
        <button type="submit" class="btn-primary">${buttonText}</button>
        ${isEdit ? '<button type="button" class="btn-cancel">Cancel</button>' : ''}
      </div>
    </form>
  `;
}

/**
 * Renders error messages
 * @param {Array} errors - Array of error messages
 * @returns {string} HTML string for errors
 */
function renderErrors(errors) {
  if (!errors || errors.length === 0) return '';
  
  return `
    <div class="error-messages">
      <ul>
        ${errors.map(error => `<li>${escapeHtml(error)}</li>`).join('')}
      </ul>
    </div>
  `;
}

/**
 * Formats status for display
 * @param {string} status - The status value
 * @returns {string} Formatted status text
 */
function formatStatus(status) {
  return status.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

/**
 * Escapes HTML to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
  if (!text) return '';
  const div = { innerHTML: '' };
  const textNode = text.toString();
  return textNode
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

module.exports = {
  renderGoal,
  renderGoalList,
  renderGoalForm,
  renderErrors,
  escapeHtml
};
