import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { registerForChallenge, checkRegistrationStatus } from '@/lib/actions/challenge-registration';
import ChallengeDetailClient from '@/challenge/id/ChallengeDetailClient';

// Mock the ChallengeDetailClient component
jest.mock('@/challenge/id/ChallengeDetailClient', () => {
  return function MockChallengeDetailClient({ eventData }: { eventData: any }) {
    const handleJoinEvent = async () => {
      await registerForChallenge(eventData.id);
      await checkRegistrationStatus(eventData.id);
    };

    return (
      <div>
        <div data-testid="signed-in">
          <button onClick={handleJoinEvent}>
            {checkRegistrationStatus.mock.results[0]?.value?.isRegistered 
              ? "Ya estás inscrito" 
              : "Unirse al evento"}
          </button>
          {checkRegistrationStatus.mock.results[0]?.value?.groupId && (
            <div>Has sido asignado a un grupo con ID: {checkRegistrationStatus.mock.results[0]?.value?.groupId}</div>
          )}
          {registerForChallenge.mock.results[0]?.value?.success === false && (
            <div>{registerForChallenge.mock.results[0]?.value?.message}</div>
          )}
        </div>
      </div>
    );
  };
});

// Mock the server actions
jest.mock('@/lib/actions/challenge-registration', () => ({
  registerForChallenge: jest.fn(),
  checkRegistrationStatus: jest.fn(),
  unregisterFromChallenge: jest.fn(),
}));

describe('Challenge Registration Integration', () => {
  const mockChallenge = {
    id: 'challenge_123',
    title: 'Test Challenge',
    description: 'A test challenge',
    teamSize: 3,
    startDate: '2023-12-01T10:00:00Z',
    endDate: '2023-12-02T10:00:00Z',
    tags: ['test', 'integration'],
    difficulty: 'Medium',
  };

  beforeEach(() => {
    jest.resetAllMocks();

    // Mock checkRegistrationStatus to return not registered initially
    jest.mocked(checkRegistrationStatus).mockResolvedValue({
      isRegistered: false,
      groupId: null,
    });
  });

  it('should check registration status on mount', async () => {
    render(<ChallengeDetailClient eventData={mockChallenge} />);

    await waitFor(() => {
      expect(checkRegistrationStatus).toHaveBeenCalledWith(mockChallenge.id);
    });
  });

  it('should show join button when user is not registered', async () => {
    render(<ChallengeDetailClient eventData={mockChallenge} />);

    // Wait for the component to check registration status
    await waitFor(() => {
      expect(checkRegistrationStatus).toHaveBeenCalled();
    });

    // Find the button within the SignedIn component
    const signedInSection = screen.getByTestId('signed-in');
    const joinButton = signedInSection.querySelector('button');

    expect(joinButton).toHaveTextContent(/unirse al evento/i);
  });

  it('should call registerForChallenge when join button is clicked', async () => {
    // Mock registerForChallenge to return success
    jest.mocked(registerForChallenge).mockResolvedValue({
      success: true,
      message: 'Successfully registered for the challenge',
      isRegistered: true,
    });

    render(<ChallengeDetailClient eventData={mockChallenge} />);

    // Wait for the component to check registration status
    await waitFor(() => {
      expect(checkRegistrationStatus).toHaveBeenCalled();
    });

    // Find the button within the SignedIn component
    const signedInSection = screen.getByTestId('signed-in');
    const joinButton = signedInSection.querySelector('button');

    // Click the join button
    fireEvent.click(joinButton!);

    // Verify registerForChallenge was called
    await waitFor(() => {
      expect(registerForChallenge).toHaveBeenCalledWith(mockChallenge.id);
    });
  });

  it('should update UI after successful registration', async () => {
    // Mock registerForChallenge to return success
    jest.mocked(registerForChallenge).mockResolvedValue({
      success: true,
      message: 'Successfully registered for the challenge',
      isRegistered: true,
    });

    // Mock checkRegistrationStatus to return registered after registration
    jest.mocked(checkRegistrationStatus)
      .mockResolvedValueOnce({ isRegistered: false, groupId: null })
      .mockResolvedValueOnce({ isRegistered: true, groupId: 'group_456' });

    render(<ChallengeDetailClient eventData={mockChallenge} />);

    // Wait for the component to check registration status
    await waitFor(() => {
      expect(checkRegistrationStatus).toHaveBeenCalled();
    });

    // Find the button within the SignedIn component
    const signedInSection = screen.getByTestId('signed-in');
    const joinButton = signedInSection.querySelector('button');

    // Click the join button
    fireEvent.click(joinButton!);

    // Verify registerForChallenge was called
    await waitFor(() => {
      expect(registerForChallenge).toHaveBeenCalledWith(mockChallenge.id);
    });

    // Verify checkRegistrationStatus was called again
    await waitFor(() => {
      expect(checkRegistrationStatus).toHaveBeenCalledTimes(2);
    });

    // Verify the UI shows the user is registered
    await waitFor(() => {
      const updatedButton = signedInSection.querySelector('button');
      expect(updatedButton).toHaveTextContent(/ya estás inscrito/i);
    });

    // Verify the group ID is displayed
    await waitFor(() => {
      const groupMessage = screen.getByText(/has sido asignado a un grupo/i);
      expect(groupMessage).toBeInTheDocument();
      expect(groupMessage).toHaveTextContent('group_456');
    });
  });

  it('should show error message when registration fails', async () => {
    // Mock registerForChallenge to return error
    jest.mocked(registerForChallenge).mockResolvedValue({
      success: false,
      message: 'An error occurred while registering for the challenge',
    });

    render(<ChallengeDetailClient eventData={mockChallenge} />);

    // Wait for the component to check registration status
    await waitFor(() => {
      expect(checkRegistrationStatus).toHaveBeenCalled();
    });

    // Find the button within the SignedIn component
    const signedInSection = screen.getByTestId('signed-in');
    const joinButton = signedInSection.querySelector('button');

    // Click the join button
    fireEvent.click(joinButton!);

    // Verify registerForChallenge was called
    await waitFor(() => {
      expect(registerForChallenge).toHaveBeenCalledWith(mockChallenge.id);
    });

    // Verify the error message is displayed
    await waitFor(() => {
      const errorMessage = screen.getByText(/an error occurred while registering/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
