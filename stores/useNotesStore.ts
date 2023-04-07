import {create} from "zustand"

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
