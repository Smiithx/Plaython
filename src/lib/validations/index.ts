/**
 * Central validation schema library for Plaython
 * 
 * NOTE: This file requires the Zod library to be installed.
 * Install it with: pnpm add zod
 */

import { z } from 'zod';

// Common validation utilities
export const stringRequired = z.string().min(1, { message: "This field is required" });
export const numberRequired = z.number({ required_error: "This field is required" });
export const emailSchema = z.string().email({ message: "Invalid email address" });
export const uuidSchema = z.string().uuid({ message: "Invalid ID format" });
export const dateSchema = z.string().datetime({ message: "Invalid date format" });
export const optionalDateSchema = z.string().datetime({ message: "Invalid date format" }).optional().nullable();

// Re-export all schemas
export * from './challenge-schemas';
export * from './user-schemas';
export * from './team-schemas';