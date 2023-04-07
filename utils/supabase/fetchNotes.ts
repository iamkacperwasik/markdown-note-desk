import {SupabaseClient} from "@supabase/auth-helpers-nextjs"

import {Database} from "types/supabase"

export const fetchNotes = async (
  supabase: SupabaseClient<Database>,
  userId: string
): Promise<Note[]> => {
  const {data: notes} = await supabase
    .from("notes")
    .select("*")
    .eq("userId", userId)
    .order("id", {ascending: true})

  return notes!
}
