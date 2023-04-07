import {SupabaseClient} from "@supabase/auth-helpers-nextjs"

import {Database} from "types/supabase"

export const fetchFirstNoteSlug = async (
  supabase: SupabaseClient<Database>,
  userId: string
): Promise<string> => {
  const {data} = await supabase
    .from("notes")
    .select("titleSlug")
    .eq("userId", userId)
    .limit(1)
    .single()

  return data!.titleSlug
}
