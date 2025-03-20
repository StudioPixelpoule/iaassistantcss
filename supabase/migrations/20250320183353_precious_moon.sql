-- Add cascade deletion for discussion-related tables
ALTER TABLE discussion_tags
DROP CONSTRAINT IF EXISTS discussion_tags_discussion_id_fkey,
ADD CONSTRAINT discussion_tags_discussion_id_fkey
  FOREIGN KEY (discussion_id)
  REFERENCES discussions(id)
  ON DELETE CASCADE;

ALTER TABLE discussion_replies
DROP CONSTRAINT IF EXISTS discussion_replies_discussion_id_fkey,
ADD CONSTRAINT discussion_replies_discussion_id_fkey
  FOREIGN KEY (discussion_id)
  REFERENCES discussions(id)
  ON DELETE CASCADE;

ALTER TABLE discussion_reactions
DROP CONSTRAINT IF EXISTS discussion_reactions_discussion_id_fkey,
ADD CONSTRAINT discussion_reactions_discussion_id_fkey
  FOREIGN KEY (discussion_id)
  REFERENCES discussions(id)
  ON DELETE CASCADE;

-- Create function to delete discussion and all related records
CREATE OR REPLACE FUNCTION delete_discussion(discussion_id uuid)
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

  -- Delete the discussion (will cascade to related records)
  DELETE FROM discussions WHERE id = discussion_id;
END;
$$;

-- Update admin policy for discussions
DROP POLICY IF EXISTS "Admins can manage discussions" ON discussions;
CREATE POLICY "Admins can manage discussions"
  ON discussions
  FOR ALL
  TO authenticated
  USING ((current_setting('request.jwt.claims', true)::json->>'is_admin')::boolean = true)
  WITH CHECK ((current_setting('request.jwt.claims', true)::json->>'is_admin')::boolean = true);