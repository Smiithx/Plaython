import { registerForChallenge, checkRegistrationStatus, unregisterFromChallenge, getCurrentUserId } from '@/lib/actions/challenge-registration';
import { auth } from '@clerk/nextjs/server';

// Mock the auth module
jest.mock('@clerk/nextjs/server', () => ({
  auth: jest.fn(),
}));

// Mock the supabase client
jest.mock('../src/lib/supabaseClient', () => {
  const mockSupabase = {
    from: jest.fn(() => mockSupabase),
    select: jest.fn(() => mockSupabase),
    insert: jest.fn(() => mockSupabase),
    update: jest.fn(() => mockSupabase),
    delete: jest.fn(() => mockSupabase),
    eq: jest.fn(() => mockSupabase),
    is: jest.fn(() => mockSupabase),
    order: jest.fn(() => mockSupabase),
    single: jest.fn(() => mockSupabase),
  };

  return {
    supabase: mockSupabase,
  };
});

describe('Challenge Registration Actions', () => {
  const mockUserId = 'user_123';
  const mockChallengeId = 'challenge_456';

  beforeEach(() => {
    // Reset all mocks before each test
    jest.resetAllMocks();

    // Mock auth to return a user ID
    jest.mocked(auth).mockReturnValue({ userId: mockUserId } as any);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('registerForChallenge', () => {
    it('should return an error if user is not authenticated', async () => {
      // Mock auth to return no user
      jest.mocked(auth).mockReturnValue({ userId: null } as any);

      const result = await registerForChallenge(mockChallengeId);

      expect(result.success).toBe(false);
      expect(result.message).toContain('must be signed in');
    });

    it('should check if user is already registered', async () => {
      const mockSupabase = jest.mocked(require('../src/lib/supabaseClient').supabase);
      mockSupabase.from.mockReturnThis();
      mockSupabase.select.mockReturnThis();
      mockSupabase.eq.mockReturnThis();
      mockSupabase.single.mockResolvedValue({ data: null, error: { code: 'PGRST116' } });

      await registerForChallenge(mockChallengeId);

      expect(mockSupabase.from).toHaveBeenCalledWith('challenge_registrations');
      expect(mockSupabase.select).toHaveBeenCalledWith('*');
      expect(mockSupabase.eq).toHaveBeenCalledWith('user_id', mockUserId);
      expect(mockSupabase.eq).toHaveBeenCalledWith('challenge_id', mockChallengeId);
    });

    it('should return early if user is already registered', async () => {
      const mockSupabase = jest.mocked(require('../src/lib/supabaseClient').supabase);
      mockSupabase.from.mockReturnThis();
      mockSupabase.select.mockReturnThis();
      mockSupabase.eq.mockReturnThis();
      mockSupabase.single.mockResolvedValue({ 
        data: { id: 'reg_123', user_id: mockUserId, challenge_id: mockChallengeId },
        error: null 
      });

      const result = await registerForChallenge(mockChallengeId);

      expect(result.success).toBe(true);
      expect(result.message).toContain('already registered');
      expect(result.isRegistered).toBe(true);
    });

    it('should get the challenge team size', async () => {
      const mockSupabase = jest.mocked(require('../src/lib/supabaseClient').supabase);

      // Mock the first query (check if registered) to return no data
      mockSupabase.from.mockReturnValueOnce({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: null, error: { code: 'PGRST116' } })
      });

      // Mock the second query (get challenge) to return team size
      mockSupabase.from.mockReturnValueOnce({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ 
          data: { team_size: 3 },
          error: null 
        })
      });

      // Mock the third query (insert registration)
      mockSupabase.from.mockReturnValueOnce({
        insert: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ 
          data: { id: 'reg_123' },
          error: null 
        })
      });

      await registerForChallenge(mockChallengeId);

      expect(mockSupabase.from).toHaveBeenCalledWith('challenges');
      expect(mockSupabase.select).toHaveBeenCalledWith('team_size');
      expect(mockSupabase.eq).toHaveBeenCalledWith('id', mockChallengeId);
    });
  });

  describe('checkRegistrationStatus', () => {
    it('should return not registered if user is not authenticated', async () => {
      // Mock auth to return no user
      jest.mocked(auth).mockReturnValue({ userId: null } as any);

      const result = await checkRegistrationStatus(mockChallengeId);

      expect(result.isRegistered).toBe(false);
    });

    it('should check if user is registered for the challenge', async () => {
      const mockSupabase = jest.mocked(require('../src/lib/supabaseClient').supabase);
      mockSupabase.from.mockReturnThis();
      mockSupabase.select.mockReturnThis();
      mockSupabase.eq.mockReturnThis();
      mockSupabase.single.mockResolvedValue({ 
        data: { id: 'reg_123', user_id: mockUserId, challenge_id: mockChallengeId, group_id: 'group_789' },
        error: null 
      });

      const result = await checkRegistrationStatus(mockChallengeId);

      expect(mockSupabase.from).toHaveBeenCalledWith('challenge_registrations');
      expect(mockSupabase.select).toHaveBeenCalledWith('*');
      expect(mockSupabase.eq).toHaveBeenCalledWith('user_id', mockUserId);
      expect(mockSupabase.eq).toHaveBeenCalledWith('challenge_id', mockChallengeId);

      expect(result.isRegistered).toBe(true);
      expect(result.groupId).toBe('group_789');
    });
  });

  describe('unregisterFromChallenge', () => {
    it('should return an error if user is not authenticated', async () => {
      // Mock auth to return no user
      jest.mocked(auth).mockReturnValue({ userId: null } as any);

      const result = await unregisterFromChallenge(mockChallengeId);

      expect(result.success).toBe(false);
      expect(result.message).toContain('must be signed in');
    });

    it('should delete the registration', async () => {
      const mockSupabase = jest.mocked(require('../src/lib/supabaseClient').supabase);
      mockSupabase.from.mockReturnThis();
      mockSupabase.delete.mockReturnThis();
      mockSupabase.eq.mockReturnThis();
      mockSupabase.eq.mockResolvedValue({ error: null });

      const result = await unregisterFromChallenge(mockChallengeId);

      expect(mockSupabase.from).toHaveBeenCalledWith('challenge_registrations');
      expect(mockSupabase.delete).toHaveBeenCalled();
      expect(mockSupabase.eq).toHaveBeenCalledWith('user_id', mockUserId);
      expect(mockSupabase.eq).toHaveBeenCalledWith('challenge_id', mockChallengeId);

      expect(result.success).toBe(true);
      expect(result.message).toContain('Successfully unregistered');
      expect(result.isRegistered).toBe(false);
    });
  });

  describe('getCurrentUserId', () => {
    it('should return the user ID when authenticated', () => {
      // Mock auth to return a user ID
      jest.mocked(auth).mockReturnValue({ userId: mockUserId } as any);

      const result = getCurrentUserId();

      expect(result).toBe(mockUserId);
    });

    it('should return null when not authenticated', () => {
      // Mock auth to return no user
      jest.mocked(auth).mockReturnValue({ userId: null } as any);

      const result = getCurrentUserId();

      expect(result).toBeNull();
    });
  });
});
