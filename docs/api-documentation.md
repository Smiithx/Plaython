# Plaython API Documentation

This document provides comprehensive documentation for the backend services and APIs used in the Plaython project.

## Table of Contents

1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Challenges API](#challenges-api)
4. [Teams API](#teams-api)
5. [Users API](#users-api)
6. [Error Handling](#error-handling)

## Overview

Plaython uses Supabase as its backend service, which provides a PostgreSQL database and RESTful APIs. The application interacts with Supabase through the Supabase JavaScript client and server-side functions.

## Authentication

Authentication is handled by Clerk, which provides user management, authentication, and authorization services.

### User Authentication Flow

1. Users sign up or log in through Clerk's authentication UI
2. Clerk provides a JWT token that is used to authenticate requests to Supabase
3. The application uses Clerk's user ID to identify users in the Supabase database

### API Authentication

All API requests to Supabase require authentication. The application uses the following methods:

- Client-side: Uses the Supabase client with the anonymous key for public data
- Server-side: Uses the Supabase client with the service role key for protected operations

## Challenges API

The Challenges API provides endpoints for managing programming challenges and events.

### Endpoints

#### Get All Challenges

```typescript
// src/lib/services/challenges.ts
export async function getAllChallenges(): Promise<Challenge[]>
```

Returns a list of all available challenges.

#### Get Challenge by ID

```typescript
// src/lib/services/challenges.ts
export async function getChallengeById(id: string): Promise<Challenge | null>
```

Returns a specific challenge by its ID.

#### Create Challenge

```typescript
// src/lib/services/challenges.ts
export async function createChallenge(input: Omit<Challenge, "id">): Promise<Challenge>
```

Creates a new challenge with the provided data.

#### Register for Challenge

```typescript
// src/lib/actions/challenge-registration.ts
export async function registerForChallenge(challengeId: string): Promise<{ success: boolean; message: string; groupId?: string }>
```

Registers the current user for a challenge.

#### Unregister from Challenge

```typescript
// src/lib/actions/challenge-registration.ts
export async function unregisterFromChallenge(challengeId: string): Promise<{ success: boolean; message: string }>
```

Unregisters the current user from a challenge.

## Teams API

The Teams API provides endpoints for managing teams and team members.

### Endpoints

#### Get Team by ID

```typescript
// src/lib/services/teams.ts
export async function getTeamById(id: string): Promise<Team | null>
```

Returns a specific team by its ID.

#### Get Team Members

```typescript
// src/lib/services/teams.ts
export async function getTeamMembers(teamId: string): Promise<TeamMember[]>
```

Returns a list of members for a specific team.

#### Create Team

```typescript
// src/lib/services/teams.ts
export async function createTeam(input: Omit<Team, "id">): Promise<Team>
```

Creates a new team with the provided data.

## Users API

The Users API provides endpoints for managing user profiles and user-related data.

### Endpoints

#### Get User Profile

```typescript
// src/lib/services/users.ts
export async function getUserProfile(userId: string): Promise<UserProfile | null>
```

Returns a user's profile by their ID.

#### Update User Profile

```typescript
// src/lib/services/users.ts
export async function updateUserProfile(userId: string, data: Partial<UserProfile>): Promise<UserProfile>
```

Updates a user's profile with the provided data.

## Error Handling

All API functions follow a consistent error handling pattern:

1. Try to execute the operation
2. If successful, return the result
3. If an error occurs, throw a standardized error object with:
   - Error message
   - Error code
   - Error details (if available)

For more details on error handling, see [Error Handling Documentation](./error-handling.md).

## Database Schema

The database schema is defined in `scripts/migrate.js`. Key tables include:

- `challenges`: Stores information about programming challenges
- `challenge_registrations`: Tracks user registrations for challenges
- `challenge_groups`: Manages groups of users for team challenges
- `teams`: Stores information about teams
- `team_members`: Tracks team membership
- `users`: Stores user profiles

## Data Validation

All data sent to the API is validated using Zod schemas defined in:

- `src/lib/validations/challenge-schemas.ts`
- `src/lib/validations/team-schemas.ts`
- `src/lib/validations/user-schemas.ts`