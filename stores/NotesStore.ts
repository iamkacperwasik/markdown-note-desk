import {create} from "zustand"

export type NotesStore = {
  notes: Note[]
  opened_note_id: Note["id"] | null
  notes_paggination_offset: number
  bookmarked_paggination_offset: number

  set_notes_paggination_offset: (offset: number) => void
  set_bookmarked_paggination_offset: (offset: number) => void
  set_notes: (notes: Note[]) => void
  push_notes: (notes: Note[]) => void
}

export const useNotesStore = create<NotesStore>((set, get) => ({
  notes: [],
  opened_note_id: get()?.notes[0]?.id || null,
  bookmarked_paggination_offset: 5,
  notes_paggination_offset: 5,

  set_notes_paggination_offset: (offset) => {
    set({notes_paggination_offset: offset})
  },
  set_bookmarked_paggination_offset: (offset) => {
    set({bookmarked_paggination_offset: offset})
  },
  set_notes: (notes: Note[]) => {
    const opened_note_id = notes[0]?.id || null

    set({
      notes,
      opened_note_id,
      bookmarked_paggination_offset: notes.filter(
        ({is_bookmark}) => is_bookmark
      ).length,
      notes_paggination_offset: notes.filter(({is_bookmark}) => !is_bookmark)
        .length,
    })
  },
  push_notes: (new_notes: Note[]) => {
    set({
      notes: get().notes.concat(new_notes),
    })
  },
}))
