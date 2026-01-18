"""Core goal tracking functionality."""

from datetime import datetime
from typing import List, Optional


class Goal:
    """Represents a single goal with tracking capabilities."""

    def __init__(self, title: str, description: str = ""):
        """Initialize a new goal.

        Args:
            title: The goal title
            description: Optional detailed description
        """
        if not title or not title.strip():
            raise ValueError("Goal title cannot be empty")

        self.title = title.strip()
        self.description = description.strip()
        self.completed = False
        self.created_at = datetime.now()
        self.completed_at: Optional[datetime] = None

    def complete(self) -> None:
        """Mark the goal as completed."""
        if not self.completed:
            self.completed = True
            self.completed_at = datetime.now()

    def uncomplete(self) -> None:
        """Mark the goal as not completed."""
        if self.completed:
            self.completed = False
            self.completed_at = None

    def __repr__(self) -> str:
        """Return string representation of the goal."""
        status = "✓" if self.completed else "○"
        return f"{status} {self.title}"


class GoalTracker:
    """Manages a collection of goals."""

    def __init__(self):
        """Initialize an empty goal tracker."""
        self.goals: List[Goal] = []

    def add_goal(self, title: str, description: str = "") -> Goal:
        """Add a new goal to the tracker.

        Args:
            title: The goal title
            description: Optional detailed description

        Returns:
            The newly created Goal object
        """
        goal = Goal(title, description)
        self.goals.append(goal)
        return goal

    def remove_goal(self, goal: Goal) -> bool:
        """Remove a goal from the tracker.

        Args:
            goal: The goal to remove

        Returns:
            True if the goal was removed, False if not found
        """
        try:
            self.goals.remove(goal)
            return True
        except ValueError:
            return False

    def get_active_goals(self) -> List[Goal]:
        """Get all active (not completed) goals.

        Returns:
            List of active goals
        """
        return [goal for goal in self.goals if not goal.completed]

    def get_completed_goals(self) -> List[Goal]:
        """Get all completed goals.

        Returns:
            List of completed goals
        """
        return [goal for goal in self.goals if goal.completed]

    def get_all_goals(self) -> List[Goal]:
        """Get all goals.

        Returns:
            List of all goals
        """
        return self.goals.copy()

    def __len__(self) -> int:
        """Return the number of goals."""
        return len(self.goals)
