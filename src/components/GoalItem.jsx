import './GoalItem.css';

function GoalItem({ goal, onComplete, onDelete }) {
  const getCategoryIcon = (category) => {
    const icons = {
      health: '💪',
      finance: '💰',
      relationships: '❤️',
      bucketlist: '🌟'
    };
    return icons[category] || '📌';
  };

  const handleComplete = () => {
    onComplete(goal.id);
  };

  const isCompletedToday = () => {
    if (!goal.lastCompleted) return false;
    const today = new Date().toDateString();
    const lastCompletedDate = new Date(goal.lastCompleted).toDateString();
    return today === lastCompletedDate;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className={`goal-item ${isCompletedToday() ? 'completed-today' : ''}`}>
      <div className="goal-header">
        <div className="goal-title">
          <span className="category-icon">{getCategoryIcon(goal.category)}</span>
          <h3>{goal.name}</h3>
        </div>
        <button 
          className="btn-delete" 
          onClick={() => onDelete(goal.id)}
          aria-label="Delete goal"
        >
          ✕
        </button>
      </div>
      
      <div className="goal-details">
        <span className="category-badge">{goal.category}</span>
        <p className="goal-action"><strong>Daily Action:</strong> {goal.action}</p>
      </div>

      <div className="goal-streak">
        <div className="streak-info">
          <span className="streak-number">🔥 {goal.streak}</span>
          <span className="streak-label">day streak</span>
        </div>
        <div className="last-completed">
          Last completed: {formatDate(goal.lastCompleted)}
        </div>
      </div>

      <button 
        className={`btn-complete ${isCompletedToday() ? 'completed' : ''}`}
        onClick={handleComplete}
        disabled={isCompletedToday()}
      >
        {isCompletedToday() ? '✓ Completed Today' : 'Complete Today'}
      </button>
    </div>
  );
}

export default GoalItem;
