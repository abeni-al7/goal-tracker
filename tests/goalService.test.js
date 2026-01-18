/**
 * Tests for goal service
 * Tests the coordination between validation, factory, and repository
 */

const goalService = require('../src/business/goalService');
const goalRepository = require('../src/business/goalRepository');

describe('Goal Service', () => {
  beforeEach(() => {
    // Clear repository before each test
    goalRepository.clearAllGoals();
  });
  
  describe('addGoal', () => {
    test('creates a valid goal', () => {
      const goalData = {
        title: 'Test Goal',
        description: 'Test description',
        priority: 'high',
        status: 'not-started',
        dueDate: '2024-12-31'
      };
      
      const result = goalService.addGoal(goalData);
      
      expect(result.success).toBe(true);
      expect(result.goal).toBeDefined();
      expect(result.goal.title).toBe('Test Goal');
      expect(result.goal.id).toBeDefined();
    });
    
    test('rejects invalid goal', () => {
      const goalData = {
        title: '',
        priority: 'high',
        status: 'not-started'
      };
      
      const result = goalService.addGoal(goalData);
      
      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });
  
  describe('listGoals', () => {
    test('returns empty array when no goals', () => {
      const goals = goalService.listGoals();
      expect(goals).toEqual([]);
    });
    
    test('returns all goals', () => {
      goalService.addGoal({ title: 'Goal 1', priority: 'low', status: 'not-started' });
      goalService.addGoal({ title: 'Goal 2', priority: 'high', status: 'not-started' });
      
      const goals = goalService.listGoals();
      expect(goals).toHaveLength(2);
    });
  });
  
  describe('getGoal', () => {
    test('retrieves a goal by ID', () => {
      const result = goalService.addGoal({ 
        title: 'Test Goal', 
        priority: 'medium', 
        status: 'not-started' 
      });
      
      const goal = goalService.getGoal(result.goal.id);
      expect(goal).toBeDefined();
      expect(goal.title).toBe('Test Goal');
    });
    
    test('returns null for non-existent ID', () => {
      const goal = goalService.getGoal('non-existent-id');
      expect(goal).toBeNull();
    });
  });
  
  describe('modifyGoal', () => {
    test('updates a goal', () => {
      const result = goalService.addGoal({ 
        title: 'Original Title', 
        priority: 'low', 
        status: 'not-started' 
      });
      
      const updateResult = goalService.modifyGoal(result.goal.id, { 
        title: 'Updated Title' 
      });
      
      expect(updateResult.success).toBe(true);
      expect(updateResult.goal.title).toBe('Updated Title');
      expect(updateResult.goal.id).toBe(result.goal.id);
    });
    
    test('rejects invalid updates', () => {
      const result = goalService.addGoal({ 
        title: 'Test Goal', 
        priority: 'medium', 
        status: 'not-started' 
      });
      
      const updateResult = goalService.modifyGoal(result.goal.id, { 
        title: '' 
      });
      
      expect(updateResult.success).toBe(false);
      expect(updateResult.errors).toBeDefined();
    });
    
    test('returns error for non-existent goal', () => {
      const result = goalService.modifyGoal('non-existent-id', { 
        title: 'Updated' 
      });
      
      expect(result.success).toBe(false);
      expect(result.errors).toContain('Goal not found');
    });
  });
  
  describe('removeGoal', () => {
    test('deletes a goal', () => {
      const result = goalService.addGoal({ 
        title: 'Test Goal', 
        priority: 'high', 
        status: 'not-started' 
      });
      
      const deleteResult = goalService.removeGoal(result.goal.id);
      
      expect(deleteResult.success).toBe(true);
      expect(goalService.getGoal(result.goal.id)).toBeNull();
    });
    
    test('returns error for non-existent goal', () => {
      const result = goalService.removeGoal('non-existent-id');
      
      expect(result.success).toBe(false);
      expect(result.errors).toContain('Goal not found');
    });
  });
});
