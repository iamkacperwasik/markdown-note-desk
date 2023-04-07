import {SupabaseClient} from "@supabase/auth-helpers-nextjs"

import {Database} from "types/supabase"

export const fetchNotesCount = async (
  supabase: SupabaseClient<Database>,
  userId: string
): Promise<number> => {
  const {count: notesCount} = await supabase
    .from("notes")
    .select("*", {count: "exact", head: true})
    .eq("userId", userId)

  return notesCount!
}
