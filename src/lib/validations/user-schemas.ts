/**
 * Validation schemas for user-related data
 */

import { z } from 'zod';
import { stringRequired, emailSchema } from './index';

/**
 * Schema for validating user profile data
 */
export const userProfileSchema = z.object({
  id: stringRequired,
  email: emailSchema,
  firstName: stringRequired.max(50, { message: "First name must be 50 characters or less" }),
  lastName: stringRequired.max(50, { message: "Last name must be 50 characters or less" }),
  displayName: z.string().max(100, { message: "Display name must be 100 characters or less" }).optional(),
  bio: z.string().max(500, { message: "Bio must be 500 characters or less" }).optional(),
  avatarUrl: z.string().url({ message: "Invalid URL format" }).optional(),
  githubUrl: z.string().url({ message: "Invalid URL format" }).optional(),
  linkedinUrl: z.string().url({ message: "Invalid URL format" }).optional(),
  twitterUrl: z.string().url({ message: "Invalid URL format" }).optional(),
  websiteUrl: z.string().url({ message: "Invalid URL format" }).optional(),
});

export type UserProfileInput = z.infer<typeof userProfileSchema>;

/**
 * Schema for validating user settings
 */
export const userSettingsSchema = z.object({
  userId: stringRequired,
  emailNotifications: z.boolean().default(true),
  pushNotifications: z.boolean().default(true),
  theme: z.enum(["light", "dark", "system"]).default("system"),
  language: z.string().default("en"),
});

export type UserSettingsInput = z.infer<typeof userSettingsSchema>;

/**
 * Schema for validating user authentication data
 */
export const userAuthSchema = z.object({
  email: emailSchema,
  password: z.string().min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
});

export type UserAuthInput = z.infer<typeof userAuthSchema>;

/**
 * Schema for validating password reset request
 */
export const passwordResetRequestSchema = z.object({
  email: emailSchema,
});

export type PasswordResetRequestInput = z.infer<typeof passwordResetRequestSchema>;

/**
 * Schema for validating password reset
 */
export const passwordResetSchema = z.object({
  token: stringRequired,
  password: userAuthSchema.shape.password,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type PasswordResetInput = z.infer<typeof passwordResetSchema>;

/**
 * Validation function for user profile data
 */
export function validateUserProfile(data: unknown) {
  return userProfileSchema.safeParse(data);
}

/**
 * Validation function for user settings
 */
export function validateUserSettings(data: unknown) {
  return userSettingsSchema.safeParse(data);
}

/**
 * Validation function for user authentication
 */
export function validateUserAuth(data: unknown) {
  return userAuthSchema.safeParse(data);
}

/**
 * Validation function for password reset request
 */
export function validatePasswordResetRequest(data: unknown) {
  return passwordResetRequestSchema.safeParse(data);
}

/**
 * Validation function for password reset
 */
export function validatePasswordReset(data: unknown) {
  return passwordResetSchema.safeParse(data);
}