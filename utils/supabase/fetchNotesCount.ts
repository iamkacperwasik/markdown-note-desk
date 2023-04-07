import {SupabaseClient} from "@supabase/auth-helpers-nextjs"

import {Database} from "types/supabase"

export const fetchNotesCount = async (
  supabase: SupabaseClient<Database>,
  userId: string
): Promise<number> => {
  const {data: notesCount} = await supabase
    .from("notes")
    .select("*", {count: "exact", head: true})
    .eq("userId", userId)

  //@ts-ignore
  return notesCount
}
