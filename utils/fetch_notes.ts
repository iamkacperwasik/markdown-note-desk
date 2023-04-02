import {SupabaseClient} from "@supabase/auth-helpers-nextjs"
import {Database} from "types/supabase"

export const fetch_notes = async (
  supabase: SupabaseClient<Database>
): Promise<Note[]> => {
  const {data: notes} = await supabase
    .from("notes")
    .select("*")
    .order("id", {ascending: true})

  return notes!
}
