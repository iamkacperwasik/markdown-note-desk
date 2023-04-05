import {SupabaseClient} from "@supabase/auth-helpers-nextjs"

import {Database} from "types/supabase"

export default async function create_empty_note(
  supabase: SupabaseClient<Database>,
  user_id: string
) {
  await supabase.from("notes").insert({
    title: "Empty note!",
    title_slug: "empty-note",
    user_id: user_id,
    content: "# Empty note",
    is_bookmark: false,
  })
}
