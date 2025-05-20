// scripts/migrate.js

require("dotenv").config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});
const { Client } = require("pg");

const MIGRATIONS = [
    {
        name: "challenge_difficulties",
        sql: `
      CREATE TABLE IF NOT EXISTS public.challenge_difficulties (
        id          SERIAL      PRIMARY KEY,
        label       TEXT        NOT NULL UNIQUE,
        sort_order  INTEGER     NOT NULL DEFAULT 0,
        created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
      );
      COMMENT ON TABLE public.challenge_difficulties IS 'Stores difficulty levels for challenges';
      ALTER TABLE public.challenge_difficulties ENABLE ROW LEVEL SECURITY;
      DROP POLICY IF EXISTS "Read difficulties" ON public.challenge_difficulties;
      CREATE POLICY "Read difficulties"
        ON public.challenge_difficulties FOR SELECT
        USING (true);
    `,
    },
    {
        name: "challenge_statuses",
        sql: `
      CREATE TABLE IF NOT EXISTS public.challenge_statuses (
        id          SERIAL      PRIMARY KEY,
        label       TEXT        NOT NULL UNIQUE,
        sort_order  INTEGER     NOT NULL DEFAULT 0,
        created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
      );
      COMMENT ON TABLE public.challenge_statuses IS 'Stores status options for challenges';
      ALTER TABLE public.challenge_statuses ENABLE ROW LEVEL SECURITY;
      DROP POLICY IF EXISTS "Read statuses" ON public.challenge_statuses;
      CREATE POLICY "Read statuses"
        ON public.challenge_statuses FOR SELECT
        USING (true);
    `,
    },
    {
        name: "tags",
        sql: `
      CREATE TABLE IF NOT EXISTS public.tags (
        id          SERIAL      PRIMARY KEY,
        name        TEXT        NOT NULL UNIQUE,
        created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
      );
      COMMENT ON TABLE public.tags IS 'Stores tags for challenges';
      ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
      DROP POLICY IF EXISTS "Read tags" ON public.tags;
      CREATE POLICY "Read tags"
        ON public.tags FOR SELECT
        USING (true);
    `,
    },
    {
        name: "challenges",
        sql: `
      CREATE TABLE IF NOT EXISTS public.challenges (
        id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
        title         TEXT        NOT NULL,
        description   TEXT        NOT NULL,
        difficulty_id INTEGER     REFERENCES public.challenge_difficulties(id),
        status_id     INTEGER     REFERENCES public.challenge_statuses(id),
        team_size     INTEGER     NOT NULL DEFAULT 1,
        start_date    TIMESTAMPTZ NOT NULL,
        end_date      TIMESTAMPTZ,
        created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
      );
      CREATE INDEX IF NOT EXISTS idx_challenges_difficulty_id ON public.challenges(difficulty_id);
      CREATE INDEX IF NOT EXISTS idx_challenges_status_id     ON public.challenges(status_id);
      CREATE INDEX IF NOT EXISTS idx_challenges_start_date    ON public.challenges(start_date);
      COMMENT ON TABLE public.challenges IS 'Stores challenge information';
      ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
      DROP POLICY IF EXISTS "Read challenges" ON public.challenges;
      CREATE POLICY "Read challenges"
        ON public.challenges FOR SELECT
        USING (true);
    `,
    },
    {
        name: "challenge_tags",
        sql: `
      CREATE TABLE IF NOT EXISTS public.challenge_tags (
        challenge_id UUID    NOT NULL REFERENCES public.challenges(id) ON DELETE CASCADE,
        tag_id       INTEGER NOT NULL REFERENCES public.tags(id)       ON DELETE CASCADE,
        created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
        PRIMARY KEY (challenge_id, tag_id)
      );
      CREATE INDEX IF NOT EXISTS idx_challenge_tags_challenge_id ON public.challenge_tags(challenge_id);
      CREATE INDEX IF NOT EXISTS idx_challenge_tags_tag_id       ON public.challenge_tags(tag_id);
      COMMENT ON TABLE public.challenge_tags IS 'Associates challenges with tags';
      ALTER TABLE public.challenge_tags ENABLE ROW LEVEL SECURITY;
      DROP POLICY IF EXISTS "Read challenge_tags" ON public.challenge_tags;
      CREATE POLICY "Read challenge_tags"
        ON public.challenge_tags FOR SELECT
        USING (true);
    `,
    },
    {
        name: "challenge_groups",
        sql: `
      CREATE TABLE IF NOT EXISTS public.challenge_groups (
        id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
        challenge_id UUID        NOT NULL REFERENCES public.challenges(id),
        created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
      );
      CREATE INDEX IF NOT EXISTS idx_challenge_groups_challenge_id
        ON public.challenge_groups(challenge_id);
      COMMENT ON TABLE public.challenge_groups IS 'Stores groups for challenges';
      ALTER TABLE public.challenge_groups ENABLE ROW LEVEL SECURITY;
      DROP POLICY IF EXISTS "Read challenge_groups" ON public.challenge_groups;
      CREATE POLICY "Read challenge_groups"
        ON public.challenge_groups FOR SELECT
        USING (true);
      DROP POLICY IF EXISTS "Insert challenge_groups" ON public.challenge_groups;
      CREATE POLICY "Insert challenge_groups"
        ON public.challenge_groups FOR INSERT TO authenticated
        WITH CHECK (true);
    `,
    },
    {
        name: "challenge_registrations",
        sql: `
      CREATE TABLE IF NOT EXISTS public.challenge_registrations (
        id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id       TEXT        NOT NULL DEFAULT auth.jwt()->>'sub',
        challenge_id  UUID        NOT NULL REFERENCES public.challenges(id),
        group_id      UUID        NULL REFERENCES public.challenge_groups(id),
        joined_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
        status        TEXT        NOT NULL DEFAULT 'registered',
        created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
        UNIQUE (user_id, challenge_id)
      );
      CREATE INDEX IF NOT EXISTS idx_challenge_registrations_user_challenge
        ON public.challenge_registrations(user_id, challenge_id);
      COMMENT ON TABLE public.challenge_registrations IS 'Stores user registrations for challenges';
      ALTER TABLE public.challenge_registrations ENABLE ROW LEVEL SECURITY;
      DROP POLICY IF EXISTS "Read own registrations" ON public.challenge_registrations;
      CREATE POLICY "Authenticated can read all registrations"
        ON public.challenge_registrations FOR SELECT
        USING (true);
      DROP POLICY IF EXISTS "Insert registrations" ON public.challenge_registrations;
      CREATE POLICY "Insert registrations"
        ON public.challenge_registrations FOR INSERT TO authenticated
        WITH CHECK (((select auth.jwt()->>'sub') = (user_id)::text));
      DROP POLICY IF EXISTS "Update own registrations" ON public.challenge_registrations;
      CREATE POLICY "Update own registrations"
        ON public.challenge_registrations FOR UPDATE TO authenticated
        USING (((select auth.jwt()->>'sub') = (user_id)::text))
        WITH CHECK (((select auth.jwt()->>'sub') = (user_id)::text));
      DROP POLICY IF EXISTS "Delete own registrations" ON public.challenge_registrations;
      CREATE POLICY "Delete own registrations"
        ON public.challenge_registrations FOR DELETE TO authenticated
        USING (((select auth.jwt()->>'sub') = (user_id)::text));
    `,
    },
    {
        name: "challenge_group_members",
        sql: `
      CREATE TABLE IF NOT EXISTS public.challenge_group_members (
        group_id    UUID        NOT NULL REFERENCES public.challenge_groups(id),
        user_id     TEXT        NOT NULL DEFAULT auth.jwt()->>'sub',
        joined_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
        created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
        PRIMARY KEY (group_id, user_id)
      );
      CREATE INDEX IF NOT EXISTS idx_cgm_group_id ON public.challenge_group_members(group_id);
      CREATE INDEX IF NOT EXISTS idx_cgm_user_id  ON public.challenge_group_members(user_id);
      COMMENT ON TABLE public.challenge_group_members IS 'Associates users with their challenge groups';
      ALTER TABLE public.challenge_group_members ENABLE ROW LEVEL SECURITY;
      DROP POLICY IF EXISTS "Read own group memberships" ON public.challenge_group_members;
      CREATE POLICY "Read own group memberships"
        ON public.challenge_group_members FOR SELECT
        USING (((select auth.jwt()->>'sub') = (user_id)::text));
      DROP POLICY IF EXISTS "Insert group memberships" ON public.challenge_group_members;
      CREATE POLICY "Insert group memberships"
        ON public.challenge_group_members FOR INSERT TO authenticated
        WITH CHECK (((select auth.jwt()->>'sub') = (user_id)::text));
      DROP POLICY IF EXISTS "Delete group memberships" ON public.challenge_group_members;
      CREATE POLICY "Delete group memberships"
        ON public.challenge_group_members FOR DELETE TO authenticated
        USING (((select auth.jwt()->>'sub') = (user_id)::text));
    `,
    },
];

async function migrate() {
    const client = new Client({
        connectionString: process.env.SUPABASE_DB_URL,
        ssl: { rejectUnauthorized: false },
    });

    try {
        await client.connect();
        for (const { name, sql } of MIGRATIONS) {
            console.log(`🔄 Migrating ${name}…`);
            await client.query(sql);
        }
        console.log("✅ Migration complete");
    } catch (err) {
        console.error("❌ Error running migration:", err);
        process.exit(1);
    } finally {
        await client.end();
    }
}

migrate();
