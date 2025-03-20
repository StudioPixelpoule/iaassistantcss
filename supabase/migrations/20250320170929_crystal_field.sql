/*
  # Fix user management functions

  1. Changes
    - Update get_users function to handle null metadata
    - Add better error handling
    - Fix type casting issues

  2. Security
    - Maintain admin-only access
    - Keep security definer settings
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
BEGIN
  -- Check if user is admin
  IF NOT (current_setting('request.jwt.claims', true)::json->>'is_admin')::boolean THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;

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