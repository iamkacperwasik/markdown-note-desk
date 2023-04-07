import {useRouter} from "next/router"

import {useSupabaseClient} from "@supabase/auth-helpers-react"

import {Database} from "types/supabase"

import {createEmptyNote} from "utils/supabase/createEmptyNote"
import {fetchNoteBySlug} from "utils/supabase/fetchNoteBySlug"

export const NewNoteButton = () => {
  const supabase = useSupabaseClient<Database>()
  const router = useRouter()

  async function createNewNote() {
    const {
      data: {user},
    } = await supabase.auth.getUser()

    const userId = user!.id

    const existingNote = await fetchNoteBySlug(supabase, "empty-note", userId)

    if (!existingNote) {
      await createEmptyNote(supabase, userId)
    }

    router.replace("/empty-note")
  }

  return (
    <button
      className="mb-4 flex items-center gap-2 hover:underline"
      onClick={createNewNote}
    >
      New Note
    </button>
  )
}
