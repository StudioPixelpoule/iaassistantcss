-- Create storage bucket for resources
INSERT INTO storage.buckets (id, name, public)
VALUES ('resources', 'resources', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload files"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'resources');

-- Allow public access to files
CREATE POLICY "Public access to resources"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'resources');

-- Allow admins to delete files
CREATE POLICY "Admins can delete files"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'resources' AND
  (current_setting('request.jwt.claims', true)::json->>'is_admin')::boolean = true
);