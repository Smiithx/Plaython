# Testing Configuration

## Database Configuration for Tests

To prevent tests from running against the production database, this project has been configured to use a separate test database when running tests.

### How it works

1. The `src/lib/supabaseTestClient.ts` file creates a Supabase client specifically for testing.
2. The `src/lib/supabaseClient.ts` file has been updated to use the test client when `NODE_ENV` is set to 'test'.
3. The `jest.setup.js` file ensures that `NODE_ENV` is set to 'test' during Jest tests.

### Setting up a test database

To set up a test database for your tests, follow these steps:

1. Create a copy of the `.env.test.example` file and name it `.env.test`:
   ```bash
   copy .env.test.example .env.test
   ```

2. Edit the `.env.test` file and fill in your test database credentials:
   - You can create a separate Supabase project for testing
   - Or you can use a local Supabase instance (recommended for development)

#### Option 1: Using a separate Supabase project

1. Create a new Supabase project at https://app.supabase.com/
2. Get the URL and API keys from the project settings
3. Update the `.env.test` file with these values:
   ```
   TEST_SUPABASE_URL=https://your-test-project.supabase.co
   TEST_SUPABASE_ANON_KEY=your-test-anon-key
   TEST_SUPABASE_SERVICE_ROLE_KEY=your-test-service-role-key
   TEST_SUPABASE_DB_URL="postgresql://postgres:password@your-test-project.supabase.co:5432/postgres"
   ```

4. Run the migrations on your test database to create the necessary tables:
   ```bash
   NODE_ENV=test pnpm migrate
   ```

#### Option 2: Using a local Supabase instance

1. Install Supabase CLI: https://supabase.com/docs/guides/cli
2. Start a local Supabase instance:
   ```bash
   supabase start
   ```
3. Update the `.env.test` file with the local values (usually provided in the output of `supabase start`):
   ```
   TEST_SUPABASE_URL=http://localhost:54321
   TEST_SUPABASE_ANON_KEY=your-local-anon-key
   TEST_SUPABASE_SERVICE_ROLE_KEY=your-local-service-role-key
   TEST_SUPABASE_DB_URL="postgresql://postgres:postgres@localhost:54321/postgres"
   ```

4. Run the migrations on your local database to create the necessary tables:
   ```bash
   NODE_ENV=test pnpm migrate
   ```

### Running tests

Once you've set up your test database, you can run the tests as usual:

```bash
pnpm test
```

The tests will automatically use the test database instead of the production database.

## End-to-End Tests

The end-to-end tests in `challenge-registration-e2e.spec.ts` use Playwright to test the application in a browser. These tests interact with the real application, which would normally connect to the production database.

To make these tests use the test database:

1. Create a `.env.test` file as described above
2. Run the end-to-end tests with the test environment:
   ```bash
   NODE_ENV=test pnpm test:e2e
   ```

This will ensure that the application uses the test database during the end-to-end tests.