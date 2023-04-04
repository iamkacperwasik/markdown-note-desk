import {create} from "zustand"

export type NotesStore = {
  notes: Note[]
  set_notes: (notes: Note[]) => void
  push_notes: (notes: Note[]) => void

  opened_note_slug: Note["title_slug"] | null
  set_opened_note_slug: (slug: Note["title_slug"]) => void

  search: string | null
  set_search: (search: NotesStore["search"]) => void
}

export default create<NotesStore>((set) => ({
  notes: [],
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
  push_notes: (new_notes: Note[]) => {
    set((state) => ({
      ...state,
      notes: state.notes.concat(new_notes),
    }))
  },

  opened_note_slug: null,
  set_opened_note_slug: (slug) => {
    set((state) => ({
      ...state,
      opened_note_slug: slug,
    }))
  },

  search: null,
  set_search: (search) => {
    set((state) => ({
      ...state,
      search,
    }))
  },
}))
