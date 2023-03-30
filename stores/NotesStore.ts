import {create} from "zustand"

export type NotesStore = {
  notes: Note[]
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

  opened_note_slug: Note["title_slug"] | null
  set_opened_note_slug: (slug: Note["title_slug"]) => void
}

export const useNotesStore = create<NotesStore>((set) => ({
  notes: [],
  pagination_offset: {
    notes: 5,
    bookmarks: 5,
  },
  opened_note_slug: null,
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
    set((state) => ({
      ...state,
      notes,
      pagination_offset: {
        notes: notes.filter(({is_bookmark}) => !is_bookmark).length,
        bookmarks: notes.filter(({is_bookmark}) => is_bookmark).length,
      },
    }))
  },
  set_opened_note_slug: (slug) => {
    set((state) => ({
      ...state,
      opened_note_slug: slug,
    }))
  },
  push_notes: (new_notes: Note[]) => {
    set((state) => ({
      ...state,
      notes: state.notes.concat(new_notes),
    }))
  },
}))
