/*
  # Initial Schema Setup for IA Assistant CSS

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, matches auth.users)
      - `email` (text)
      - `full_name` (text)
      - `avatar_url` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `prompts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `category` (text)
      - `user_id` (uuid, references profiles)
      - `is_public` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `prompt_ratings`
      - `id` (uuid, primary key)
      - `prompt_id` (uuid, references prompts)
      - `user_id` (uuid, references profiles)
      - `rating` (integer)
      - `comment` (text)
      - `created_at` (timestamp)
    
    - `resources`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `url` (text)
      - `type` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Secure access to private prompts
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create prompts table
CREATE TABLE IF NOT EXISTS prompts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  category text NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  is_public boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create prompt ratings table
CREATE TABLE IF NOT EXISTS prompt_ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id uuid REFERENCES prompts(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  rating integer CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  comment text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(prompt_id, user_id)
);

-- Create resources table
CREATE TABLE IF NOT EXISTS resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  url text NOT NULL,
  type text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompt_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Prompts policies
CREATE POLICY "Users can view public prompts and their own prompts"
  ON prompts
  FOR SELECT
  TO authenticated
  USING (is_public OR user_id = auth.uid());

CREATE POLICY "Users can create prompts"
  ON prompts
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own prompts"
  ON prompts
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own prompts"
  ON prompts
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Prompt ratings policies
CREATE POLICY "Users can view ratings for accessible prompts"
  ON prompt_ratings
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM prompts
      WHERE id = prompt_id
      AND (is_public OR user_id = auth.uid())
    )
  );

CREATE POLICY "Users can rate accessible prompts"
  ON prompt_ratings
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM prompts
      WHERE id = prompt_id
      AND (is_public OR user_id = auth.uid())
    )
  );

CREATE POLICY "Users can update their own ratings"
  ON prompt_ratings
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Resources policies
CREATE POLICY "Users can view all resources"
  ON resources
  FOR SELECT
  TO authenticated
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_prompts_updated_at
  BEFORE UPDATE ON prompts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_resources_updated_at
  BEFORE UPDATE ON resources
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();