const STORAGE_KEY = 'goal-tracker-data';

export const loadGoals = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading goals:', error);
    return [];
  }
};

export const saveGoals = (goals) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
  } catch (error) {
    console.error('Error saving goals:', error);
  }
};
