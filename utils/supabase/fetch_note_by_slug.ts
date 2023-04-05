import {SupabaseClient} from "@supabase/auth-helpers-nextjs"

import {Database} from "types/supabase"

export default async function fetch_note_by_slug(
  supabase: SupabaseClient<Database>,
  slug: string,
  user_id: string
): Promise<Note | null> {
  const {data: note} = await supabase
    .from("notes")
    .select("*")
    .eq("title_slug", slug)
    .eq("user_id", user_id)
    .single()

  return note
}
