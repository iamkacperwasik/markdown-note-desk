import {create} from "zustand"

export type NotesStore = {
  notes: Note[]
  setNotes: (notes: Note[]) => void
  pushNotes: (notes: Note[]) => void

  openedNoteSlug: string | null
  setOpenedNoteSlug: (slug: string) => void

  search: string | null
  setSearch: (search: string | null) => void
}

export const useNotesStore = create<NotesStore>((set) => ({
  notes: [],
  setNotes: (notes: Note[]) => {
    set((state) => ({
      ...state,
      notes,
      paginationOffset: {
        notes: notes.filter(({isBookmark}) => !isBookmark).length,
        bookmarks: notes.filter(({isBookmark}) => isBookmark).length,
      },
    }))
  },
  pushNotes: (newNotes: Note[]) => {
    set((state) => ({
      ...state,
      notes: state.notes.concat(newNotes),
    }))
  },

  openedNoteSlug: null,
  setOpenedNoteSlug: (slug) => {
    set((state) => ({
      ...state,
      openedNoteSlug: slug,
    }))
  },

  search: null,
  setSearch: (search) => {
    set((state) => ({
      ...state,
      search,
    }))
  },
}))
