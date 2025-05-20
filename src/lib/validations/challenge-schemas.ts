/**
 * Validation schemas for challenge-related data
 */

import { z } from 'zod';
import { stringRequired, numberRequired, uuidSchema, dateSchema, optionalDateSchema } from './index';

/**
 * Schema for validating challenge difficulty data
 */
export const difficultySchema = z.object({
  id: z.number().optional(),
  label: stringRequired,
  sortOrder: z.number().default(0),
});

export type DifficultyInput = z.infer<typeof difficultySchema>;

/**
 * Schema for validating challenge status data
 */
export const statusSchema = z.object({
  id: z.number().optional(),
  label: stringRequired,
  sortOrder: z.number().default(0),
});

export type StatusInput = z.infer<typeof statusSchema>;

/**
 * Schema for validating tag data
 */
export const tagSchema = z.object({
  id: z.number().optional(),
  name: stringRequired,
});

export type TagInput = z.infer<typeof tagSchema>;

/**
 * Schema for validating challenge data when creating or updating
 */
export const challengeSchema = z.object({
  id: z.string().optional(), // Optional for creation, required for updates
  title: stringRequired.max(100, { message: "Title must be 100 characters or less" }),
  description: stringRequired,
  difficultyId: z.number().optional(),
  statusId: z.number().optional(),
  teamSize: numberRequired.min(1, { message: "Team size must be at least 1" }),
  startDate: dateSchema,
  endDate: optionalDateSchema,
  tags: z.array(z.string()).default([]),
  estimatedTime: z.string().optional(),
  organizer: z.string().optional(),
  location: z.string().optional(),
});

export type ChallengeInput = z.infer<typeof challengeSchema>;

/**
 * Schema for validating challenge registration data
 */
export const challengeRegistrationSchema = z.object({
  challengeId: uuidSchema,
  userId: stringRequired,
});

export type ChallengeRegistrationInput = z.infer<typeof challengeRegistrationSchema>;

/**
 * Schema for validating challenge group data
 */
export const challengeGroupSchema = z.object({
  id: z.string().optional(),
  challengeId: uuidSchema,
});

export type ChallengeGroupInput = z.infer<typeof challengeGroupSchema>;

/**
 * Schema for validating challenge group member data
 */
export const challengeGroupMemberSchema = z.object({
  groupId: uuidSchema,
  userId: stringRequired,
});

export type ChallengeGroupMemberInput = z.infer<typeof challengeGroupMemberSchema>;

/**
 * Validation function for challenge data
 */
export function validateChallenge(data: unknown) {
  return challengeSchema.safeParse(data);
}

/**
 * Validation function for challenge registration data
 */
export function validateChallengeRegistration(data: unknown) {
  return challengeRegistrationSchema.safeParse(data);
}

/**
 * Validation function for challenge group data
 */
export function validateChallengeGroup(data: unknown) {
  return challengeGroupSchema.safeParse(data);
}

/**
 * Validation function for challenge group member data
 */
export function validateChallengeGroupMember(data: unknown) {
  return challengeGroupMemberSchema.safeParse(data);
}