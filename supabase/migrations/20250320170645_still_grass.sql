/*
  # Add admin permissions

  1. Changes
    - Add admin access policy for auth.users table
    - Add admin access policy for auth.users metadata
    - Add admin access policy for auth management functions

  2. Security
    - Only users with is_admin=true in metadata can access admin functions
    - Policies are restrictive by default
*/

-- Enable RLS on auth schema tables
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create policy for admin access to auth.users
CREATE POLICY "Allow admin access to auth.users"
  ON auth.users
  FOR ALL
  TO authenticated
  USING (
    (current_setting('request.jwt.claims', true)::json->>'is_admin')::boolean = true
  );

-- Create policy for admin access to auth.users metadata
CREATE POLICY "Allow admin access to auth.users metadata"
  ON auth.users
  FOR ALL
  TO authenticated
  USING (
    (current_setting('request.jwt.claims', true)::json->>'is_admin')::boolean = true
  );

-- Grant admin permissions to authenticated users with is_admin=true
DO $$ 
BEGIN
  -- Grant admin access to auth schema
  GRANT USAGE ON SCHEMA auth TO authenticated;
  
  -- Grant access to auth.users table
  GRANT ALL ON auth.users TO authenticated;
  
  -- Grant access to auth management functions
  GRANT EXECUTE ON FUNCTION auth.jwt() TO authenticated;
  GRANT EXECUTE ON FUNCTION auth.role() TO authenticated;
END $$;