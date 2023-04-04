import {useRouter} from "next/router"
import {CiSquarePlus} from "react-icons/ci"

import {useSupabaseClient} from "@supabase/auth-helpers-react"

import {Database} from "types/supabase"

import fetch_note_by_slug from "utils/fetching/fetch_note_by_slug"

export default function NewNoteButton() {
  const supabase = useSupabaseClient<Database>()
  const router = useRouter()

  return (
    <div
      className="flex cursor-pointer items-center gap-2 py-4"
      onClick={async () => {
        const {
          data: {user},
        } = await supabase.auth.getUser()

        const existing_note = await fetch_note_by_slug(
          supabase,
          "empty-note",
          user!.id
        )

        if (existing_note) {
          router.replace("/empty-note")

          return
        }

        await supabase.from("notes").insert({
          title: "Empty note!",
          title_slug: "empty-note",
          user_id: user!.id,
          content: "# Empty note",
          is_bookmark: false,
        })

        router.replace("/empty-note")
      }}
    >
      <CiSquarePlus className="text-2xl text-sky-600" />

      <p className="text-bold text-md w-full py-[4px] font-medium text-sky-600">
        Add Note
      </p>
    </div>
  )
}
