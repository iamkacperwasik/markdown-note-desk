import {SupabaseClient} from "@supabase/auth-helpers-nextjs"
import {Database} from "types/supabase"

export const fetch_first_note_slug = async (
  supabase: SupabaseClient<Database>,
  user_id: string
): Promise<string> => {
  const {data} = await supabase
    .from("notes")
    .select("title_slug")
    .eq("user_id", user_id)
    .limit(1)
    .single()

  return data!.title_slug
}
