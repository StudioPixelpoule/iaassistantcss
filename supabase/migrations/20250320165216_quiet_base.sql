/*
  # Add admin role support

  1. Changes
    - Creates admin role in auth.roles
    - Adds policy for admin access to profiles table
*/

-- Create admin role if it doesn't exist
INSERT INTO auth.roles (role)
VALUES ('admin')
ON CONFLICT (role) DO NOTHING;

-- Create policy for admin access
DO $$ BEGIN
  CREATE POLICY "Admins have full access"
    ON profiles
    FOR ALL
    TO authenticated
    USING (
      auth.jwt() ->> 'role' = 'admin'
    );
EXCEPTION
  WHEN duplicate_object THEN
    NULL;
END $$;

-- Note: To make a user admin, use the Supabase Dashboard:
-- 1. Go to Authentication > Users
-- 2. Find the user
-- 3. Click "..." > "Make admin"