import {SupabaseClient} from "@supabase/auth-helpers-nextjs"

import {Database} from "types/supabase"

export default async function increment_note_views(
  supabase: SupabaseClient<Database>,
  user_id: string,
  title_slug: string,
  current_views: number
) {
  await supabase
    .from("notes")
    .update({
      views: current_views + 1,
    })
    .eq("title_slug", title_slug)
    .eq("user_id", user_id)
}
