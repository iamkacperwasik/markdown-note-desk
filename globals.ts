import type {Database} from "types/supabase"

export {}

declare global {
  type Note = Database["public"]["Tables"]["notes"]["Row"]
  type NoteState = "VIEWING" | "EDITING" | "DELETING"
}
