/*
  # Fix user_prompts RLS policies

  1. Changes
    - Drop existing policies to avoid conflicts
    - Create new policies for user access
    - Add policy for admin access
    - Add policy for inserting new prompts

  2. Security
    - Users can manage their own prompts
    - Admins have full access to all prompts
    - Users can create new prompts
*/

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can manage their own prompts" ON user_prompts;
DROP POLICY IF EXISTS "Admins have full access to prompts" ON user_prompts;

-- Create policy for users to manage their own prompts
CREATE POLICY "Users can manage their own prompts"
  ON user_prompts
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create policy for admin access
CREATE POLICY "Admins have full access to prompts"
  ON user_prompts
  FOR ALL
  TO authenticated
  USING ((current_setting('request.jwt.claims', true)::json->>'is_admin')::boolean = true)
  WITH CHECK ((current_setting('request.jwt.claims', true)::json->>'is_admin')::boolean = true);

-- Create policy specifically for inserting new prompts
CREATE POLICY "Users can create new prompts"
  ON user_prompts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);