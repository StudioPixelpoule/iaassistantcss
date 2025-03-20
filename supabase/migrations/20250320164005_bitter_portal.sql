/*
  # My Prompts Schema

  1. New Tables
    - `user_prompts`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to profiles)
      - `title` (text)
      - `content` (text)
      - `category` (text)
      - `is_favorite` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `last_used_at` (timestamp)
      - `usage_count` (integer)

    - `prompt_categories`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to profiles)
      - `name` (text)
      - `color` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own prompts and categories
*/

-- Prompt categories table
CREATE TABLE IF NOT EXISTS prompt_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  color text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE prompt_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own categories"
  ON prompt_categories
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- User prompts table
CREATE TABLE IF NOT EXISTS user_prompts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text NOT NULL,
  category uuid REFERENCES prompt_categories(id) ON DELETE SET NULL,
  is_favorite boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  last_used_at timestamptz,
  usage_count integer DEFAULT 0
);

ALTER TABLE user_prompts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own prompts"
  ON user_prompts
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Update trigger for user_prompts
CREATE TRIGGER update_user_prompts_updated_at
  BEFORE UPDATE ON user_prompts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();