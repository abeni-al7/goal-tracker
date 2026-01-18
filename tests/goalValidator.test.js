/**
 * Tests for goal validator
 * Each test validates a single function's responsibility
 */

const {
  isValidTitle,
  isValidDescription,
  isValidPriority,
  isValidStatus,
  isValidDueDate,
  validateGoal
} = require('../src/business/goalValidator');

describe('Goal Validator', () => {
  describe('isValidTitle', () => {
    test('returns true for valid title', () => {
      expect(isValidTitle('My Goal')).toBe(true);
    });
    
    test('returns false for empty string', () => {
      expect(isValidTitle('')).toBe(false);
    });
    
    test('returns false for whitespace only', () => {
      expect(isValidTitle('   ')).toBe(false);
    });
    
    test('returns false for title over 100 characters', () => {
      expect(isValidTitle('a'.repeat(101))).toBe(false);
    });
    
    test('returns false for non-string', () => {
      expect(isValidTitle(123)).toBe(false);
    });
  });
  
  describe('isValidDescription', () => {
    test('returns true for valid description', () => {
      expect(isValidDescription('This is a description')).toBe(true);
    });
    
    test('returns true for empty string (optional)', () => {
      expect(isValidDescription('')).toBe(true);
    });
    
    test('returns true for null (optional)', () => {
      expect(isValidDescription(null)).toBe(true);
    });
    
    test('returns false for description over 500 characters', () => {
      expect(isValidDescription('a'.repeat(501))).toBe(false);
    });
  });
  
  describe('isValidPriority', () => {
    test('returns true for low priority', () => {
      expect(isValidPriority('low')).toBe(true);
    });
    
    test('returns true for medium priority', () => {
      expect(isValidPriority('medium')).toBe(true);
    });
    
    test('returns true for high priority', () => {
      expect(isValidPriority('high')).toBe(true);
    });
    
    test('returns false for invalid priority', () => {
      expect(isValidPriority('urgent')).toBe(false);
    });
  });
  
  describe('isValidStatus', () => {
    test('returns true for not-started status', () => {
      expect(isValidStatus('not-started')).toBe(true);
    });
    
    test('returns true for in-progress status', () => {
      expect(isValidStatus('in-progress')).toBe(true);
    });
    
    test('returns true for completed status', () => {
      expect(isValidStatus('completed')).toBe(true);
    });
    
    test('returns false for invalid status', () => {
      expect(isValidStatus('pending')).toBe(false);
    });
  });
  
  describe('isValidDueDate', () => {
    test('returns true for null (optional)', () => {
      expect(isValidDueDate(null)).toBe(true);
    });
    
    test('returns true for valid date string', () => {
      expect(isValidDueDate('2024-12-31')).toBe(true);
    });
    
    test('returns true for Date object', () => {
      expect(isValidDueDate(new Date())).toBe(true);
    });
    
    test('returns false for invalid date', () => {
      expect(isValidDueDate('not-a-date')).toBe(false);
    });
  });
  
  describe('validateGoal', () => {
    test('returns valid for complete goal', () => {
      const goal = {
        title: 'Test Goal',
        description: 'Description',
        priority: 'high',
        status: 'not-started',
        dueDate: '2024-12-31'
      };
      
      const result = validateGoal(goal);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
    
    test('returns invalid with errors for incomplete goal', () => {
      const goal = {
        title: '',
        description: '',
        priority: 'invalid',
        status: 'invalid',
        dueDate: null
      };
      
      const result = validateGoal(goal);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
    
    test('includes specific error messages', () => {
      const goal = {
        title: '',
        description: '',
        priority: 'low',
        status: 'not-started',
        dueDate: null
      };
      
      const result = validateGoal(goal);
      expect(result.errors).toContain('Title must be a non-empty string with maximum 100 characters');
    });
  });
});
