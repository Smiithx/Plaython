/**
 * This file contains TypeScript interfaces for all application models in the Plaython project.
 * These interfaces represent the data as it is used in the application, using camelCase naming.
 * For database models, see src/types/database.ts.
 */

/**
 * Challenge difficulty levels
 */
export interface Difficulty {
  id: number;
  label: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Challenge status options
 */
export interface Status {
  id: number;
  label: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Tags for challenges
 */
export interface Tag {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Challenge information
 */
export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficultyId?: number;
  difficulty?: string;
  statusId?: number;
  status?: string;
  teamSize: number;
  startDate: string;
  endDate?: string;
  tags: string[];
  estimatedTime?: string; // Not in database, but used in application
  organizer?: string; // Not in database, but used in application
  location?: string; // Not in database, but used in application
  createdAt: string;
  updatedAt: string;
}

/**
 * Association between challenges and tags
 */
export interface ChallengeTag {
  challengeId: string;
  tagId: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Groups for challenges
 */
export interface ChallengeGroup {
  id: string;
  challengeId: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * User registrations for challenges
 */
export interface ChallengeRegistration {
  id: string;
  userId: string;
  challengeId: string;
  groupId?: string;
  joinedAt: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Association between users and their challenge groups
 */
export interface ChallengeGroupMember {
  groupId: string;
  userId: string;
  joinedAt: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Team information
 */
export interface Team {
  id: string;
  name: string;
  members: TeamMember[];
}

/**
 * Team member information
 */
export interface TeamMember {
  id: string;
  name: string;
  role?: string;
  avatarUrl?: string;
}

/**
 * Participant information
 */
export interface Participant {
  id: string;
  name: string;
  avatarUrl?: string;
  teamId?: string;
}

/**
 * Discussion message
 */
export interface Discussion {
  id: string;
  user_id: string;
  userName?: string;
  userAvatarUrl?: string;
  message: string;
  timestamp: string;
  likes: number;
  isLiked?: boolean;
}
/**
 * Schedule item
 */
export interface ScheduleItem {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime?: string;
  location?: string;
}

/**
 * Props for challenge page
 */
export interface ChallengePageProps {
  params: Promise<{ id: string }>;
}

/**
 * API response for challenge registration
 */
export interface RegistrationResponse {
  success: boolean;
  message: string;
  isRegistered?: boolean;
}

/**
 * API response for checking registration status
 */
export interface RegistrationStatusResponse {
  isRegistered: boolean;
}

// Re-export database types for convenience
export * from "./database";
