# Plaython Developer Onboarding Guide

Welcome to the Plaython project! This guide will help you get started as a developer on the project.

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Project Structure](#project-structure)
5. [Key Technologies](#key-technologies)
6. [Coding Standards](#coding-standards)
7. [Testing](#testing)
8. [Deployment](#deployment)
9. [Troubleshooting](#troubleshooting)
10. [Resources](#resources)

## Introduction

Plaython is a matchmaking platform for programming challenges and events. It connects professionals from different specialties, forms balanced teams, and coordinates activities. Its intelligent algorithm optimizes role assignment and task planning, ensuring successful collaborations in hackathons and codeathons.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (latest LTS version recommended)
- pnpm 10.10.0 or later
- Git

### Setting Up Your Development Environment

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/plaython.git
   cd plaython
   ```

2. Copy the example environment file and fill in your values:
   ```bash
   cp .env.example .env
   ```

   You'll need to obtain the following credentials:
   - Clerk API keys (for authentication)
   - Supabase credentials (for database)

3. Install dependencies:
   ```bash
   pnpm install
   ```

4. Set up the database:
   ```bash
   pnpm migrate
   ```

5. Seed the database:
   ```bash
   pnpm seed
   pnpm seed:challenges
   ```

6. Start the development server:
   ```bash
   pnpm dev
   ```

   The application will be available at http://localhost:3000.

## Development Workflow

### Branch Strategy

We follow a feature branch workflow:
1. Create a new branch for each feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
   or
   ```bash
   git checkout -b fix/your-bug-fix
   ```

2. Make your changes and commit them with descriptive messages:
   ```bash
   git commit -m "Add feature: description of your changes"
   ```

3. Push your branch to the remote repository:
   ```bash
   git push origin feature/your-feature-name
   ```

4. Create a pull request for review.

### Code Review Process

All code changes must go through a code review process:
1. Create a pull request with a clear description of your changes
2. Assign reviewers to your pull request
3. Address any feedback from reviewers
4. Once approved, your changes will be merged into the main branch

## Project Structure

The project follows a specific structure to organize code:

```
plaython/
├── Components/         # UI components
│   ├── ui/             # Reusable UI components
│   ├── challenge/      # Challenge-related components
│   └── ...
├── src/
│   ├── app/            # Next.js App Router pages
│   ├── lib/            # Utility functions and services
│   ├── contexts/       # React contexts for state management
│   └── hooks/          # Custom React hooks
├── scripts/            # Database migration and seed scripts
├── docs/               # Project documentation
└── __tests__/          # Test files
```

For more details, see the [Architecture Diagrams](./architecture-diagrams.md).

## Key Technologies

### Frontend

- **React 19**: For building user interfaces
- **Next.js 15.3.2**: For server-side rendering and routing
- **TypeScript**: For type safety
- **Tailwind CSS**: For styling
- **Shadcn UI & Radix UI**: For UI components
- **GSAP & Motion**: For animations

### Backend

- **Supabase**: For database and backend services
- **Clerk**: For authentication and user management

### Testing

- **Jest**: For unit and integration testing
- **React Testing Library**: For testing React components

## Coding Standards

We follow specific coding standards to maintain code quality:

### TypeScript

- Use TypeScript for all new code
- Define interfaces for all props and state
- Use proper type annotations for functions and variables
- Avoid using `any` type

### React

- Use functional components with hooks
- Follow the React Server Components pattern for Next.js
- Minimize client-side JavaScript by leveraging server components
- Use proper memoization for expensive calculations

### Styling

- Use Tailwind CSS for styling
- Follow a mobile-first approach
- Use the provided UI components from Shadcn UI and Radix UI

For more details, see the [Development Guidelines](./.junie/guidelines.md).

## Testing

We use Jest and React Testing Library for testing:

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage report
pnpm test:coverage
```

### Writing Tests

- Write unit tests for utility functions
- Write component tests for UI components
- Write integration tests for critical user flows

For more details, see the [Testing Strategy](./testing-strategy.md).

## Deployment

The application is deployed using a CI/CD pipeline:

1. Changes merged to the main branch trigger a build
2. Tests are run to ensure code quality
3. If tests pass, the application is deployed to the staging environment
4. After manual verification, the application can be deployed to production

## Troubleshooting

### Common Issues

#### Database Connection Issues

If you're having trouble connecting to the database:
1. Check your `.env` file to ensure your Supabase credentials are correct
2. Make sure your IP address is allowed in the Supabase dashboard
3. Run `pnpm migrate` to ensure your database schema is up to date

#### Authentication Issues

If you're having trouble with authentication:
1. Check your `.env` file to ensure your Clerk API keys are correct
2. Make sure you've set up the Clerk dashboard correctly
3. Check the browser console for any errors

#### Build Errors

If you're having trouble building the application:
1. Make sure you've installed all dependencies with `pnpm install`
2. Check for TypeScript errors with `pnpm type-check`
3. Check for linting errors with `pnpm lint`

## Resources

### Documentation

- [README](../README.md): Project overview and setup instructions
- [API Documentation](./api-documentation.md): Documentation for backend services
- [Component Usage](./component-usage.md): Guidelines for using components
- [Architecture Diagrams](./architecture-diagrams.md): Visual representation of the system
- [State Management](./state-management.md): Documentation for state management
- [Error Handling](./error-handling.md): Documentation for error handling
- [Server vs. Client Components](./server-client-components.md): Guidelines for component types

### External Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Supabase Documentation](https://supabase.io/docs)

### Getting Help

If you need help, you can:
1. Check the documentation
2. Ask a team member
3. Create an issue in the repository