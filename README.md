# Goal Tracker

A simple Python library for tracking and managing goals.

## Features

- Create and manage goals with titles and descriptions
- Mark goals as completed or uncompleted
- Track when goals were created and completed
- Filter goals by status (active/completed)
- 100% test coverage

## Installation

```bash
# Install dependencies
pip install -r requirements.txt

# For development (includes testing and linting tools)
pip install -r requirements-dev.txt
```

## Usage

```python
from goal_tracker import Goal, GoalTracker

# Create a tracker
tracker = GoalTracker()

# Add goals
goal1 = tracker.add_goal("Learn Python", "Master Python programming")
goal2 = tracker.add_goal("Build a project")

# Complete a goal
goal1.complete()

# Get goals by status
active_goals = tracker.get_active_goals()
completed_goals = tracker.get_completed_goals()

# View goal status
print(goal1)  # ✓ Learn Python
print(goal2)  # ○ Build a project
```

## Development

### Running Tests

```bash
# Run all tests
pytest

# Run with coverage report
pytest --cov=goal_tracker --cov-report=term-missing
```

### Code Quality

```bash
# Format code with Black
black goal_tracker tests

# Lint with flake8
flake8 goal_tracker tests

# Check formatting
black --check goal_tracker tests
```

## CI/CD

This project uses GitHub Actions for continuous integration. On every pull request to `main`, the following checks are run:

1. **Code Formatting** - Ensures code follows Black formatting standards
2. **Linting** - Checks code quality with flake8
3. **Tests** - Runs the full test suite with coverage reporting

All checks must pass before merging.