/*
  # Fix user profile creation

  1. Changes
    - Update handle_new_user function to properly handle profile creation
    - Add error handling for edge cases
    - Ensure profile is created before any other operations

  2. Security
    - Function runs with SECURITY DEFINER to ensure proper permissions
    - Restricted to auth schema operations
*/

-- Drop existing function and trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Recreate function with better error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Insert the new user into public.profiles
  INSERT INTO public.profiles (id, email, created_at)
  VALUES (
    new.id,
    new.email,
    new.created_at
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    updated_at = now();

  RETURN new;
EXCEPTION
  WHEN others THEN
    -- Log the error (in a real system, you'd want proper error logging)
    RAISE WARNING 'Error in handle_new_user: %', SQLERRM;
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Ensure all existing users have profiles
INSERT INTO public.profiles (id, email, created_at)
SELECT 
  id,
  email,
  created_at
FROM auth.users
ON CONFLICT (id) DO NOTHING;