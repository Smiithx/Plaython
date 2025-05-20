"use client";

import { useState, Suspense } from 'react';
import { useAllChallenges, useChallenge } from '@/lib/hooks/useChallenges';
import { Challenge } from '@/types';

/**
 * Loading spinner component for Suspense fallbacks
 */
function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-32">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}

/**
 * Error display component
 */
function ErrorDisplay({ message }: { message: string }) {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      <p className="font-bold">Error</p>
      <p>{message}</p>
    </div>
  );
}

/**
 * Challenge list component that fetches and displays all challenges
 */
function ChallengeList({ 
  onSelectChallenge, 
  selectedChallengeId 
}: { 
  onSelectChallenge: (id: string) => void;
  selectedChallengeId?: string;
}) {
  const { 
    data: challenges, 
    isLoading, 
    error,
    execute: refetchChallenges
  } = useAllChallenges(true);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay message={error.message} />;
  }

  if (!challenges || challenges.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded">
        <p className="text-gray-500">No challenges found</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">All Challenges</h2>
        <button 
          onClick={() => refetchChallenges()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {challenges.map((challenge) => (
          <div 
            key={challenge.id}
            className={`p-4 border rounded cursor-pointer transition ${
              selectedChallengeId === challenge.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
            }`}
            onClick={() => onSelectChallenge(challenge.id)}
          >
            <h3 className="font-semibold">{challenge.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{challenge.difficulty}</p>
          </div>
        ))}
      </div>
    </>
  );
}

/**
 * Challenge detail component that fetches and displays a single challenge
 */
function ChallengeDetail({ challengeId }: { challengeId: string }) {
  const {
    data: challenge,
    isLoading,
    error
  } = useChallenge(challengeId, true);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay message={error.message} />;
  }

  if (!challenge) {
    return <div>Challenge not found</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-bold mb-2">{challenge.title}</h3>
      <div className="flex gap-2 mb-4">
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">{challenge.difficulty}</span>
        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">{challenge.status}</span>
      </div>
      <p className="mb-4">{challenge.description}</p>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Team Size</p>
          <p className="font-medium">{challenge.teamSize}</p>
        </div>
        <div>
          <p className="text-gray-500">Start Date</p>
          <p className="font-medium">{new Date(challenge.startDate).toLocaleDateString()}</p>
        </div>
        {challenge.endDate && (
          <div>
            <p className="text-gray-500">End Date</p>
            <p className="font-medium">{new Date(challenge.endDate).toLocaleDateString()}</p>
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-gray-500 mb-1">Tags</p>
        <div className="flex flex-wrap gap-2">
          {challenge.tags.map((tag) => (
            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Main example component that demonstrates how to use the challenge hooks
 * with proper Suspense boundaries for async operations.
 */
export function ChallengeExample() {
  const [selectedChallengeId, setSelectedChallengeId] = useState<string | undefined>();

  const handleChallengeSelect = (id: string) => {
    setSelectedChallengeId(id);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Challenge Example</h1>

      {/* Challenges List Section */}
      <div className="mb-8">
        <Suspense fallback={<LoadingSpinner />}>
          <ChallengeList 
            onSelectChallenge={handleChallengeSelect} 
            selectedChallengeId={selectedChallengeId} 
          />
        </Suspense>
      </div>

      {/* Selected Challenge Section */}
      {selectedChallengeId && (
        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">Selected Challenge</h2>
          <Suspense fallback={<LoadingSpinner />}>
            <ChallengeDetail challengeId={selectedChallengeId} />
          </Suspense>
        </div>
      )}
    </div>
  );
}
