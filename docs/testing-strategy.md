# Plaython Testing Strategy

This document outlines the comprehensive testing strategy for the Plaython project, including approaches for unit, integration, and end-to-end (E2E) testing.

## Testing Goals

The primary goals of our testing strategy are to:

1. **Ensure Functionality**: Verify that all features work as expected
2. **Prevent Regressions**: Catch issues before they reach production
3. **Improve Code Quality**: Encourage better code design through testability
4. **Document Behavior**: Tests serve as living documentation of expected behavior
5. **Support Refactoring**: Enable safe refactoring with confidence
6. **Increase Development Speed**: Reduce manual testing and debugging time

## Testing Pyramid

We follow the testing pyramid approach, with a focus on having:

- **Many Unit Tests**: Fast, focused tests for individual functions and components
- **Some Integration Tests**: Tests that verify interactions between components
- **Few E2E Tests**: Comprehensive tests that verify entire user flows

This approach provides a balance between test coverage, execution speed, and maintenance cost.

## Test Types and Responsibilities

### Unit Tests

Unit tests focus on testing individual functions, components, or modules in isolation.

**Characteristics**:
- Fast execution (milliseconds)
- No external dependencies (database, API, etc.)
- Mock or stub all dependencies
- Focus on a single unit of functionality

**When to Write Unit Tests**:
- For all utility functions
- For UI components
- For business logic
- For data transformations
- For server actions

**Example Unit Test**:
```tsx
// Testing a UI component
import { render, screen } from '@testing-library/react';
import { Badge } from '@/ui/badge';

describe('Badge Component', () => {
  it('renders with default styling', () => {
    render(<Badge>Test Badge</Badge>);
    const badge = screen.getByText('Test Badge');
    
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('inline-flex');
    expect(badge).toHaveClass('rounded-full');
  });
});
```

### Integration Tests

Integration tests verify that different parts of the application work together correctly.

**Characteristics**:
- Medium execution speed (seconds)
- May include some external dependencies
- Test interactions between components
- Focus on a specific feature or workflow

**When to Write Integration Tests**:
- For API endpoints
- For database interactions
- For form submissions
- For complex component interactions
- For authentication flows

**Example Integration Test**:
```tsx
// Testing challenge registration flow
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChallengeDetailClient } from '@/challenge/id/ChallengeDetailClient';
import { registerForChallenge } from '@/lib/actions/challenge-registration';

// Mock the server action
jest.mock('@/lib/actions/challenge-registration', () => ({
  registerForChallenge: jest.fn(),
}));

describe('Challenge Registration', () => {
  it('allows a user to register for a challenge', async () => {
    // Setup
    registerForChallenge.mockResolvedValue({ success: true });
    
    // Render the component
    render(<ChallengeDetailClient challenge={mockChallenge} />);
    
    // Interact with the component
    fireEvent.click(screen.getByText('Register'));
    
    // Verify the expected behavior
    await waitFor(() => {
      expect(registerForChallenge).toHaveBeenCalledWith(mockChallenge.id);
      expect(screen.getByText('Registration Successful')).toBeInTheDocument();
    });
  });
});
```

### End-to-End (E2E) Tests

E2E tests verify that entire user flows work correctly from start to finish.

**Characteristics**:
- Slow execution (minutes)
- Include all external dependencies
- Test complete user flows
- Focus on critical paths

**When to Write E2E Tests**:
- For critical user journeys
- For complex workflows
- For authentication and authorization
- For payment flows
- For multi-step processes

**Example E2E Test**:
```tsx
// Testing the full registration flow
import { test, expect } from '@playwright/test';

test('full registration flow: signup → queue → group assignment', async ({ browser }) => {
  // Create multiple browser contexts for different users
  const contexts = await Promise.all(
    testUsers.map(() => browser.newContext())
  );
  
  // Each user logs in and registers for the challenge
  for (let i = 0; i < contexts.length; i++) {
    const page = await contexts[i].newPage();
    await page.goto('/login');
    await page.fill('[name=email]', testUsers[i].email);
    await page.fill('[name=password]', testUsers[i].password);
    await page.click('button[type=submit]');
    
    await page.goto(`/challenges/${challengeId}`);
    await page.click('button:has-text("Register")');
    
    // Verify registration was successful
    await expect(page.locator('text=You are now registered')).toBeVisible();
  }
  
  // Verify users are assigned to groups
  // ...
});
```

## Test Coverage Goals

We aim for the following test coverage:

- **Unit Tests**: 80% code coverage
- **Integration Tests**: Cover all critical features and API endpoints
- **E2E Tests**: Cover all critical user journeys

## Testing Tools and Libraries

### Unit and Integration Testing

- **Jest**: Test runner and assertion library
- **React Testing Library**: Testing React components
- **MSW (Mock Service Worker)**: Mocking API requests
- **Zod**: Validating data structures

### End-to-End Testing

- **Playwright**: Browser automation for E2E tests
- **Playwright Test**: Test runner for Playwright

## Test Database Configuration

To prevent tests from affecting the production database, we use a separate test database when running tests.

### Setup Options

#### Option 1: Using a separate Supabase project

1. Create a new Supabase project
2. Configure `.env.test` with the test project credentials
3. Run migrations on the test database

#### Option 2: Using a local Supabase instance (recommended for development)

1. Install Supabase CLI
2. Start a local Supabase instance
3. Configure `.env.test` with the local instance credentials
4. Run migrations on the local database

See the [Testing Configuration README](__tests__/README.md) for detailed setup instructions.

## Test Organization

### Directory Structure

```
__tests__/
  ├── unit/                  # Unit tests
  │   ├── components/        # Component tests
  │   ├── utils/             # Utility function tests
  │   └── actions/           # Server action tests
  ├── integration/           # Integration tests
  │   ├── api/               # API endpoint tests
  │   └── features/          # Feature tests
  ├── e2e/                   # End-to-end tests
  │   └── flows/             # User flow tests
  ├── fixtures/              # Test data
  ├── helpers/               # Test helpers
  └── setup/                 # Test setup files
```

### Naming Conventions

- **Unit Tests**: `[filename].test.ts(x)`
- **Integration Tests**: `[feature].integration.test.ts(x)`
- **E2E Tests**: `[flow].e2e.spec.ts`

## Writing Effective Tests

### Best Practices

1. **Test Behavior, Not Implementation**: Focus on what the code does, not how it does it
2. **Keep Tests Independent**: Tests should not depend on each other
3. **Use Descriptive Test Names**: Test names should describe the expected behavior
4. **Follow AAA Pattern**: Arrange, Act, Assert
5. **Minimize Test Setup**: Keep test setup simple and focused
6. **Use Test Data Factories**: Create reusable functions for generating test data
7. **Avoid Test Duplication**: Don't repeat the same test logic
8. **Test Edge Cases**: Consider boundary conditions and error scenarios
9. **Keep Tests Fast**: Optimize for speed, especially unit tests
10. **Use Mocks Judiciously**: Mock external dependencies, but don't over-mock

### Anti-patterns to Avoid

1. **Testing Implementation Details**: Don't test private methods or internal state
2. **Brittle Tests**: Tests that break when implementation changes
3. **Overlapping Tests**: Tests that verify the same behavior multiple times
4. **Slow Tests**: Tests that take too long to run
5. **Flaky Tests**: Tests that sometimes pass and sometimes fail
6. **Testing the Framework**: Don't test functionality provided by the framework

## Continuous Integration

All tests should run automatically on CI/CD pipelines:

1. **Pull Requests**: Run unit and integration tests
2. **Main Branch**: Run all tests, including E2E tests
3. **Deployment**: Run smoke tests after deployment

## Test-Driven Development (TDD)

We encourage using TDD when appropriate:

1. Write a failing test
2. Implement the minimum code to make the test pass
3. Refactor the code while keeping the test passing

## Testing Server Components

Server Components require special consideration for testing:

1. **Unit Testing**: Test the component's logic in isolation
2. **Integration Testing**: Test the component's interactions with other components
3. **Rendering Testing**: Test the component's rendering output

Example approach for testing Server Components:

```tsx
// Testing a Server Component
import { renderToString } from 'react-dom/server';
import { ChallengesPage } from '@/app/challenges/page';
import { getChallenges } from '@/lib/services/challenges';

// Mock the data fetching function
jest.mock('@/lib/services/challenges', () => ({
  getChallenges: jest.fn(),
}));

describe('ChallengesPage', () => {
  it('renders a list of challenges', async () => {
    // Setup
    getChallenges.mockResolvedValue([
      { id: '1', title: 'Challenge 1' },
      { id: '2', title: 'Challenge 2' },
    ]);
    
    // Render the component
    const component = await ChallengesPage();
    const html = renderToString(component);
    
    // Verify the expected output
    expect(html).toContain('Challenge 1');
    expect(html).toContain('Challenge 2');
  });
});
```

## Testing Client Components

Client Components can be tested using React Testing Library:

```tsx
// Testing a Client Component
import { render, screen, fireEvent } from '@testing-library/react';
import { ChallengeCard } from '@/challenge/ChallengeCard.client';

describe('ChallengeCard', () => {
  it('calls onRegister when the register button is clicked', () => {
    // Setup
    const onRegister = jest.fn();
    const challenge = { id: '1', title: 'Challenge 1' };
    
    // Render the component
    render(<ChallengeCard challenge={challenge} onRegister={onRegister} />);
    
    // Interact with the component
    fireEvent.click(screen.getByText('Register'));
    
    // Verify the expected behavior
    expect(onRegister).toHaveBeenCalledWith('1');
  });
});
```

## Conclusion

This testing strategy provides a comprehensive approach to testing the Plaython project. By following these guidelines, we can ensure that our application is well-tested, reliable, and maintainable.

## References

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library Documentation](https://testing-library.com/docs/react-testing-library/intro)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Next.js Testing Documentation](https://nextjs.org/docs/testing)