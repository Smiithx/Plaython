# Plaython

Plaython is a matchmaking platform for programming challenges and events. It connects professionals from different specialties, forms balanced teams, and coordinates activities. Its intelligent algorithm optimizes role assignment and task planning, ensuring successful collaborations in hackathons and codeathons.

## Demo

Visit the live demo at: [https://plaython.vercel.app/](https://plaython.vercel.app/)

[Dashboard Screenshot](public/welcome.png)

## Project Overview

Plaython is built with:
- React 19
- Next.js 15.3.2
- TypeScript
- Clerk for authentication
- Supabase for backend/database
- Tailwind CSS for styling
- GSAP and Motion for animations
- Shadcn UI and Radix UI for components

## Prerequisites

- Node.js (latest LTS version recommended)
- pnpm 10.10.0 or later

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/plaython.git
cd plaython
```

### 2. Environment Setup

Copy the example environment file and fill in your values:

```bash
cp .env.example .env
```

Required environment variables:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your-clerk-publishable-key"
CLERK_SECRET_KEY="your-clerk-secret-key"
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-public-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 3. Install Dependencies

```bash
pnpm install
```

### 4. Set Up the Database

Run the migration script to set up the Supabase database schema:

```bash
pnpm migrate
```

### 5. Seed the Database

Populate the database with initial data:

```bash
pnpm seed
pnpm seed:challenges
```

### 6. Start the Development Server

```bash
pnpm dev
```

The application will be available at http://localhost:3000.

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start the development server with Turbopack |
| `pnpm build` | Create a production build |
| `pnpm start` | Start the production server |
| `pnpm lint` | Run ESLint to check for code issues |
| `pnpm type-check` | Run TypeScript type checking |
| `pnpm check` | Run both linting and type checking |
| `pnpm test` | Run all tests |
| `pnpm test:watch` | Run tests in watch mode |
| `pnpm test:coverage` | Run tests with coverage report |
| `pnpm migrate` | Run database migrations |
| `pnpm seed` | Seed general data |
| `pnpm seed:challenges` | Seed challenges data |

## Project Structure

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

## Architecture

Plaython follows a client-server architecture with:
- Next.js App Router for routing and server components
- React Server Components (RSC) for server-rendered UI
- Client components for interactive elements
- Supabase for database and backend services
- Clerk for authentication and user management

### State Management

The application uses React Context for global state management, with separate contexts for different domains:
- User context for user-related state
- Challenges context for challenge-related state
- Teams context for team-related state
- Error context for error handling

See `docs/state-management.md` for more details.

### Data Fetching

The application uses a combination of:
- Server components for initial data loading
- Custom hooks with React Query for client-side data fetching
- Server actions for mutations

### Error Handling

The application uses a comprehensive error handling strategy with:
- Custom error boundaries for different parts of the application
- Standardized error handling for API calls
- User-friendly error messages and fallback UIs

See `docs/error-handling.md` for more details.

### Authentication with Clerk

Plaython uses Clerk for authentication and user management:

- **User Authentication**: Users sign up or log in through Clerk's authentication UI components
- **JWT Tokens**: Clerk provides JWT tokens that are used to authenticate requests to Supabase
- **User Identification**: The application uses Clerk's user ID to identify users in the Supabase database
- **Middleware Protection**: Routes are protected using Clerk middleware
- **User Context**: A custom user context integrates with Clerk's `useUser()` hook to provide user data throughout the application
- **Internationalization**: Clerk is configured with localization support for multiple languages

The integration between Clerk and Supabase ensures secure authentication while leveraging Supabase's database capabilities.

## Contributing

Please read the development guidelines in `.junie/guidelines.md` before contributing to the project.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
