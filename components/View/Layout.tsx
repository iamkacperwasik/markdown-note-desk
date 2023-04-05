import {useRouter} from "next/router"
import {useEffect, useState} from "react"
import {When} from "react-if"
import slugify from "slugify"

import {useSupabaseClient} from "@supabase/auth-helpers-react"

import {Database} from "types/supabase"

import DeletingPanel from "components/Panel/DeletingPanel"
import EditingPanel from "components/Panel/EditingPanel"
import Sidebar from "components/Panel/Sidebar"
import ViewingPanel from "components/Panel/ViewingPanel"
import MarkdownPreview from "components/View/MarkdownPreview"

import fetch_note_by_slug from "utils/supabase/fetch_note_by_slug"
import format_markdown from "utils/text/format_markdown"

import useNotesStore from "stores/notes_store"

export default function Layout() {
  const {notes, opened_note_slug} = useNotesStore()
  const supabase = useSupabaseClient<Database>()
  const router = useRouter()

  const note = notes.find(({title_slug}) => title_slug === opened_note_slug)!

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

  return (
    <div className="flex h-screen gap-4 bg-[#111111f9] px-10 pt-10 text-white">
      <Sidebar />

      <div className="relative w-full overflow-y-auto overflow-x-hidden scroll-smooth">
        <When condition={note_state === "VIEWING"}>
          <ViewingPanel
            title={note.title}
            change_state_to_deleting={change_state.to_deleting}
            change_state_to_editing={change_state.to_editing}
          />

          <div className="w-full bg-[#111111f9] p-4">
            <MarkdownPreview content={note_content} />
          </div>
        </When>

        <When condition={note_state === "EDITING"}>
          <EditingPanel
            title={note.title}
            back_to_viewing={back_to_viewing.from_editing}
            format_note={note_actions.format}
            save_note={note_actions.edit}
            is_data_untouched={is_data_untouched}
            set_share_note={set_share_note}
            share_note={share_note}
          />

          <div className="flex w-full gap-8 bg-[#111111f9] p-4">
            <textarea
              className="w-1/2 bg-transparent"
              value={note_content}
              onChange={({target}) => set_note_content(target.value)}
            />

            <MarkdownPreview content={note_content} />
          </div>
        </When>

        <When condition={note_state === "DELETING"}>
          <DeletingPanel
            title={note.title}
            back_to_viewing={back_to_viewing.from_deleting}
            delete_note={note_actions.delete}
          />

          <div className="w-full bg-[#111111f9] p-4">
            <MarkdownPreview content={note_content} />
          </div>
        </When>
      </div>
    </div>
  )
}
