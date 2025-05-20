/**
 * Validation schemas for team-related data
 */

import { z } from 'zod';
import { stringRequired, uuidSchema } from './index';

/**
 * Schema for validating team data
 */
export const teamSchema = z.object({
  id: z.string().optional(), // Optional for creation, required for updates
  name: stringRequired.max(100, { message: "Team name must be 100 characters or less" }),
  description: z.string().max(500, { message: "Description must be 500 characters or less" }).optional(),
  avatarUrl: z.string().url({ message: "Invalid URL format" }).optional(),
  challengeId: uuidSchema.optional(), // If the team is associated with a challenge
  createdBy: stringRequired, // User ID of the team creator
});

export type TeamInput = z.infer<typeof teamSchema>;

/**
 * Schema for validating team member data
 */
export const teamMemberSchema = z.object({
  id: stringRequired, // User ID
  teamId: uuidSchema,
  role: z.enum(["owner", "admin", "member"]).default("member"),
  joinedAt: z.string().datetime().optional(),
});

export type TeamMemberInput = z.infer<typeof teamMemberSchema>;

/**
 * Schema for validating team invitation data
 */
export const teamInvitationSchema = z.object({
  teamId: uuidSchema,
  email: z.string().email({ message: "Invalid email address" }),
  role: z.enum(["admin", "member"]).default("member"),
  message: z.string().max(500, { message: "Message must be 500 characters or less" }).optional(),
  expiresAt: z.string().datetime().optional(),
});

export type TeamInvitationInput = z.infer<typeof teamInvitationSchema>;

/**
 * Schema for validating team join request data
 */
export const teamJoinRequestSchema = z.object({
  teamId: uuidSchema,
  userId: stringRequired,
  message: z.string().max(500, { message: "Message must be 500 characters or less" }).optional(),
});

export type TeamJoinRequestInput = z.infer<typeof teamJoinRequestSchema>;

/**
 * Schema for validating participant data
 */
export const participantSchema = z.object({
  id: stringRequired,
  name: stringRequired,
  avatarUrl: z.string().url({ message: "Invalid URL format" }).optional(),
  teamId: uuidSchema.optional(),
});

export type ParticipantInput = z.infer<typeof participantSchema>;

/**
 * Validation function for team data
 */
export function validateTeam(data: unknown) {
  return teamSchema.safeParse(data);
}

/**
 * Validation function for team member data
 */
export function validateTeamMember(data: unknown) {
  return teamMemberSchema.safeParse(data);
}

/**
 * Validation function for team invitation data
 */
export function validateTeamInvitation(data: unknown) {
  return teamInvitationSchema.safeParse(data);
}

/**
 * Validation function for team join request data
 */
export function validateTeamJoinRequest(data: unknown) {
  return teamJoinRequestSchema.safeParse(data);
}

/**
 * Validation function for participant data
 */
export function validateParticipant(data: unknown) {
  return participantSchema.safeParse(data);
}