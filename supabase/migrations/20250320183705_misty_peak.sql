/*
  # Fix user_prompts RLS policies

  1. Changes
    - Enable RLS on user_prompts table
    - Add policies for user access to their own prompts
    - Add policy for admin access to all prompts

  2. Security
    - Users can only manage their own prompts
    - Admins have full access to all prompts
*/

-- Enable RLS on user_prompts table
ALTER TABLE user_prompts ENABLE ROW LEVEL SECURITY;

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