/**
 * Tests for goal sorters
 * Each test validates a single sort function
 */

const {
  sortByDueDate,
  sortByPriority,
  sortByCreatedDate,
  sortByTitle
} = require('../src/business/goalSorters');

describe('Goal Sorters', () => {
  describe('sortByDueDate', () => {
    test('sorts goals by due date ascending', () => {
      const goals = [
        { id: '1', title: 'Goal 1', dueDate: '2024-12-31' },
        { id: '2', title: 'Goal 2', dueDate: '2024-01-01' },
        { id: '3', title: 'Goal 3', dueDate: '2024-06-15' }
      ];
      
      const result = sortByDueDate(goals);
      expect(result[0].id).toBe('2');
      expect(result[1].id).toBe('3');
      expect(result[2].id).toBe('1');
    });
    
    test('handles null due dates', () => {
      const goals = [
        { id: '1', title: 'Goal 1', dueDate: '2024-12-31' },
        { id: '2', title: 'Goal 2', dueDate: null },
        { id: '3', title: 'Goal 3', dueDate: '2024-01-01' }
      ];
      
      const result = sortByDueDate(goals);
      expect(result[0].id).toBe('3');
      expect(result[1].id).toBe('1');
      expect(result[2].id).toBe('2'); // null dates last
    });
    
    test('does not modify original array', () => {
      const goals = [
        { id: '1', dueDate: '2024-12-31' },
        { id: '2', dueDate: '2024-01-01' }
      ];
      
      const result = sortByDueDate(goals);
      expect(goals[0].id).toBe('1'); // Original unchanged
      expect(result[0].id).toBe('2'); // Result sorted
    });
  });
  
  describe('sortByPriority', () => {
    test('sorts goals by priority (high to low)', () => {
      const goals = [
        { id: '1', priority: 'low' },
        { id: '2', priority: 'high' },
        { id: '3', priority: 'medium' }
      ];
      
      const result = sortByPriority(goals);
      expect(result[0].priority).toBe('high');
      expect(result[1].priority).toBe('medium');
      expect(result[2].priority).toBe('low');
    });
    
    test('does not modify original array', () => {
      const goals = [
        { id: '1', priority: 'low' },
        { id: '2', priority: 'high' }
      ];
      
      const result = sortByPriority(goals);
      expect(goals[0].priority).toBe('low');
      expect(result[0].priority).toBe('high');
    });
  });
  
  describe('sortByCreatedDate', () => {
    test('sorts goals by created date (newest first)', () => {
      const goals = [
        { id: '1', createdAt: '2024-01-01T00:00:00Z' },
        { id: '2', createdAt: '2024-12-31T00:00:00Z' },
        { id: '3', createdAt: '2024-06-15T00:00:00Z' }
      ];
      
      const result = sortByCreatedDate(goals);
      expect(result[0].id).toBe('2'); // Newest first
      expect(result[1].id).toBe('3');
      expect(result[2].id).toBe('1');
    });
  });
  
  describe('sortByTitle', () => {
    test('sorts goals alphabetically by title', () => {
      const goals = [
        { id: '1', title: 'Zebra' },
        { id: '2', title: 'Apple' },
        { id: '3', title: 'Mango' }
      ];
      
      const result = sortByTitle(goals);
      expect(result[0].title).toBe('Apple');
      expect(result[1].title).toBe('Mango');
      expect(result[2].title).toBe('Zebra');
    });
    
    test('handles case-insensitive sorting', () => {
      const goals = [
        { id: '1', title: 'zebra' },
        { id: '2', title: 'Apple' }
      ];
      
      const result = sortByTitle(goals);
      expect(result[0].title).toBe('Apple');
    });
  });
});
