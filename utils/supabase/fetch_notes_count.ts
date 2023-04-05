import {SupabaseClient} from "@supabase/auth-helpers-nextjs"

import {Database} from "types/supabase"

export default async function fetch_notes_count(
  supabase: SupabaseClient<Database>,
  user_id: string
): Promise<number> {
  const {data: notes_count} = await supabase
    .from("notes")
    .select("*", {count: "exact", head: true})
    .eq("user_id", user_id)

  //@ts-ignore
  return notes_count
}
