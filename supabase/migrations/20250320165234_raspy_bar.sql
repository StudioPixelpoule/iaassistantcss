/*
  # Add admin access policy

  1. Changes
    - Adds policy for admin access to profiles table
    - Uses is_admin claim from JWT for authorization
*/

-- Create policy for admin access
DO $$ BEGIN
  CREATE POLICY "Admins have full access"
    ON profiles
    FOR ALL
    TO authenticated
    USING (
      auth.jwt() ->> 'is_admin' = 'true'
    );
EXCEPTION
  WHEN duplicate_object THEN
    NULL;
END $$;

-- Note: To make a user admin:
-- 1. Use Supabase Dashboard > Authentication > Users
-- 2. Find the user
-- 3. Click Edit > Custom User Metadata
-- 4. Add: { "is_admin": true }