/**
 * Main entry point for the Goal Tracker application
 * Demonstrates separation of UI from business logic
 */

const { initializeUI } = require('./ui/goalController');

// This would typically run in a browser environment
// For demonstration, we export the initialization function
module.exports = {
  initializeUI
};

// If running in Node.js for testing
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('app');
    initializeUI(container);
  });
}
