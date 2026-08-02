import { createClient } from "@supabase/supabase-js";

// We will rely on env variables provided by the caller or runtime.
// For Next.js, they should be prefixed with NEXT_PUBLIC_
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string;

// Prevent crashing during build if env variables are missing
export const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

/**
 * Uploads a file to a Supabase bucket and returns the public URL.
 */
export async function uploadFileToSupabase(bucket: string, file: File, path: string): Promise<string> {
  if (!supabase) {
    throw new Error("Supabase client is not initialized. Check your environment variables.");
  }

  const { data, error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: "3600",
    upsert: true,
  });

  if (error) {
    throw new Error(error.message);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(data.path);

  return publicUrl;
}
