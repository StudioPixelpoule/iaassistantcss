/*
  # Add resource upload functionality

  1. New Tables
    - `resource_categories`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `created_at` (timestamp)
    - Add new columns to `resources`
      - `category_id` (uuid, foreign key)
      - `user_id` (uuid, foreign key)

  2. Security
    - Enable RLS on new tables
    - Add policies for admin access
*/

-- Create resource categories table
CREATE TABLE IF NOT EXISTS public.resource_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Add columns to resources table
ALTER TABLE public.resources
ADD COLUMN IF NOT EXISTS category_id uuid REFERENCES public.resource_categories(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE;

-- Enable RLS
ALTER TABLE public.resource_categories ENABLE ROW LEVEL SECURITY;

-- Policies for resource categories
CREATE POLICY "Admins can manage resource categories"
  ON public.resource_categories
  FOR ALL
  TO authenticated
  USING ((current_setting('request.jwt.claims', true)::json->>'is_admin')::boolean = true);

CREATE POLICY "Everyone can view resource categories"
  ON public.resource_categories
  FOR SELECT
  TO authenticated
  USING (true);

-- Update resources policies
DROP POLICY IF EXISTS "Users can view all resources" ON public.resources;

CREATE POLICY "Admins can manage resources"
  ON public.resources
  FOR ALL
  TO authenticated
  USING ((current_setting('request.jwt.claims', true)::json->>'is_admin')::boolean = true);

CREATE POLICY "Everyone can view resources"
  ON public.resources
  FOR SELECT
  TO authenticated
  USING (true);