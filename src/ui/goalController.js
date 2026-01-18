/**
 * Goal controller - Coordinates UI events with business logic
 * Single responsibility: Handle user interactions and update UI
 * Separated from business logic - delegates to service layer
 */

const goalService = require('../business/goalService');
const { filterByStatus, filterByPriority, searchGoals } = require('../business/goalFilters');
const { sortByDueDate, sortByPriority, sortByCreatedDate } = require('../business/goalSorters');
const { renderGoalList, renderGoalForm, renderErrors } = require('./goalRenderer');

/**
 * Current filter and sort settings
 */
let currentFilter = { type: 'all', value: null };
let currentSort = 'createdDate';

/**
 * Initializes the goal tracker UI
 * @param {HTMLElement} container - The container element
 * @returns {void}
 */
function initializeUI(container) {
  container.innerHTML = `
    <div class="goal-tracker">
      <header>
        <h1>Goal Tracker</h1>
      </header>
      
      <div class="controls">
        <div class="filters">
          <select id="filter-status">
            <option value="all">All Status</option>
            <option value="not-started">Not Started</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          
          <select id="filter-priority">
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          
          <input type="text" id="search-goals" placeholder="Search goals...">
        </div>
        
        <div class="sort">
          <select id="sort-goals">
            <option value="createdDate">Newest First</option>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>
      
      <div id="goal-form-container">
        ${renderGoalForm()}
      </div>
      
      <div id="error-container"></div>
      
      <div id="goal-list-container" class="goal-list">
        ${renderGoalList(goalService.listGoals())}
      </div>
    </div>
  `;
  
  attachEventListeners();
  refreshGoalList();
}

/**
 * Attaches event listeners to UI elements
 * @returns {void}
 */
function attachEventListeners() {
  // Form submission
  document.getElementById('goal-form').addEventListener('submit', handleFormSubmit);
  
  // Filters
  document.getElementById('filter-status').addEventListener('change', handleFilterChange);
  document.getElementById('filter-priority').addEventListener('change', handleFilterChange);
  document.getElementById('search-goals').addEventListener('input', handleSearch);
  
  // Sort
  document.getElementById('sort-goals').addEventListener('change', handleSortChange);
  
  // Goal actions (using event delegation)
  document.getElementById('goal-list-container').addEventListener('click', handleGoalAction);
}

/**
 * Handles form submission for creating/updating goals
 * @param {Event} event - The submit event
 * @returns {void}
 */
function handleFormSubmit(event) {
  event.preventDefault();
  
  const formData = getFormData();
  const goalId = document.getElementById('goal-id').value;
  
  let result;
  if (goalId) {
    // Update existing goal
    result = goalService.modifyGoal(goalId, formData);
  } else {
    // Create new goal
    result = goalService.addGoal(formData);
  }
  
  if (result.success) {
    clearForm();
    clearErrors();
    refreshGoalList();
  } else {
    displayErrors(result.errors);
  }
}

/**
 * Handles filter changes
 * @param {Event} event - The change event
 * @returns {void}
 */
function handleFilterChange(event) {
  const filterType = event.target.id.replace('filter-', '');
  const value = event.target.value;
  
  if (value === 'all') {
    currentFilter = { type: 'all', value: null };
  } else {
    currentFilter = { type: filterType, value };
  }
  
  refreshGoalList();
}

/**
 * Handles search input
 * @param {Event} event - The input event
 * @returns {void}
 */
function handleSearch(event) {
  const searchTerm = event.target.value;
  
  if (searchTerm.trim()) {
    currentFilter = { type: 'search', value: searchTerm };
  } else {
    currentFilter = { type: 'all', value: null };
  }
  
  refreshGoalList();
}

/**
 * Handles sort changes
 * @param {Event} event - The change event
 * @returns {void}
 */
function handleSortChange(event) {
  currentSort = event.target.value;
  refreshGoalList();
}

/**
 * Handles goal actions (edit, delete, status change)
 * @param {Event} event - The click event
 * @returns {void}
 */
function handleGoalAction(event) {
  const target = event.target;
  
  if (target.classList.contains('btn-edit')) {
    handleEdit(target.dataset.id);
  } else if (target.classList.contains('btn-delete')) {
    handleDelete(target.dataset.id);
  } else if (target.classList.contains('btn-status')) {
    handleStatusChange(target.dataset.id, target.dataset.status);
  } else if (target.classList.contains('btn-cancel')) {
    clearForm();
  }
}

/**
 * Handles editing a goal
 * @param {string} id - The goal ID
 * @returns {void}
 */
function handleEdit(id) {
  const goal = goalService.getGoal(id);
  if (goal) {
    document.getElementById('goal-form-container').innerHTML = renderGoalForm(goal);
    document.getElementById('goal-form').addEventListener('submit', handleFormSubmit);
  }
}

/**
 * Handles deleting a goal
 * @param {string} id - The goal ID
 * @returns {void}
 */
function handleDelete(id) {
  if (confirm('Are you sure you want to delete this goal?')) {
    goalService.removeGoal(id);
    refreshGoalList();
  }
}

/**
 * Handles changing goal status
 * @param {string} id - The goal ID
 * @param {string} newStatus - The new status
 * @returns {void}
 */
function handleStatusChange(id, newStatus) {
  goalService.modifyGoal(id, { status: newStatus });
  refreshGoalList();
}

/**
 * Gets form data as an object
 * @returns {Object} Form data
 */
function getFormData() {
  return {
    title: document.getElementById('goal-title').value,
    description: document.getElementById('goal-description').value,
    priority: document.getElementById('goal-priority').value,
    dueDate: document.getElementById('goal-due-date').value || null,
    status: 'not-started'
  };
}

/**
 * Clears the form
 * @returns {void}
 */
function clearForm() {
  document.getElementById('goal-form-container').innerHTML = renderGoalForm();
  document.getElementById('goal-form').addEventListener('submit', handleFormSubmit);
}

/**
 * Displays errors
 * @param {Array} errors - Array of error messages
 * @returns {void}
 */
function displayErrors(errors) {
  document.getElementById('error-container').innerHTML = renderErrors(errors);
}

/**
 * Clears errors
 * @returns {void}
 */
function clearErrors() {
  document.getElementById('error-container').innerHTML = '';
}

/**
 * Refreshes the goal list with current filters and sort
 * @returns {void}
 */
function refreshGoalList() {
  let goals = goalService.listGoals();
  
  // Apply filters
  if (currentFilter.type === 'status') {
    goals = filterByStatus(goals, currentFilter.value);
  } else if (currentFilter.type === 'priority') {
    goals = filterByPriority(goals, currentFilter.value);
  } else if (currentFilter.type === 'search') {
    goals = searchGoals(goals, currentFilter.value);
  }
  
  // Apply sort
  if (currentSort === 'dueDate') {
    goals = sortByDueDate(goals);
  } else if (currentSort === 'priority') {
    goals = sortByPriority(goals);
  } else if (currentSort === 'createdDate') {
    goals = sortByCreatedDate(goals);
  }
  
  document.getElementById('goal-list-container').innerHTML = renderGoalList(goals);
}

module.exports = {
  initializeUI
};
