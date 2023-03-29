import {create} from "zustand"

export type NotesStore = {
  notes: Note[]
  opened_note_id: Note["id"] | null
  pagination_offset: {
    bookmarks: number
    notes: number
  }
  set_notes: (notes: Note[]) => void
  push_notes: (notes: Note[]) => void
  set_pagination_offset: (
    offset_for: keyof NotesStore["pagination_offset"],
    offset: number
  ) => void
}

export const useNotesStore = create<NotesStore>((set, get) => ({
  notes: [],
  opened_note_id: get()?.notes[0]?.id || null,
  pagination_offset: {
    notes: 5,
    bookmarks: 5,
  },
  set_pagination_offset: (offset_for, offset) => {
    set((state) => ({
      ...state,
      pagination_offset: {
        ...state.pagination_offset,
        [offset_for]: offset,
      },
    }))
  },
  set_notes: (notes: Note[]) => {
    const opened_note_id = notes[0]?.id || null

    set({
      notes,
      opened_note_id,
      pagination_offset: {
        notes: notes.filter(({is_bookmark}) => !is_bookmark).length,
        bookmarks: notes.filter(({is_bookmark}) => is_bookmark).length,
      },
    })
  },
  push_notes: (new_notes: Note[]) => {
    set((state) => ({
      ...state,
      notes: state.notes.concat(new_notes),
    }))
  },
}))
