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
    - Enable RLS
    - Add policy for authenticated users to view resources
*/

-- Resources table
CREATE TABLE IF NOT EXISTS resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  url text NOT NULL,
  type text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all resources"
  ON resources
  FOR SELECT
  TO authenticated
  USING (true);

-- Update trigger for resources
CREATE TRIGGER update_resources_updated_at
  BEFORE UPDATE ON resources
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert initial resources
INSERT INTO resources (title, description, url, type) VALUES
  (
    'Guide de démarrage avec l''IA',
    'Un guide complet pour commencer à utiliser l''IA dans votre pratique pédagogique',
    'https://example.com/guide-ia',
    'guide'
  ),
  (
    'Tutoriel : Créer des prompts efficaces',
    'Apprenez à formuler des prompts qui donnent les résultats souhaités',
    'https://example.com/tutoriel-prompts',
    'video'
  ),
  (
    'Modèle de planification avec l''IA',
    'Un template pour intégrer l''IA dans votre planification pédagogique',
    'https://example.com/modele-planification',
    'document'
  ),
  (
    'Ressources pédagogiques IA',
    'Une collection de ressources pour l''utilisation de l''IA en éducation',
    'https://example.com/ressources-ia',
    'link'
  );