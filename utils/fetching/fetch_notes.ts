import {SupabaseClient} from "@supabase/auth-helpers-nextjs"

import {Database} from "types/supabase"

export default async function fetch_notes(
  supabase: SupabaseClient<Database>,
  user_id: string
): Promise<Note[]> {
  const {data: notes} = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", user_id)
    .order("id", {ascending: true})

  return notes!
}
