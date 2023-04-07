import type {Database} from "types/supabase"

export {}

declare global {
  type Note = Database["public"]["Tables"]["notes"]["Row"]
  type NoteState = "VIEWING" | "EDITING" | "DELETING"

  type UserStore = {
    userId: string
    email: string

    setUserId: (userId: string) => void
    setEmail: (email: string) => void
  }

  type NotesStore = {
    notes: Note[]
    setNotes: (notes: Note[]) => void
    pushNotes: (notes: Note[]) => void

    openedNoteSlug: string | null
    setOpenedNoteSlug: (slug: string) => void

    search: string | null
    setSearch: (search: string | null) => void
  }
}
