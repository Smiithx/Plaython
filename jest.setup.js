// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { createClient } from '@supabase/supabase-js';

// Ensure NODE_ENV is set to 'test'
process.env.NODE_ENV = 'test';

// Create a Supabase client for database operations during tests
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('Missing Supabase environment variables for test database cleaning');
}

const ZERO_UUID = '00000000-0000-0000-0000-000000000000';

// Tables that should NOT be cleaned (reference data)
const PRESERVED_TABLES = [
  'challenge_difficulties',
  'challenge_statuses',
  'tags'
];

// Tablas composite PK necesitan filtro distinto
const COMPOSITE_PK = {
  challenge_tags:          'challenge_id',
  challenge_group_members: 'group_id',
};

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
      if (PRESERVED_TABLES.includes(table)) continue;
      let query = supabase.from(table);
      // Si tabla composite, usa su primera columna PK con not equals a cadena vacía
      if (COMPOSITE_PK[table]) {
        const col = COMPOSITE_PK[table];
        query = query.delete().neq(col, ZERO_UUID);
      } else {
        // Si tiene id, borra todo salvo el id “nulo”
        query = query.delete().neq('id', '00000000-0000-0000-0000-000000000000');
      }

      const { error } = await query;
      if (error) {
        console.error(`Error limpiando ${table}:`, error);
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