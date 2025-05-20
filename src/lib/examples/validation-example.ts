/**
 * Example of how to use the validation schemas in server actions
 * 
 * NOTE: This file requires the Zod library to be installed.
 * Install it with: pnpm add zod
 */

import { validateChallenge, validateChallengeRegistration } from '@/lib/validations/challenge-schemas';
import { validateUserProfile } from '@/lib/validations/user-schemas';
import { validateTeam } from '@/lib/validations/team-schemas';

/**
 * Example server action for creating a challenge
 */
export async function createChallengeExample(formData: FormData) {
  // Extract data from form
  const data = {
    title: formData.get('title'),
    description: formData.get('description'),
    teamSize: Number(formData.get('teamSize')),
    startDate: formData.get('startDate'),
    endDate: formData.get('endDate') || undefined,
    tags: formData.getAll('tags').map(tag => String(tag)),
  };

  // Validate the data
  const result = validateChallenge(data);

  if (!result.success) {
    // Return validation errors
    return {
      success: false,
      errors: result.error.format(),
      message: "Validation failed",
    };
  }

  // Data is valid, proceed with creating the challenge
  try {
    // Here you would typically save the data to the database
    // const challenge = await db.challenges.create(result.data);
    
    return {
      success: true,
      data: result.data,
      message: "Challenge created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to create challenge",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Example server action for registering for a challenge
 */
export async function registerForChallengeExample(challengeId: string, userId: string) {
  // Validate the data
  const result = validateChallengeRegistration({ challengeId, userId });

  if (!result.success) {
    // Return validation errors
    return {
      success: false,
      errors: result.error.format(),
      message: "Validation failed",
    };
  }

  // Data is valid, proceed with registration
  try {
    // Here you would typically save the registration to the database
    // const registration = await db.challengeRegistrations.create(result.data);
    
    return {
      success: true,
      data: result.data,
      message: "Registration successful",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to register for challenge",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Example of how to use validation in a client component with form submission
 * 
 * This would be used in a React component to validate form data before submission.
 * The component would:
 * 1. Collect form data from a form submission event
 * 2. Call the server action with the form data
 * 3. Handle the response, showing errors if validation failed
 * 4. Proceed with success handling if validation passed
 */