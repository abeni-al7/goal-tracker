"""Unit tests for the goal tracker application."""

import pytest
from datetime import datetime
from goal_tracker import Goal, GoalTracker


class TestGoal:
    """Test cases for the Goal class."""

    def test_create_goal_with_title(self):
        """Test creating a goal with just a title."""
        goal = Goal("Learn Python")
        assert goal.title == "Learn Python"
        assert goal.description == ""
        assert not goal.completed
        assert goal.completed_at is None
        assert isinstance(goal.created_at, datetime)

    def test_create_goal_with_description(self):
        """Test creating a goal with title and description."""
        goal = Goal("Learn Python", "Master Python programming")
        assert goal.title == "Learn Python"
        assert goal.description == "Master Python programming"

    def test_create_goal_strips_whitespace(self):
        """Test that whitespace is stripped from title and description."""
        goal = Goal("  Learn Python  ", "  Description  ")
        assert goal.title == "Learn Python"
        assert goal.description == "Description"

    def test_create_goal_empty_title_raises_error(self):
        """Test that empty title raises ValueError."""
        with pytest.raises(ValueError, match="Goal title cannot be empty"):
            Goal("")

    def test_create_goal_whitespace_only_title_raises_error(self):
        """Test that whitespace-only title raises ValueError."""
        with pytest.raises(ValueError, match="Goal title cannot be empty"):
            Goal("   ")

    def test_complete_goal(self):
        """Test marking a goal as completed."""
        goal = Goal("Learn Python")
        assert not goal.completed
        assert goal.completed_at is None

        goal.complete()
        assert goal.completed
        assert isinstance(goal.completed_at, datetime)

    def test_complete_already_completed_goal(self):
        """Test completing an already completed goal."""
        goal = Goal("Learn Python")
        goal.complete()
        first_completed_at = goal.completed_at

        goal.complete()
        assert goal.completed
        assert goal.completed_at == first_completed_at

    def test_uncomplete_goal(self):
        """Test marking a completed goal as not completed."""
        goal = Goal("Learn Python")
        goal.complete()
        assert goal.completed

        goal.uncomplete()
        assert not goal.completed
        assert goal.completed_at is None

    def test_uncomplete_not_completed_goal(self):
        """Test uncompleting a goal that's not completed."""
        goal = Goal("Learn Python")
        goal.uncomplete()
        assert not goal.completed
        assert goal.completed_at is None

    def test_goal_repr_not_completed(self):
        """Test string representation of uncompleted goal."""
        goal = Goal("Learn Python")
        assert repr(goal) == "○ Learn Python"

    def test_goal_repr_completed(self):
        """Test string representation of completed goal."""
        goal = Goal("Learn Python")
        goal.complete()
        assert repr(goal) == "✓ Learn Python"


class TestGoalTracker:
    """Test cases for the GoalTracker class."""

    def test_create_empty_tracker(self):
        """Test creating an empty goal tracker."""
        tracker = GoalTracker()
        assert len(tracker) == 0
        assert tracker.get_all_goals() == []

    def test_add_goal(self):
        """Test adding a goal to the tracker."""
        tracker = GoalTracker()
        goal = tracker.add_goal("Learn Python")

        assert len(tracker) == 1
        assert goal.title == "Learn Python"
        assert goal in tracker.goals

    def test_add_goal_with_description(self):
        """Test adding a goal with description."""
        tracker = GoalTracker()
        goal = tracker.add_goal("Learn Python", "Master Python programming")

        assert goal.title == "Learn Python"
        assert goal.description == "Master Python programming"

    def test_add_multiple_goals(self):
        """Test adding multiple goals."""
        tracker = GoalTracker()
        goal1 = tracker.add_goal("Learn Python")
        goal2 = tracker.add_goal("Learn JavaScript")
        goal3 = tracker.add_goal("Build a project")

        assert len(tracker) == 3
        assert all(g in tracker.goals for g in [goal1, goal2, goal3])

    def test_remove_goal(self):
        """Test removing a goal from the tracker."""
        tracker = GoalTracker()
        goal = tracker.add_goal("Learn Python")

        result = tracker.remove_goal(goal)
        assert result is True
        assert len(tracker) == 0
        assert goal not in tracker.goals

    def test_remove_nonexistent_goal(self):
        """Test removing a goal that's not in the tracker."""
        tracker = GoalTracker()
        goal = Goal("Learn Python")

        result = tracker.remove_goal(goal)
        assert result is False

    def test_get_active_goals(self):
        """Test getting all active goals."""
        tracker = GoalTracker()
        goal1 = tracker.add_goal("Learn Python")
        goal2 = tracker.add_goal("Learn JavaScript")
        goal3 = tracker.add_goal("Build a project")

        goal2.complete()

        active = tracker.get_active_goals()
        assert len(active) == 2
        assert goal1 in active
        assert goal3 in active
        assert goal2 not in active

    def test_get_completed_goals(self):
        """Test getting all completed goals."""
        tracker = GoalTracker()
        goal1 = tracker.add_goal("Learn Python")
        goal2 = tracker.add_goal("Learn JavaScript")
        goal3 = tracker.add_goal("Build a project")

        goal1.complete()
        goal3.complete()

        completed = tracker.get_completed_goals()
        assert len(completed) == 2
        assert goal1 in completed
        assert goal3 in completed
        assert goal2 not in completed

    def test_get_all_goals(self):
        """Test getting all goals."""
        tracker = GoalTracker()
        goal1 = tracker.add_goal("Learn Python")
        goal2 = tracker.add_goal("Learn JavaScript")

        goal1.complete()

        all_goals = tracker.get_all_goals()
        assert len(all_goals) == 2
        assert goal1 in all_goals
        assert goal2 in all_goals

    def test_get_all_goals_returns_copy(self):
        """Test that get_all_goals returns a copy, not the original list."""
        tracker = GoalTracker()
        tracker.add_goal("Learn Python")

        goals = tracker.get_all_goals()
        goals.append(Goal("Extra goal"))

        assert len(tracker) == 1
