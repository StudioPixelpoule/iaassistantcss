/*
  # Collaborative Features Schema

  1. New Tables
    - `discussions`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `user_id` (uuid, foreign key to profiles)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `is_pinned` (boolean)
      - `is_closed` (boolean)
    
    - `discussion_tags`
      - `id` (uuid, primary key)
      - `discussion_id` (uuid, foreign key to discussions)
      - `name` (text)

    - `discussion_replies`
      - `id` (uuid, primary key)
      - `discussion_id` (uuid, foreign key to discussions)
      - `user_id` (uuid, foreign key to profiles)
      - `content` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `discussion_reactions`
      - `id` (uuid, primary key)
      - `discussion_id` (uuid, foreign key to discussions)
      - `user_id` (uuid, foreign key to profiles)
      - `type` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Discussions table
CREATE TABLE IF NOT EXISTS discussions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  is_pinned boolean DEFAULT false,
  is_closed boolean DEFAULT false
);

ALTER TABLE discussions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all discussions"
  ON discussions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create discussions"
  ON discussions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own discussions"
  ON discussions
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own discussions"
  ON discussions
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Discussion tags table
CREATE TABLE IF NOT EXISTS discussion_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  discussion_id uuid NOT NULL REFERENCES discussions(id) ON DELETE CASCADE,
  name text NOT NULL
);

ALTER TABLE discussion_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all discussion tags"
  ON discussion_tags
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage tags on their discussions"
  ON discussion_tags
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM discussions
      WHERE discussions.id = discussion_tags.discussion_id
      AND discussions.user_id = auth.uid()
    )
  );

-- Discussion replies table
CREATE TABLE IF NOT EXISTS discussion_replies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  discussion_id uuid NOT NULL REFERENCES discussions(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE discussion_replies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all discussion replies"
  ON discussion_replies
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create replies"
  ON discussion_replies
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own replies"
  ON discussion_replies
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own replies"
  ON discussion_replies
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Discussion reactions table
CREATE TABLE IF NOT EXISTS discussion_reactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  discussion_id uuid NOT NULL REFERENCES discussions(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(discussion_id, user_id, type)
);

ALTER TABLE discussion_reactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all discussion reactions"
  ON discussion_reactions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage their own reactions"
  ON discussion_reactions
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Trigger for updating the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_discussions_updated_at
  BEFORE UPDATE ON discussions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_discussion_replies_updated_at
  BEFORE UPDATE ON discussion_replies
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();