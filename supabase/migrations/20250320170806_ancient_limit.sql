/*
  # Fix get_users function return type

  1. Changes
    - Update get_users function to return correct types
    - Fix email type mismatch

  2. Security
    - Maintain existing security checks
    - Function remains security definer
*/

-- Drop existing function
DROP FUNCTION IF EXISTS public.get_users();

-- Recreate function with correct types
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
    au.email::text,  -- Explicitly cast to text
    au.raw_user_meta_data,
    au.created_at
  FROM auth.users au
  ORDER BY au.created_at DESC;
END;
$$;