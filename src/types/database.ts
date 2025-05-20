/**
 * This file contains TypeScript interfaces for all database models in the Plaython project.
 * These interfaces represent the raw data as it exists in the database, using snake_case naming.
 * For application use, these models are typically transformed to camelCase interfaces in src/types.ts.
 */

/**
 * Challenge difficulty levels
 * Table: challenge_difficulties
 */
export interface DbChallengeDifficulty {
  id: number;
  label: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

/**
 * Challenge status options
 * Table: challenge_statuses
 */
export interface DbChallengeStatus {
  id: number;
  label: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

/**
 * Tags for challenges
 * Table: tags
 */
export interface DbTag {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

/**
 * Challenge information
 * Table: challenges
 */
export interface DbChallenge {
  id: string; // UUID
  title: string;
  description: string;
  difficulty_id?: number;
  status_id?: number;
  team_size: number;
  start_date: string;
  end_date?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Association between challenges and tags
 * Table: challenge_tags
 */
export interface DbChallengeTag {
  challenge_id: string; // UUID
  tag_id: number;
  created_at: string;
  updated_at: string;
}

/**
 * Groups for challenges
 * Table: challenge_groups
 */
export interface DbChallengeGroup {
  id: string; // UUID
  challenge_id: string; // UUID
  created_at: string;
  updated_at: string;
}

/**
 * User registrations for challenges
 * Table: challenge_registrations
 */
export interface DbChallengeRegistration {
  id: string; // UUID
  user_id: string;
  challenge_id: string; // UUID
  group_id?: string; // UUID, nullable
  joined_at: string;
  status: string;
  created_at: string;
  updated_at: string;
}

/**
 * Association between users and their challenge groups
 * Table: challenge_group_members
 */
export interface DbChallengeGroupMember {
  group_id: string; // UUID
  user_id: string;
  joined_at: string;
  created_at: string;
  updated_at: string;
}

/**
 * Raw challenge data with joined relations
 * This represents the data structure returned by Supabase when selecting a challenge
 * with its related difficulty, status, and tags.
 */
export interface DbChallengeWithRelations extends DbChallenge {
  difficulty?: { label: string };
  status?: { label: string };
  challenge_tags?: Array<{ tags: { name: string } }>;
}