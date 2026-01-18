# Architecture Documentation

## Overview

This Goal Tracker application demonstrates clean code architecture with:
- **Single Responsibility Principle (SRP)**: Each function does one thing
- **Separation of Concerns (SoC)**: UI and business logic are completely separated
- **Testability**: Small, focused, pure functions

## Layer Architecture

```
┌─────────────────────────────────────────────────┐
│              UI Layer (Presentation)             │
│  ┌──────────────────┐   ┌──────────────────┐   │
│  │ goalController.js│   │  goalRenderer.js  │   │
│  │  - Event handling│   │ - HTML generation │   │
│  │  - User actions  │   │ - Display logic   │   │
│  └──────────────────┘   └──────────────────┘   │
└─────────────────┬───────────────────────────────┘
                  │ Delegates to
                  ▼
┌─────────────────────────────────────────────────┐
│          Business Logic Layer (Core)             │
│  ┌──────────────────┐   ┌──────────────────┐   │
│  │  goalService.js  │   │ goalValidator.js  │   │
│  │  - Orchestration │   │ - Validation rules│   │
│  └──────────────────┘   └──────────────────┘   │
│  ┌──────────────────┐   ┌──────────────────┐   │
│  │  goalFactory.js  │   │ goalFilters.js    │   │
│  │  - Object creation│   │ - Filter logic    │   │
│  └──────────────────┘   └──────────────────┘   │
│  ┌──────────────────┐   ┌──────────────────┐   │
│  │ goalRepository.js│   │ goalSorters.js    │   │
│  │  - Data storage  │   │ - Sort logic      │   │
│  └──────────────────┘   └──────────────────┘   │
└─────────────────┬───────────────────────────────┘
                  │ Uses
                  ▼
┌─────────────────────────────────────────────────┐
│            Utilities Layer (Helpers)             │
│  ┌──────────────────┐   ┌──────────────────┐   │
│  │  idGenerator.js  │   │ dateFormatter.js  │   │
│  │  - ID creation   │   │ - Date formatting │   │
│  └──────────────────┘   └──────────────────┘   │
└─────────────────────────────────────────────────┘
```

## Single Responsibility Examples

### Before (Violates SRP)
```javascript
// ❌ This function does TOO MUCH
function addGoal(formData) {
  // Validation
  if (!formData.title || formData.title.length > 100) {
    return { error: 'Invalid title' };
  }
  
  // Object creation
  const goal = {
    id: Date.now(),
    title: formData.title,
    priority: formData.priority || 'medium',
    createdAt: new Date()
  };
  
  // Storage
  goals.push(goal);
  
  // UI update
  document.getElementById('list').innerHTML += renderGoal(goal);
  
  return { success: true };
}
```

### After (Follows SRP)
```javascript
// ✅ Each function has ONE responsibility

// Validation (single responsibility: validate title)
function isValidTitle(title) {
  return typeof title === 'string' && 
         title.trim().length > 0 && 
         title.length <= 100;
}

// Object creation (single responsibility: create goal)
function createGoal(goalData) {
  return {
    id: generateId(),
    title: goalData.title,
    priority: goalData.priority || 'medium',
    createdAt: new Date().toISOString()
  };
}

// Storage (single responsibility: save goal)
function saveGoal(goal) {
  goals.push(goal);
  return goal;
}

// Orchestration (single responsibility: coordinate operations)
function addGoal(goalData) {
  const validation = validateGoal(goalData);
  if (!validation.isValid) {
    return { success: false, errors: validation.errors };
  }
  
  const goal = createGoal(goalData);
  const saved = saveGoal(goal);
  
  return { success: true, goal: saved };
}

// UI (separate file - single responsibility: handle form submission)
function handleFormSubmit(event) {
  const formData = getFormData();
  const result = goalService.addGoal(formData);
  
  if (result.success) {
    refreshGoalList();
  } else {
    displayErrors(result.errors);
  }
}
```

## Separation of Concerns Examples

### UI Layer (goalController.js)
- **Responsibility**: Handle user interactions
- **Does**: Event listening, form data collection, UI updates
- **Does NOT**: Validation, business rules, data manipulation

```javascript
function handleFormSubmit(event) {
  event.preventDefault();
  const formData = getFormData(); // UI task
  const result = goalService.addGoal(formData); // Delegates to business logic
  
  if (result.success) {
    refreshGoalList(); // UI task
  } else {
    displayErrors(result.errors); // UI task
  }
}
```

### Business Logic Layer (goalService.js)
- **Responsibility**: Execute business operations
- **Does**: Validation, data processing, business rules
- **Does NOT**: DOM manipulation, HTML generation, event handling

```javascript
function addGoal(goalData) {
  const validation = validateGoal(goalData); // Business logic
  
  if (!validation.isValid) {
    return { success: false, errors: validation.errors };
  }
  
  const goal = createGoal(goalData); // Business logic
  const savedGoal = saveGoal(goal); // Business logic
  
  return { success: true, goal: savedGoal };
}
```

## Benefits

### 1. Testability
- Business logic can be tested without a browser
- Each function can be tested in isolation
- Mock dependencies easily
- 96% test coverage on business logic

### 2. Maintainability
- Easy to find where logic lives
- Changes are localized
- Clear dependencies between modules

### 3. Reusability
- Business logic works in any environment:
  - Web browser
  - Mobile app
  - Command-line tool
  - API server
- Functions can be composed in different ways

### 4. Flexibility
- Easy to swap implementations:
  - Change from in-memory to database storage
  - Switch from HTML to React/Vue
  - Add REST API without changing business logic

### 5. Readability
- Small functions (5-20 lines)
- Clear, descriptive names
- Single purpose per function
- Easy to understand at a glance

## Code Organization Principles

### File Structure
- One module per file
- Related functions grouped together
- Clear naming: file name matches primary export

### Function Design
- **Length**: 5-20 lines ideal
- **Parameters**: 0-3 parameters ideal
- **Return**: Consistent return types
- **Side Effects**: Minimize or eliminate

### Module Dependencies
- **UI depends on Business Logic**: ✓
- **Business Logic depends on UI**: ✗
- **Business Logic depends on Utilities**: ✓
- **Utilities depend on Business Logic**: ✗

## Example Use Cases

### Adding a new feature
**Requirement**: Add "tags" to goals

1. **Business Logic** (goalValidator.js):
   ```javascript
   function isValidTags(tags) {
     return Array.isArray(tags) && tags.every(tag => typeof tag === 'string');
   }
   ```

2. **Business Logic** (goalFactory.js):
   ```javascript
   function createGoal(goalData) {
     return {
       // ... existing fields
       tags: goalData.tags || []
     };
   }
   ```

3. **UI** (goalRenderer.js):
   ```javascript
   function renderGoal(goal) {
     return `
       ...
       <div class="tags">
         ${goal.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
       </div>
     `;
   }
   ```

**Notice**: Each layer handles only its concern!

### Changing storage from memory to database
Only need to modify `goalRepository.js`:

```javascript
// Before
let goals = [];
function saveGoal(goal) {
  goals.push(goal);
  return goal;
}

// After
function saveGoal(goal) {
  return database.goals.insert(goal);
}
```

**Notice**: No changes needed to UI or other business logic!

## Testing Strategy

### Unit Tests (Business Logic)
- Test each function independently
- Cover edge cases
- Validate error handling
- **Result**: 56 tests, 96% coverage

### Integration Tests (Planned)
- Test module interactions
- Validate data flow
- End-to-end scenarios

### UI Tests (Minimal)
- Simple because UI delegates to tested business logic
- Focus on event handling and rendering
- Can use tools like Testing Library

## Conclusion

This architecture demonstrates that even a simple application benefits from:
- Clear separation of concerns
- Single responsibility functions
- Testable, maintainable code
- Flexible, reusable modules

These principles scale from small projects to large applications.
