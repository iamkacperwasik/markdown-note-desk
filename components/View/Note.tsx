/* eslint-disable react/no-children-prop */
import {useSupabaseClient} from "@supabase/auth-helpers-react"
import {useRouter} from "next/router"
import {FC, useEffect, useState} from "react"
import {When} from "react-if"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import slugify from "slugify"
import {Database} from "types/supabase"
import {fetch_note_by_slug} from "utils/fetching/fetch_note_by_slug"
import {format_markdown} from "utils/text/format_markdown"

type NoteState = "VIEWING" | "EDITING" | "DELETING"

const Note: FC<{
  document: Note
}> = ({document}) => {
  const supabaseClient = useSupabaseClient<Database>()
  const router = useRouter()

  const [note_state, set_note_state] = useState<NoteState>("VIEWING")
  const [note_content, set_note_content] = useState<string>(
    document.content || ""
  )
  const [new_title, set_new_title] = useState(document.title)
  const [share_note, set_share_note] = useState(document.shared)

  const is_content_untouched = note_content === document.content
  const is_share_note_untouched = share_note === document.shared

  useEffect(() => {
    const formatted_content = format_markdown(document.content || "")

    set_note_content(formatted_content)
    set_new_title(document.title)
    set_share_note(document.shared)
    set_note_state("VIEWING")
  }, [document.content, document.title, document.shared])

  return (
    <div className="h-screen w-full overflow-auto px-4">
      <When condition={note_state === "VIEWING"}>
        <h1>{document.title}</h1>
        <ReactMarkdown children={note_content} remarkPlugins={[remarkGfm]} />

        <button onClick={() => set_note_state("EDITING")}>Edit</button>
        <button onClick={() => set_note_state("DELETING")}>Delete</button>
      </When>

      <When condition={note_state === "EDITING"}>
        <input
          type="text"
          value={new_title}
          onChange={({target}) => {
            set_new_title(target.value)
          }}
        />
        <div className="flex h-full gap-4">
          <div className="flex w-1/2 flex-col">
            <textarea
              className="h-2/3 resize-none py-10"
              onChange={({target}) => set_note_content(target.value)}
              value={note_content}
            />

            <label>
              <p>Share this note?</p>
              <input
                type="checkbox"
                checked={share_note}
                onChange={({target}) => set_share_note(target.checked)}
              />
              <span>Save to see changes</span>
            </label>

            <button
              onClick={() => {
                const formatted_content = format_markdown(note_content)

                set_note_content(formatted_content)
              }}
            >
              Format
            </button>

            <button
              disabled={
                is_content_untouched &&
                new_title === document.title &&
                is_share_note_untouched
              }
              onClick={async () => {
                if (new_title === "") return

                const title_changed = new_title !== document.title
                const new_title_slug = slugify(new_title, {
                  replacement: "-",
                  lower: true,
                  strict: true,
                  trim: true,
                })

                if (title_changed) {
                  const existing_note = await fetch_note_by_slug(
                    supabaseClient,
                    new_title_slug
                  )

                  if (existing_note) {
                    return
                  }
                }

                if (
                  !is_content_untouched ||
                  title_changed ||
                  !is_share_note_untouched
                ) {
                  const formatted_content = format_markdown(note_content)

                  await supabaseClient
                    .from("notes")
                    .update({
                      content: formatted_content,
                      title: new_title,
                      title_slug: new_title_slug,
                      shared: share_note,
                    })
                    .eq("id", document.id)

                  document.content = note_content
                  document.title = new_title
                  document.title_slug = new_title_slug
                  document.shared = share_note

                  if (title_changed) {
                    router.replace(new_title_slug)
                  } else {
                    set_note_state("VIEWING")
                  }
                }
              }}
            >
              Save
            </button>
            <button
              onClick={() => {
                set_share_note(document.shared)
                set_note_content(document.content!)
                set_note_state("VIEWING")
              }}
            >
              Cancel editing
            </button>
          </div>

          <ReactMarkdown
            children={note_content}
            remarkPlugins={[remarkGfm]}
            className="w-1/2"
          />
        </div>
      </When>
      <When condition={note_state === "DELETING"}>
        <h1>{document.title}</h1>
        <button
          onClick={() => {
            supabaseClient
              .from("notes")
              .delete()
              .eq("id", document.id)
              .then(() => {
                console.log("deleted", document.id)
                router.replace("/")
              })
          }}
        >
          Delete
        </button>
        <button
          onClick={() => {
            set_note_state("VIEWING")
          }}
        >
          Cancel
        </button>
      </When>
    </div>
  )
}

export default Note
