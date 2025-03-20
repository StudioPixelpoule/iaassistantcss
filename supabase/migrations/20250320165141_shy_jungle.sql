/*
  # Add admin role to user

  1. Changes
    - Adds admin role to specified user
    - Creates policy for admin access
*/

-- Add admin role to specific user (replace UUID with actual user ID)
INSERT INTO auth.users_roles (user_id, role)
VALUES ('REPLACE_WITH_USER_UUID', 'admin');

-- Create policy for admin access
CREATE POLICY "Admins have full access"
ON profiles
FOR ALL
TO authenticated
USING (
  auth.jwt() ->> 'role' = 'admin'
);