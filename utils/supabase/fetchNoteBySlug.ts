import {SupabaseClient} from "@supabase/auth-helpers-nextjs"

import {Database} from "types/supabase"

export const fetchNoteBySlug = async (
  supabase: SupabaseClient<Database>,
  titleSlug: string,
  userId: string
): Promise<Note | null> => {
  const {data: note} = await supabase
    .from("notes")
    .select("*")
    .eq("titleSlug", titleSlug)
    .eq("userId", userId)
    .single()

  return note
}
