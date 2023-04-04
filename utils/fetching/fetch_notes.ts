import {SupabaseClient} from "@supabase/auth-helpers-nextjs"

import {Database} from "types/supabase"

export const fetch_notes = async (
  supabase: SupabaseClient<Database>,
  user_id: string
): Promise<Note[]> => {
  const {data: notes} = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", user_id)
    .order("id", {ascending: true})

  return notes!
}
