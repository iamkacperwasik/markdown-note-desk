import {SupabaseClient} from "@supabase/auth-helpers-nextjs"
import {Database} from "types/supabase"

export const fetch_note_by_slug = async (
  supabase: SupabaseClient<Database>,
  slug: string
): Promise<Note | null> => {
  const {data: note} = await supabase
    .from("notes")
    .select("*")
    .eq("title_slug", slug)
    .single()

  return note
}
