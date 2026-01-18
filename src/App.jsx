import { useState, useEffect } from 'react'
import GoalForm from './components/GoalForm'
import GoalList from './components/GoalList'
import { loadGoals, saveGoals } from './utils/localStorage'
import './App.css'

function App() {
  const [goals, setGoals] = useState(() => loadGoals());

  useEffect(() => {
    saveGoals(goals);
  }, [goals]);

  const handleAddGoal = (newGoal) => {
    setGoals(prevGoals => [...prevGoals, newGoal]);
  };

  const handleCompleteGoal = (goalId) => {
    setGoals(prevGoals => prevGoals.map(goal => {
      if (goal.id !== goalId) return goal;

      const today = new Date().toDateString();
      const lastCompleted = goal.lastCompleted ? new Date(goal.lastCompleted).toDateString() : null;
      
      // Check if already completed today
      if (lastCompleted === today) return goal;

      // Check if completed yesterday for streak continuation
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toDateString();
      
      const newStreak = lastCompleted === yesterdayStr ? goal.streak + 1 : 1;
      
      return {
        ...goal,
        streak: newStreak,
        lastCompleted: new Date().toISOString(),
        completedDates: [...goal.completedDates, new Date().toISOString()]
      };
    }));
  };

  const handleDeleteGoal = (goalId) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      setGoals(prevGoals => prevGoals.filter(goal => goal.id !== goalId));
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎯 Goal Tracker</h1>
        <p>Track your daily progress and build consistency</p>
      </header>
      
      <main className="app-main">
        <GoalForm onAddGoal={handleAddGoal} />
        <GoalList 
          goals={goals} 
          onComplete={handleCompleteGoal}
          onDelete={handleDeleteGoal}
        />
      </main>
    </div>
  )
}

export default App
