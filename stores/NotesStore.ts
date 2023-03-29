import {create} from "zustand"

export type NotesStore = {
  notes: Note[]
  opened_note_id: Note["id"] | null
  notes_pagination_offset: number
  bookmarked_pagination_offset: number

  set_notes_pagination_offset: (offset: number) => void
  set_bookmarked_pagination_offset: (offset: number) => void
  set_notes: (notes: Note[]) => void
  push_notes: (notes: Note[]) => void
}

export const useNotesStore = create<NotesStore>((set, get) => ({
  notes: [],
  opened_note_id: get()?.notes[0]?.id || null,
  bookmarked_pagination_offset: 5,
  notes_pagination_offset: 5,

  set_notes_pagination_offset: (offset) => {
    set({notes_pagination_offset: offset})
  },
  set_bookmarked_pagination_offset: (offset) => {
    set({bookmarked_pagination_offset: offset})
  },
  set_notes: (notes: Note[]) => {
    const opened_note_id = notes[0]?.id || null

    set({
      notes,
      opened_note_id,
      bookmarked_pagination_offset: notes.filter(({is_bookmark}) => is_bookmark)
        .length,
      notes_pagination_offset: notes.filter(({is_bookmark}) => !is_bookmark)
        .length,
    })
  },
  push_notes: (new_notes: Note[]) => {
    set({
      notes: get().notes.concat(new_notes),
    })
  },
}))
