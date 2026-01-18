/**
 * Tests for goal filters
 * Each test validates a single filter function
 */

const {
  filterByStatus,
  filterByPriority,
  filterOverdue,
  searchGoals
} = require('../src/business/goalFilters');

describe('Goal Filters', () => {
  const sampleGoals = [
    {
      id: '1',
      title: 'Complete project',
      description: 'Finish the main project',
      priority: 'high',
      status: 'in-progress',
      dueDate: '2024-12-31'
    },
    {
      id: '2',
      title: 'Learn JavaScript',
      description: 'Study advanced concepts',
      priority: 'medium',
      status: 'not-started',
      dueDate: '2024-11-30'
    },
    {
      id: '3',
      title: 'Exercise',
      description: 'Daily workout routine',
      priority: 'low',
      status: 'completed',
      dueDate: null
    }
  ];
  
  describe('filterByStatus', () => {
    test('filters goals by in-progress status', () => {
      const result = filterByStatus(sampleGoals, 'in-progress');
      expect(result).toHaveLength(1);
      expect(result[0].status).toBe('in-progress');
    });
    
    test('filters goals by completed status', () => {
      const result = filterByStatus(sampleGoals, 'completed');
      expect(result).toHaveLength(1);
      expect(result[0].status).toBe('completed');
    });
    
    test('returns empty array when no matches', () => {
      const result = filterByStatus([], 'completed');
      expect(result).toHaveLength(0);
    });
  });
  
  describe('filterByPriority', () => {
    test('filters goals by high priority', () => {
      const result = filterByPriority(sampleGoals, 'high');
      expect(result).toHaveLength(1);
      expect(result[0].priority).toBe('high');
    });
    
    test('filters goals by medium priority', () => {
      const result = filterByPriority(sampleGoals, 'medium');
      expect(result).toHaveLength(1);
      expect(result[0].priority).toBe('medium');
    });
    
    test('returns empty array when no matches', () => {
      const result = filterByPriority([], 'high');
      expect(result).toHaveLength(0);
    });
  });
  
  describe('filterOverdue', () => {
    test('identifies overdue goals', () => {
      const overdueGoals = [
        {
          id: '1',
          title: 'Overdue task',
          status: 'not-started',
          dueDate: '2020-01-01'
        },
        {
          id: '2',
          title: 'Future task',
          status: 'not-started',
          dueDate: '2030-01-01'
        }
      ];
      
      const result = filterOverdue(overdueGoals);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('1');
    });
    
    test('excludes completed goals from overdue', () => {
      const goals = [
        {
          id: '1',
          title: 'Completed overdue task',
          status: 'completed',
          dueDate: '2020-01-01'
        }
      ];
      
      const result = filterOverdue(goals);
      expect(result).toHaveLength(0);
    });
    
    test('excludes goals without due date', () => {
      const goals = [
        {
          id: '1',
          title: 'No due date',
          status: 'not-started',
          dueDate: null
        }
      ];
      
      const result = filterOverdue(goals);
      expect(result).toHaveLength(0);
    });
  });
  
  describe('searchGoals', () => {
    test('searches goals by title', () => {
      const result = searchGoals(sampleGoals, 'JavaScript');
      expect(result).toHaveLength(1);
      expect(result[0].title).toContain('JavaScript');
    });
    
    test('searches goals by description', () => {
      const result = searchGoals(sampleGoals, 'workout');
      expect(result).toHaveLength(1);
      expect(result[0].description).toContain('workout');
    });
    
    test('is case insensitive', () => {
      const result = searchGoals(sampleGoals, 'JAVASCRIPT');
      expect(result).toHaveLength(1);
    });
    
    test('returns empty array when no matches', () => {
      const result = searchGoals(sampleGoals, 'nonexistent');
      expect(result).toHaveLength(0);
    });
  });
});
