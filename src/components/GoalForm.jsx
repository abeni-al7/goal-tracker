import { useState } from 'react';
import './GoalForm.css';

const CATEGORIES = ['health', 'finance', 'relationships', 'bucketlist'];

function GoalForm({ onAddGoal }) {
  const [goalName, setGoalName] = useState('');
  const [category, setCategory] = useState('health');
  const [action, setAction] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!goalName.trim() || !action.trim()) {
      alert('Please fill in all fields');
      return;
    }

    const newGoal = {
      id: Date.now(),
      name: goalName.trim(),
      category,
      action: action.trim(),
      createdAt: new Date().toISOString(),
      streak: 0,
      lastCompleted: null,
      completedDates: []
    };

    onAddGoal(newGoal);
    setGoalName('');
    setAction('');
  };

  return (
    <form className="goal-form" onSubmit={handleSubmit}>
      <h2>Add New Goal</h2>
      
      <div className="form-group">
        <label htmlFor="goalName">Goal</label>
        <input
          type="text"
          id="goalName"
          value={goalName}
          onChange={(e) => setGoalName(e.target.value)}
          placeholder="Enter your goal..."
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="action">Daily Action</label>
        <input
          type="text"
          id="action"
          value={action}
          onChange={(e) => setAction(e.target.value)}
          placeholder="What will you do daily to achieve this goal?"
          required
        />
      </div>

      <button type="submit" className="btn-primary">Add Goal</button>
    </form>
  );
}

export default GoalForm;
