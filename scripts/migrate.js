// scripts/migrate.js

require("dotenv").config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});
const {Client} = require("pg");

async function migrate() {
    const client = new Client({
        connectionString: process.env.SUPABASE_DB_URL, ssl: {rejectUnauthorized: false},
    });
    await client.connect();

    // ── difficulties ────────────────────────────────────────────────
    await client.query(`
        CREATE TABLE IF NOT EXISTS public.challenge_difficulties
        (
            id         serial PRIMARY KEY,
            label      text    NOT NULL UNIQUE,
            sort_order integer NOT NULL DEFAULT 0
        );

        -- Comentarios
        COMMENT ON TABLE public.challenge_difficulties IS
            'Stores difficulty levels for challenges';
        COMMENT ON COLUMN public.challenge_difficulties.id IS
            'Unique identifier for the difficulty level';
        COMMENT ON COLUMN public.challenge_difficulties.label IS
            'Display name of the difficulty level';
        COMMENT ON COLUMN public.challenge_difficulties.sort_order IS
            'Order for sorting difficulty levels';

        -- RLS
        ALTER TABLE public.challenge_difficulties
            ENABLE ROW LEVEL SECURITY;

        -- Policies (drop + create)
        DROP POLICY IF EXISTS "Read difficulties" ON public.challenge_difficulties;
        CREATE POLICY "Read difficulties"
            ON public.challenge_difficulties FOR SELECT
            USING (true);
    `);

    // ── statuses ────────────────────────────────────────────────
    await client.query(`
        CREATE TABLE IF NOT EXISTS public.challenge_statuses
        (
            id         serial PRIMARY KEY,
            label      text    NOT NULL UNIQUE,
            sort_order integer NOT NULL DEFAULT 0
        );

        -- Comentarios
        COMMENT ON TABLE public.challenge_statuses IS
            'Stores status options for challenges';
        COMMENT ON COLUMN public.challenge_statuses.id IS
            'Unique identifier for the status';
        COMMENT ON COLUMN public.challenge_statuses.label IS
            'Display name of the status';
        COMMENT ON COLUMN public.challenge_statuses.sort_order IS
            'Order for sorting statuses';

        -- RLS
        ALTER TABLE public.challenge_statuses
            ENABLE ROW LEVEL SECURITY;

        -- Policies (drop + create)
        DROP POLICY IF EXISTS "Read statuses" ON public.challenge_statuses;
        CREATE POLICY "Read statuses"
            ON public.challenge_statuses FOR SELECT
            USING (true);
    `);

    // ── tags ────────────────────────────────────────────────
    await client.query(`
        CREATE TABLE IF NOT EXISTS public.tags
        (
            id   serial PRIMARY KEY,
            name text NOT NULL UNIQUE
        );

        -- Comentarios
        COMMENT ON TABLE public.tags IS
            'Stores tags for challenges';
        COMMENT ON COLUMN public.tags.id IS
            'Unique identifier for the tag';
        COMMENT ON COLUMN public.tags.name IS
            'Name of the tag';

        -- RLS
        ALTER TABLE public.tags
            ENABLE ROW LEVEL SECURITY;

        -- Policies (drop + create)
        DROP POLICY IF EXISTS "Read tags" ON public.tags;
        CREATE POLICY "Read tags"
            ON public.tags FOR SELECT
            USING (true);
    `);

    // ── challenges ────────────────────────────────────────────────
    await client.query(`
        CREATE TABLE IF NOT EXISTS public.challenges
        (
            id            uuid PRIMARY KEY     DEFAULT gen_random_uuid(),
            title         text        NOT NULL,
            description   text        NOT NULL,
            difficulty_id integer REFERENCES public.challenge_difficulties (id),
            status_id     integer REFERENCES public.challenge_statuses (id),
            team_size     integer     NOT NULL DEFAULT 1,
            start_date    timestamptz NOT NULL,
            end_date      timestamptz
        );

        -- Índices
        CREATE INDEX IF NOT EXISTS idx_challenges_difficulty_id
            ON public.challenges (difficulty_id);
        CREATE INDEX IF NOT EXISTS idx_challenges_status_id
            ON public.challenges (status_id);
        CREATE INDEX IF NOT EXISTS idx_challenges_start_date
            ON public.challenges (start_date);

        -- Comentarios
        COMMENT ON TABLE public.challenges IS
            'Stores challenge information';
        COMMENT ON COLUMN public.challenges.id IS
            'Unique identifier for the challenge';
        COMMENT ON COLUMN public.challenges.title IS
            'Title of the challenge';
        COMMENT ON COLUMN public.challenges.description IS
            'Description of the challenge';
        COMMENT ON COLUMN public.challenges.difficulty_id IS
            'Reference to the difficulty level';
        COMMENT ON COLUMN public.challenges.status_id IS
            'Reference to the status';
        COMMENT ON COLUMN public.challenges.team_size IS
            'Number of participants per team';
        COMMENT ON COLUMN public.challenges.start_date IS
            'Start date and time of the challenge';
        COMMENT ON COLUMN public.challenges.end_date IS
            'End date and time of the challenge';

        -- RLS
        ALTER TABLE public.challenges
            ENABLE ROW LEVEL SECURITY;

        -- Policies (drop + create)
        DROP POLICY IF EXISTS "Read challenges" ON public.challenges;
        CREATE POLICY "Read challenges"
            ON public.challenges FOR SELECT
            USING (true);
    `);

    // ── challenge_tags ────────────────────────────────────────────────
    await client.query(`
        CREATE TABLE IF NOT EXISTS public.challenge_tags
        (
            challenge_id uuid    NOT NULL REFERENCES public.challenges (id) ON DELETE CASCADE,
            tag_id       integer NOT NULL REFERENCES public.tags (id) ON DELETE CASCADE,
            PRIMARY KEY (challenge_id, tag_id)
        );

        -- Índices
        CREATE INDEX IF NOT EXISTS idx_challenge_tags_challenge_id
            ON public.challenge_tags (challenge_id);
        CREATE INDEX IF NOT EXISTS idx_challenge_tags_tag_id
            ON public.challenge_tags (tag_id);

        -- Comentarios
        COMMENT ON TABLE public.challenge_tags IS
            'Associates challenges with tags';
        COMMENT ON COLUMN public.challenge_tags.challenge_id IS
            'Reference to the challenge';
        COMMENT ON COLUMN public.challenge_tags.tag_id IS
            'Reference to the tag';

        -- RLS
        ALTER TABLE public.challenge_tags
            ENABLE ROW LEVEL SECURITY;

        -- Policies (drop + create)
        DROP POLICY IF EXISTS "Read challenge_tags" ON public.challenge_tags;
        CREATE POLICY "Read challenge_tags"
            ON public.challenge_tags FOR SELECT
            USING (true);
    `);

    // ── challenge_groups ────────────────────────────────────────────────
    await client.query(`
    -- Crea tabla de grupos
    CREATE TABLE IF NOT EXISTS public.challenge_groups (
      id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
      challenge_id uuid        NOT NULL REFERENCES public.challenges(id),
      created_at   timestamptz NOT NULL DEFAULT now()
    );

    -- Índice
    CREATE INDEX IF NOT EXISTS idx_challenge_groups_challenge_id
      ON public.challenge_groups(challenge_id);

    -- Comentarios
    COMMENT ON TABLE public.challenge_groups IS
      'Stores groups for challenges, linking participants together';
    COMMENT ON COLUMN public.challenge_groups.id IS
      'Unique identifier for the group';
    COMMENT ON COLUMN public.challenge_groups.challenge_id IS
      'Reference to the challenge this group belongs to';
    COMMENT ON COLUMN public.challenge_groups.created_at IS
      'Timestamp when the group was created';

    -- RLS
    ALTER TABLE public.challenge_groups ENABLE ROW LEVEL SECURITY;

    -- Policies (drop + create)
    DROP POLICY IF EXISTS "Read challenge_groups" ON public.challenge_groups;
    CREATE POLICY "Read challenge_groups"
      ON public.challenge_groups FOR SELECT
      USING (true);

    DROP POLICY IF EXISTS "Insert challenge_groups" ON public.challenge_groups;
    CREATE POLICY "Insert challenge_groups"
      ON public.challenge_groups FOR INSERT TO authenticated
      WITH CHECK (true);
  `);

    // ── challenge_registrations ─────────────────────────────────────────
    await client.query(`
        CREATE TABLE IF NOT EXISTS public.challenge_registrations
        (
            id            uuid PRIMARY KEY     DEFAULT gen_random_uuid(),
            user_id       uuid        NOT NULL REFERENCES auth.users (id),
            challenge_id  uuid        NOT NULL REFERENCES public.challenges (id),
            group_id      uuid        NULL REFERENCES public.challenge_groups (id),
            registered_at timestamptz NOT NULL DEFAULT now(),
            status        text        NOT NULL DEFAULT 'registered',
            UNIQUE (user_id, challenge_id)
        );

        CREATE INDEX IF NOT EXISTS idx_challenge_registrations_user_challenge
            ON public.challenge_registrations (user_id, challenge_id);
        CREATE INDEX IF NOT EXISTS idx_challenge_registrations_challenge_id
            ON public.challenge_registrations (challenge_id);

        COMMENT ON TABLE public.challenge_registrations IS
            'Stores user registrations for challenges';
        COMMENT ON COLUMN public.challenge_registrations.id IS
            'Unique registration record ID';
        COMMENT ON COLUMN public.challenge_registrations.user_id IS
            'ID of the user registered';
        COMMENT ON COLUMN public.challenge_registrations.challenge_id IS
            'ID of the challenge';
        COMMENT ON COLUMN public.challenge_registrations.group_id IS
            'Assigned group ID';
        COMMENT ON COLUMN public.challenge_registrations.registered_at IS
            'Timestamp when user registered';
        COMMENT ON COLUMN public.challenge_registrations.status IS
            'Registration status: registered or unregistered';

        ALTER TABLE public.challenge_registrations
            ENABLE ROW LEVEL SECURITY;

        DROP POLICY IF EXISTS "Read own registrations" ON public.challenge_registrations;
        CREATE POLICY "Read own registrations"
            ON public.challenge_registrations FOR SELECT
            USING (current_setting('request.jwt.claim.sub')::uuid = user_id);

        DROP POLICY IF EXISTS "Insert registrations" ON public.challenge_registrations;
        CREATE POLICY "Insert registrations"
            ON public.challenge_registrations FOR INSERT TO authenticated
            WITH CHECK (current_setting('request.jwt.claim.sub')::uuid = user_id);

        DROP POLICY IF EXISTS "Update own registrations" ON public.challenge_registrations;
        CREATE POLICY "Update own registrations"
            ON public.challenge_registrations FOR UPDATE TO authenticated
            USING (current_setting('request.jwt.claim.sub')::uuid = user_id)
            WITH CHECK (current_setting('request.jwt.claim.sub')::uuid = user_id);

        DROP POLICY IF EXISTS "Delete own registrations" ON public.challenge_registrations;
        CREATE POLICY "Delete own registrations"
            ON public.challenge_registrations FOR DELETE TO authenticated
            USING (current_setting('request.jwt.claim.sub')::uuid = user_id);
    `);

    // ── challenge_group_members ─────────────────────────────────────────
    await client.query(`
        CREATE TABLE IF NOT EXISTS public.challenge_group_members
        (
            group_id  uuid        NOT NULL REFERENCES public.challenge_groups (id),
            user_id   uuid        NOT NULL REFERENCES auth.users (id),
            joined_at timestamptz NOT NULL DEFAULT now(),
            PRIMARY KEY (group_id, user_id)
        );

        CREATE INDEX IF NOT EXISTS idx_cgm_group_id
            ON public.challenge_group_members (group_id);
        CREATE INDEX IF NOT EXISTS idx_cgm_user_id
            ON public.challenge_group_members (user_id);

        COMMENT ON TABLE public.challenge_group_members IS
            'Associates users with their challenge groups';
        COMMENT ON COLUMN public.challenge_group_members.group_id IS
            'Group ID';
        COMMENT ON COLUMN public.challenge_group_members.user_id IS
            'User ID';
        COMMENT ON COLUMN public.challenge_group_members.joined_at IS
            'Timestamp when user joined group';

        ALTER TABLE public.challenge_group_members
            ENABLE ROW LEVEL SECURITY;

        DROP POLICY IF EXISTS "Read own group memberships" ON public.challenge_group_members;
        CREATE POLICY "Read own group memberships"
            ON public.challenge_group_members FOR SELECT
            USING (current_setting('request.jwt.claim.sub')::uuid = user_id);

        DROP POLICY IF EXISTS "Insert group memberships" ON public.challenge_group_members;
        CREATE POLICY "Insert group memberships"
            ON public.challenge_group_members FOR INSERT TO authenticated
            WITH CHECK (current_setting('request.jwt.claim.sub')::uuid = user_id);

        DROP POLICY IF EXISTS "Delete group memberships" ON public.challenge_group_members;
        CREATE POLICY "Delete group memberships"
            ON public.challenge_group_members FOR DELETE TO authenticated
            USING (current_setting('request.jwt.claim.sub')::uuid = user_id);
    `);

    console.log("✅ Migration complete");
    await client.end();
}

migrate().catch(err => {
    console.error("❌ Error running migration:", err);
    process.exit(1);
});
