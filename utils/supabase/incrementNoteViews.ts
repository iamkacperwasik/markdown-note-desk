import {SupabaseClient} from "@supabase/auth-helpers-nextjs"

import {Database} from "types/supabase"

export const incrementNoteViews = (
  supabase: SupabaseClient<Database>,
  userId: string,
  titleSlug: string,
  views: number
) =>
  supabase
    .from("notes")
    .update({
      views: views + 1,
    })
    .eq("titleSlug", titleSlug)
    .eq("userId", userId)
