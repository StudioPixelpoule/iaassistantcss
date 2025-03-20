/*
  # Fix user management functions

  1. Changes
    - Update get_users function to handle null metadata and type casting
    - Add better error handling
    - Fix return type issues
    - Add proper security checks

  2. Security
    - Maintain admin-only access
    - Keep security definer settings
    - Add proper error messages
*/

-- Drop existing function
DROP FUNCTION IF EXISTS public.get_users();

-- Recreate function with proper null handling and type casting
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
DECLARE
  v_is_admin boolean;
BEGIN
  -- Get admin status with proper error handling
  BEGIN
    v_is_admin := (current_setting('request.jwt.claims', true)::json->>'is_admin')::boolean;
  EXCEPTION WHEN OTHERS THEN
    v_is_admin := false;
  END;

  -- Check if user is admin
  IF NOT v_is_admin THEN
    RAISE EXCEPTION 'Not authorized: Admin access required';
  END IF;

  -- Return user data with proper type handling
  RETURN QUERY
  SELECT 
    au.id,
    au.email::text,
    COALESCE(au.raw_user_meta_data, '{}'::jsonb) as metadata,
    au.created_at
  FROM auth.users au
  ORDER BY au.created_at DESC;

  -- Return empty set if no users found
  IF NOT FOUND THEN
    RETURN;
  END IF;
END;
$$;