/* eslint-disable react-hooks/rules-of-hooks */
import {useRouter} from "next/router"
import {useEffect, useState} from "react"
import slugify from "slugify"

import {useSupabaseClient} from "@supabase/auth-helpers-react"

import {Database} from "types/supabase"

import fetch_note_by_slug from "utils/supabase/fetch_note_by_slug"
import format_markdown from "utils/text/format_markdown"

export default function use_note(note: Note) {
  const supabase = useSupabaseClient<Database>()
  const router = useRouter()

  const [note_state, set_note_state] = useState<NoteState>("VIEWING")
  const [note_content, set_note_content] = useState<string>(note.content || "")
  const [new_title, set_new_title] = useState(note.title)
  const [share_note, set_share_note] = useState(note.shared)

  const is_untouched = {
    content: note_content === note.content,
    share: share_note === note.shared,
  }

  useEffect(() => {
    const formatted_content = format_markdown(note.content || "")

    set_note_content(formatted_content)
    set_new_title(note.title)
    set_share_note(note.shared)
    change_state.to_viewing()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note.content, note.title, note.shared])

  const change_state = {
    to_viewing: function () {
      set_note_state("VIEWING")
    },
    to_editing: function () {
      set_note_state("EDITING")
    },
    to_deleting: function () {
      set_note_state("DELETING")
    },
  }

  const back_to_viewing = {
    from_editing: function () {
      set_share_note(note.shared)
      set_note_content(note.content!)

      change_state.to_viewing()
    },
    from_deleting: function () {
      change_state.to_viewing()
    },
  }

  const note_actions = {
    format: function () {
      const formatted_content = format_markdown(note_content)

      set_note_content(formatted_content)
    },
    edit: async function () {
      if (new_title === "") return

      const title_changed = new_title !== note.title
      const new_title_slug = slugify(new_title, {
        replacement: "-",
        lower: true,
        strict: true,
        trim: true,
      })

      const user = await supabase.auth.getUser()

      if (title_changed) {
        const existing_note = await fetch_note_by_slug(
          supabase,
          new_title_slug,
          user.data.user!.id
        )

        if (existing_note) {
          return
        }
      }

      if (title_changed || !is_untouched.content || !is_untouched.share) {
        const formatted_content = format_markdown(note_content)

        await supabase
          .from("notes")
          .update({
            content: formatted_content,
            title: new_title,
            title_slug: new_title_slug,
            shared: share_note,
          })
          .eq("id", note.id)

        note.content = note_content
        note.title = new_title
        note.title_slug = new_title_slug
        note.shared = share_note

        if (title_changed) {
          router.replace(new_title_slug)
        } else {
          set_note_state("VIEWING")
        }
      }
    },
    delete: async function () {
      await supabase.from("notes").delete().eq("id", note.id)

      router.replace("/")
    },
  }

  const is_data_untouched =
    new_title === note.title && is_untouched.content && is_untouched.share

  return {
    data: {
      is_data_untouched,
      note_state,
      note_content,
      share_note,
    },
    methods: {
      note_actions,
      back_to_viewing,
      change_state,
      set_note_content,
      set_share_note,
    },
  }
}
