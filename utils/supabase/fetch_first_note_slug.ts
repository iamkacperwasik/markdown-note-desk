import {SupabaseClient} from "@supabase/auth-helpers-nextjs"

import {Database} from "types/supabase"

export default async function fetch_first_note_slug(
  supabase: SupabaseClient<Database>,
  user_id: string
): Promise<string> {
  const {data} = await supabase
    .from("notes")
    .select("title_slug")
    .eq("user_id", user_id)
    .limit(1)
    .single()

  return data!.title_slug
}
