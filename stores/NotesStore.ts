import {create} from "zustand"

export type NotesStore = {
  notes: Note[]
  opened_note_id: Note["id"] | null
  set_notes: (notes: Note[]) => void
}

export const useNotesStore = create<NotesStore>((set, get) => ({
  notes: [],
  opened_note_id: get()?.notes[0]?.id || null,
  set_notes: (new_notes: Note[]) => {
    const opened_note_id = new_notes[0].id || null

    set({notes: new_notes, opened_note_id})
  },
}))
