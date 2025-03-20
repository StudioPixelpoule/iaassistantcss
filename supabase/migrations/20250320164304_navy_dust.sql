/*
  # Resources Schema

  1. New Tables
    - `resources`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `url` (text)
      - `type` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS if not already enabled
    - Add policy for authenticated users to view resources if not exists
*/

-- Resources table
DO $$ BEGIN
  CREATE TABLE IF NOT EXISTS resources (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    description text NOT NULL,
    url text NOT NULL,
    type text NOT NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
  );
EXCEPTION
  WHEN duplicate_table THEN
    NULL;
END $$;

-- Enable RLS
DO $$ BEGIN
  ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
EXCEPTION
  WHEN duplicate_object THEN
    NULL;
END $$;

-- Create policy if it doesn't exist
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'resources' AND policyname = 'Users can view all resources'
  ) THEN
    CREATE POLICY "Users can view all resources"
      ON resources
      FOR SELECT
      TO authenticated
      USING (true);
  END IF;
END $$;

-- Update trigger
DO $$ BEGIN
  CREATE TRIGGER update_resources_updated_at
    BEFORE UPDATE ON resources
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
EXCEPTION
  WHEN duplicate_object THEN
    NULL;
END $$;

-- Insert initial resources if they don't exist
INSERT INTO resources (title, description, url, type)
SELECT
  'Guide de démarrage avec l''IA',
  'Un guide complet pour commencer à utiliser l''IA dans votre pratique pédagogique',
  'https://example.com/guide-ia',
  'guide'
WHERE NOT EXISTS (
  SELECT 1 FROM resources WHERE title = 'Guide de démarrage avec l''IA'
);

INSERT INTO resources (title, description, url, type)
SELECT
  'Tutoriel : Créer des prompts efficaces',
  'Apprenez à formuler des prompts qui donnent les résultats souhaités',
  'https://example.com/tutoriel-prompts',
  'video'
WHERE NOT EXISTS (
  SELECT 1 FROM resources WHERE title = 'Tutoriel : Créer des prompts efficaces'
);

INSERT INTO resources (title, description, url, type)
SELECT
  'Modèle de planification avec l''IA',
  'Un template pour intégrer l''IA dans votre planification pédagogique',
  'https://example.com/modele-planification',
  'document'
WHERE NOT EXISTS (
  SELECT 1 FROM resources WHERE title = 'Modèle de planification avec l''IA'
);

INSERT INTO resources (title, description, url, type)
SELECT
  'Ressources pédagogiques IA',
  'Une collection de ressources pour l''utilisation de l''IA en éducation',
  'https://example.com/ressources-ia',
  'link'
WHERE NOT EXISTS (
  SELECT 1 FROM resources WHERE title = 'Ressources pédagogiques IA'
);