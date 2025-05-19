// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { createClient } from '@supabase/supabase-js';

// Ensure NODE_ENV is set to 'test'
process.env.NODE_ENV = 'test';

// Create a Supabase client for database operations during tests
const supabaseUrl = process.env.TEST_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.TEST_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('Missing Supabase environment variables for test database cleaning');
}

// Tables that should NOT be cleaned (reference data)
const PRESERVED_TABLES = [
  'challenge_difficulties',
  'challenge_statuses',
  'tags'
];

// Tables that should be cleaned before and after tests
const TABLES_TO_CLEAN = [
  'challenge_group_members',
  'challenge_registrations',
  'challenge_groups',
  'challenge_tags',
  'challenges'
];

/**
 * Cleans the test database by removing all data from specified tables
 */
async function cleanTestDatabase() {
  if (!supabaseUrl || !supabaseServiceKey) {
    console.warn('Skipping database cleaning due to missing environment variables');
    return;
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    console.log('Cleaning test database...');

    // Clean tables in reverse order to respect foreign key constraints
    for (const table of [...TABLES_TO_CLEAN].reverse()) {
      const { error } = await supabase
        .from(table)
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all rows

      if (error) {
        console.error(`Error cleaning table ${table}:`, error);
      } else {
        console.log(`✓ Cleaned table: ${table}`);
      }
    }

    console.log('Test database cleaning completed');
  } catch (error) {
    console.error('Error during test database cleaning:', error);
  }
}

// Run before all tests
beforeAll(async () => {
  await cleanTestDatabase();
});

// Run after all tests
afterAll(async () => {
  await cleanTestDatabase();
});
