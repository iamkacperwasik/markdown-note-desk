import {SupabaseClient} from "@supabase/auth-helpers-nextjs"
import {Database} from "types/supabase"

export const fetchNotes = async (
  supabase: SupabaseClient<Database>
): Promise<Note[]> => {
  const {data: bookmarks} = await supabase
    .from("notes")
    .select("*")
    .eq("is_bookmark", true)
    .range(0, 4)

  const {data: notes} = await supabase
    .from("notes")
    .select("*")
    .eq("is_bookmark", false)
    .range(0, 4)

  return [bookmarks!, notes!].flat()
}
