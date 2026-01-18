/**
 * Example usage demonstrating the separation of UI and business logic
 * This shows how the business logic can be used independently of any UI
 */

const goalService = require('./src/business/goalService');
const { filterByStatus, filterByPriority } = require('./src/business/goalFilters');
const { sortByPriority } = require('./src/business/goalSorters');

console.log('=== Goal Tracker Demo ===\n');

// Example 1: Create goals using business logic only
console.log('1. Creating goals...');
const goal1 = goalService.addGoal({
  title: 'Learn Node.js',
  description: 'Complete advanced Node.js course',
  priority: 'high',
  status: 'not-started',
  dueDate: '2024-12-31'
});

const goal2 = goalService.addGoal({
  title: 'Exercise daily',
  description: '30 minutes of cardio',
  priority: 'medium',
  status: 'in-progress',
  dueDate: '2024-11-30'
});

const goal3 = goalService.addGoal({
  title: 'Read 12 books',
  description: 'One book per month',
  priority: 'low',
  status: 'not-started',
  dueDate: '2024-12-31'
});

console.log(`Created ${goal1.success ? '✓' : '✗'} Goal 1: ${goal1.goal?.title}`);
console.log(`Created ${goal2.success ? '✓' : '✗'} Goal 2: ${goal2.goal?.title}`);
console.log(`Created ${goal3.success ? '✓' : '✗'} Goal 3: ${goal3.goal?.title}`);

// Example 2: Validation - attempt to create invalid goal
console.log('\n2. Testing validation with invalid goal...');
const invalidGoal = goalService.addGoal({
  title: '', // Invalid: empty title
  priority: 'high',
  status: 'not-started'
});

console.log(`Invalid goal: ${invalidGoal.success ? 'Created' : 'Rejected ✓'}`);
if (!invalidGoal.success) {
  console.log(`Errors: ${invalidGoal.errors.join(', ')}`);
}

// Example 3: List all goals
console.log('\n3. Listing all goals...');
const allGoals = goalService.listGoals();
console.log(`Total goals: ${allGoals.length}`);
allGoals.forEach(goal => {
  console.log(`  - [${goal.priority.toUpperCase()}] ${goal.title} (${goal.status})`);
});

// Example 4: Filter by status
console.log('\n4. Filtering by status (in-progress)...');
const inProgressGoals = filterByStatus(allGoals, 'in-progress');
console.log(`In-progress goals: ${inProgressGoals.length}`);
inProgressGoals.forEach(goal => {
  console.log(`  - ${goal.title}`);
});

// Example 5: Filter by priority and sort
console.log('\n5. High priority goals sorted...');
const highPriorityGoals = filterByPriority(allGoals, 'high');
const sortedGoals = sortByPriority(highPriorityGoals);
console.log(`High priority goals: ${highPriorityGoals.length}`);
sortedGoals.forEach(goal => {
  console.log(`  - ${goal.title}`);
});

// Example 6: Update a goal
console.log('\n6. Updating a goal...');
if (goal2.goal) {
  const updated = goalService.modifyGoal(goal2.goal.id, {
    status: 'completed'
  });
  console.log(`Updated ${goal2.goal.title}: ${updated.success ? '✓' : '✗'}`);
  console.log(`New status: ${updated.goal?.status}`);
}

// Example 7: Delete a goal
console.log('\n7. Deleting a goal...');
if (goal3.goal) {
  const deleted = goalService.removeGoal(goal3.goal.id);
  console.log(`Deleted ${goal3.goal.title}: ${deleted.success ? '✓' : '✗'}`);
}

// Final count
console.log('\n8. Final goal count...');
const finalGoals = goalService.listGoals();
console.log(`Remaining goals: ${finalGoals.length}`);

console.log('\n=== Demo Complete ===');
console.log('\nKey Observations:');
console.log('✓ Business logic works completely independent of UI');
console.log('✓ All validation happens in the business layer');
console.log('✓ Each function has a single, clear responsibility');
console.log('✓ Functions are small, testable, and composable');
console.log('✓ No DOM manipulation or HTML in business logic');
