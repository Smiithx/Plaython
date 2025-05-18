# Plaython Development Guidelines

This document provides essential information for developers working on the Plaython project.

## Project Overview

Plaython is a Next.js application built with TypeScript, using:
- React 19
- Next.js 15.3.2
- Clerk for authentication
- Supabase for backend/database
- Tailwind CSS for styling
- GSAP and Motion for animations

## Build and Configuration

### Prerequisites

- Node.js (latest LTS version recommended)
- pnpm 10.10.0 or later (project uses pnpm as package manager)

### Environment Setup

1. Copy `.env.example` to `.env` and fill in the required values:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your-clerk-publishable-key"
   CLERK_SECRET_KEY="your-clerk-secret-key"
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-public-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

### Development

To start the development server with Turbopack:

```bash
pnpm dev
```

The application will be available at http://localhost:3000.

### Building for Production

To create a production build:

```bash
pnpm build
```

To start the production server:

```bash
pnpm start
```

### Code Quality Checks

Run linting:

```bash
pnpm lint
```

Run type checking:

```bash
pnpm type-check
```

Run both linting and type checking:

```bash
pnpm check
```

### Seeding Data

The project includes scripts for seeding data:

```bash
# Seed general data
pnpm seed

# Seed challenges data
pnpm seed:challenges
```

## Testing

The project uses Jest and React Testing Library for testing.

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode (useful during development)
pnpm test:watch

# Run tests with coverage report
pnpm test:coverage
```

### Writing Tests

Tests are located in the `__tests__` directory at the root of the project. Test files should follow the naming convention `*.test.tsx` or `*.test.ts`.

#### Example Test

Here's an example test for a UI component:

```tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Badge } from '@/Components/ui/badge';

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

### Adding New Tests

1. Create a new test file in the `__tests__` directory
2. Import the component or function you want to test
3. Write your test cases using Jest's `describe` and `it` functions
4. Use React Testing Library's render and query functions to test React components

## Code Style and Development Practices

### TypeScript Configuration

The project uses TypeScript with strict type checking. The `tsconfig.json` file includes:

- Target: ES2017
- Strict type checking enabled
- Path aliases:
  - `@/*` maps to both `./src/*` and `./Components/*`
- Prefer `interface` over `type` for object shapes.
- Avoid `enum`; use plain objects or maps instead.
- Define React components as functional components with explicit TypeScript interfaces.

### Component Structure

- UI components are in the `Components/ui` directory
- Feature-specific components are organized by feature in the `Components` directory
- Page components are in the `src/app` directory following Next.js App Router conventions

### Path Aliases

Use the `@/` prefix to import from the `src` or `Components` directories:

```tsx
// Importing from src
import { someUtil } from '@/lib/utils';

// Importing from Components
import { Badge } from '@/Components/ui/badge';
```

### Linting

The project uses ESLint with Next.js's recommended configuration:
- `next/core-web-vitals`
- `next/typescript`

Run linting with:

```bash
pnpm lint
```

## Functional and Declarative Patterns
- Use functional and declarative programming patterns; avoid classes.
- Prefer iteration and modularization over code duplication.
- Use descriptive variable names with auxiliary verbs (e.g., `isLoading`, `hasError`).
- Structure files consistently:
    - Main exported component
    - Subcomponents
    - Helpers/utils
    - Static content (e.g., JSON, SVG)
    - Type definitions

### Naming Conventions
- Use lowercase with dashes for directory names (e.g., `components/auth-wizard`).
- Favor named exports for components (no default exports).

### Syntax and Formatting
- Use the `function` keyword for pure functions instead of arrow functions.
- Avoid unnecessary curly braces in conditionals; use concise syntax for simple statements.
- Write declarative JSX only; do not mix with manual DOM APIs.

### UI and Styling
- Use **Shadcn UI**, **Radix UI**, and **Tailwind CSS** for all components and styling.
- Implement mobile-first responsive design using Tailwind’s utility classes.

### Performance Optimization
- Minimize `use client`, `useEffect`, and `useState`; favor React Server Components (RSC) and Next.js SSR.
- Wrap client components in `<Suspense>` with lightweight fallbacks.
- Use dynamic imports (`next/dynamic`) for non-critical components.
- Optimize images: use WebP format, specify `width`/`height`, and enable lazy loading.

### Key Conventions
- Manage URL search parameter state using the `nuqs` library.
- Monitor and improve Web Vitals (LCP, CLS, FID).
- Limit `use client` usage to small components that require browser APIs.

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Supabase Documentation](https://supabase.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library Documentation](https://testing-library.com/docs/react-testing-library/intro)