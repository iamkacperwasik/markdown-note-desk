import {useRouter} from "next/router"
import {CiSquarePlus} from "react-icons/ci"

import {useSupabaseClient} from "@supabase/auth-helpers-react"

import {Database} from "types/supabase"

import create_empty_note from "utils/supabase/create_empty_note"
import fetch_note_by_slug from "utils/supabase/fetch_note_by_slug"

export default function NewNoteButton() {
  const supabase = useSupabaseClient<Database>()
  const router = useRouter()

  async function create_new_note() {
    const {
      data: {user},
    } = await supabase.auth.getUser()

    const user_id = user!.id

    const existing_note = await fetch_note_by_slug(
      supabase,
      "empty-note",
      user_id
    )

    if (existing_note) {
      router.replace("/empty-note")

      return
    }

    await create_empty_note(supabase, user_id)

    router.replace("/empty-note")
  }

  return (
    <div
      className="flex cursor-pointer items-center gap-2 py-4"
      onClick={create_new_note}
    >
      <CiSquarePlus className="text-2xl text-sky-600" />

      <p className="text-bold text-md w-full py-[4px] font-medium text-sky-600">
        Add Note
      </p>
    </div>
  )
}
