import GoalItem from './GoalItem';
import './GoalList.css';

function GoalList({ goals, onComplete, onDelete }) {
  const categories = ['health', 'finance', 'relationships', 'bucketlist'];

  if (goals.length === 0) {
    return (
      <div className="empty-state">
        <p>No goals yet. Add your first goal to get started!</p>
      </div>
    );
  }

  const goalsByCategory = categories.reduce((acc, category) => {
    acc[category] = goals.filter(goal => goal.category === category);
    return acc;
  }, {});

  return (
    <div className="goal-list">
      {categories.map(category => {
        const categoryGoals = goalsByCategory[category];
        if (categoryGoals.length === 0) return null;

        return (
          <div key={category} className="category-section">
            <h2 className="category-title">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </h2>
            <div className="goals-grid">
              {categoryGoals.map(goal => (
                <GoalItem
                  key={goal.id}
                  goal={goal}
                  onComplete={onComplete}
                  onDelete={onDelete}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default GoalList;
