/*
  # Add admin functions

  1. New Functions
    - get_users: Get all users with metadata
    - delete_user: Delete a user
    - toggle_user_admin: Toggle admin status for a user

  2. Security
    - All functions require admin privileges
    - Functions are executed with security definer
*/

-- Function to get all users
CREATE OR REPLACE FUNCTION public.get_users()
RETURNS TABLE (
  id uuid,
  email text,
  metadata jsonb,
  created_at timestamptz
)
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  -- Check if user is admin
  IF NOT (current_setting('request.jwt.claims', true)::json->>'is_admin')::boolean THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;

  RETURN QUERY
  SELECT 
    au.id,
    au.email,
    au.raw_user_meta_data,
    au.created_at
  FROM auth.users au
  ORDER BY au.created_at DESC;
END;
$$;

-- Function to delete a user
CREATE OR REPLACE FUNCTION public.delete_user(user_id uuid)
RETURNS void
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  -- Check if user is admin
  IF NOT (current_setting('request.jwt.claims', true)::json->>'is_admin')::boolean THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;

  -- Delete user from auth.users (will cascade to profiles)
  DELETE FROM auth.users WHERE id = user_id;
END;
$$;

-- Function to toggle admin status
CREATE OR REPLACE FUNCTION public.toggle_user_admin(user_id uuid, is_admin boolean)
RETURNS void
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  -- Check if user is admin
  IF NOT (current_setting('request.jwt.claims', true)::json->>'is_admin')::boolean THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;

  -- Update user metadata
  UPDATE auth.users
  SET raw_user_meta_data = 
    CASE 
      WHEN raw_user_meta_data IS NULL THEN 
        jsonb_build_object('is_admin', is_admin)
      ELSE 
        raw_user_meta_data || jsonb_build_object('is_admin', is_admin)
    END
  WHERE id = user_id;
END;
$$;