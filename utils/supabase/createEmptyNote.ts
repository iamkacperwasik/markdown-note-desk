import {SupabaseClient} from "@supabase/auth-helpers-nextjs"

import {Database} from "types/supabase"

export const createEmptyNote = (
  supabase: SupabaseClient<Database>,
  userId: string
) =>
  supabase.from("notes").insert({
    title: "Empty note!",
    titleSlug: "empty-note",
    userId: userId,
    content: "# Empty note",
    isBookmark: false,
  })
