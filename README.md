# Goal Tracker

A clean, well-structured goal tracking application demonstrating:
- **Single Responsibility Principle**: Each function has one clear purpose
- **Separation of Concerns**: UI is completely separated from business logic
- **Testability**: Small, focused functions that are easy to test

## Architecture

### Directory Structure

```
goal-tracker/
├── src/
│   ├── business/          # Business logic layer (no UI dependencies)
│   │   ├── goalValidator.js    # Validation functions
│   │   ├── goalFactory.js      # Goal creation/update
│   │   ├── goalRepository.js   # Data storage/retrieval
│   │   ├── goalService.js      # Business operations coordinator
│   │   ├── goalFilters.js      # Filtering utilities
│   │   └── goalSorters.js      # Sorting utilities
│   ├── ui/                # UI layer (presentation only)
│   │   ├── goalRenderer.js     # HTML rendering
│   │   └── goalController.js   # UI event handling
│   ├── utils/             # Shared utilities
│   │   ├── idGenerator.js      # ID generation
│   │   └── dateFormatter.js    # Date formatting
│   └── index.js           # Application entry point
├── tests/                 # Test files
└── index.html            # Main HTML file
```

### Design Principles

#### 1. Single Responsibility

Each function does ONE thing:
- `isValidTitle()` - validates only titles
- `filterByStatus()` - filters only by status
- `sortByPriority()` - sorts only by priority
- `renderGoal()` - renders only a single goal

#### 2. Separation of UI and Business Logic

**Business Logic (`src/business/`):**
- Contains no DOM manipulation or HTML
- Pure JavaScript functions
- Can be tested without a browser
- Reusable in different UIs (web, mobile, CLI)

**UI Layer (`src/ui/`):**
- Only handles presentation and user interaction
- Delegates all business logic to services
- Never contains validation or data manipulation

Example:
```javascript
// ✅ GOOD - UI delegates to business logic
function handleFormSubmit(event) {
  const formData = getFormData();
  const result = goalService.addGoal(formData); // Business logic
  if (result.success) {
    refreshGoalList(); // UI update
  }
}

// ❌ BAD - UI contains business logic
function handleFormSubmit(event) {
  const formData = getFormData();
  if (formData.title.length > 100) { // Validation in UI
    showError('Title too long');
  }
  goals.push(formData); // Direct data manipulation
}
```

#### 3. Testability

- Small functions (5-20 lines)
- Pure functions where possible (same input → same output)
- No hidden dependencies
- Easy to mock and test in isolation

### Key Components

#### Business Logic Layer

1. **goalValidator.js**: Validates goal data
   - Each validation rule in a separate function
   - Composable validation

2. **goalFactory.js**: Creates and updates goal objects
   - Ensures consistent object structure
   - Handles defaults

3. **goalRepository.js**: Manages data persistence
   - CRUD operations
   - In-memory storage (easily replaceable with database)

4. **goalService.js**: Coordinates business operations
   - Validates before saving
   - Composes validator, factory, and repository

5. **goalFilters.js**: Filters goal lists
   - Each filter is a pure function
   - Composable filters

6. **goalSorters.js**: Sorts goal lists
   - Each sorter is a pure function
   - Non-mutating (returns new array)

#### UI Layer

1. **goalRenderer.js**: Converts data to HTML
   - Pure rendering functions
   - XSS protection through escaping

2. **goalController.js**: Handles user interaction
   - Event listeners
   - Delegates to business logic
   - Updates UI based on results

## Installation

```bash
npm install
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Usage

Open `index.html` in a web browser or serve it with a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server
```

Then navigate to `http://localhost:8000`

## Features

- ✅ Create, read, update, delete goals
- ✅ Priority levels (low, medium, high)
- ✅ Status tracking (not started, in progress, completed)
- ✅ Due dates with overdue indicators
- ✅ Filtering by status and priority
- ✅ Search functionality
- ✅ Multiple sort options
- ✅ Form validation
- ✅ Responsive design

## Testing

The business logic layer is fully tested with unit tests. Each module has corresponding tests that verify:
- Individual function behavior
- Edge cases
- Error handling
- Integration between modules

UI components are kept simple and delegate to tested business logic, reducing the need for complex UI tests.

## Benefits of This Architecture

1. **Maintainability**: Easy to find and fix bugs
2. **Testability**: High test coverage of business logic
3. **Reusability**: Business logic works in any environment
4. **Scalability**: Easy to add new features
5. **Readability**: Clear, focused functions
6. **Flexibility**: Easy to swap storage or UI framework