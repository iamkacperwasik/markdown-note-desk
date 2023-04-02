/* eslint-disable react/no-children-prop */
import {useSupabaseClient} from "@supabase/auth-helpers-react"
import {useRouter} from "next/router"
import {FC, useEffect, useState} from "react"
import {When} from "react-if"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import {Database} from "types/supabase"
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

  const is_content_untouched = note_content === document.content

  useEffect(() => {
    const formatted_content = format_markdown(document.content || "")

    set_note_content(formatted_content)
    set_note_state("VIEWING")
  }, [document.content])

  return (
    <div className="h-screen w-full overflow-auto px-4">
      <h1>{document.title}</h1>

      <When condition={note_state === "VIEWING"}>
        <ReactMarkdown children={note_content} remarkPlugins={[remarkGfm]} />

        <button onClick={() => set_note_state("EDITING")}>Edit</button>
        <button onClick={() => set_note_state("DELETING")}>Delete</button>
      </When>

      <When condition={note_state === "EDITING"}>
        <div className="flex h-full gap-4">
          <div className="flex w-1/2 flex-col">
            <textarea
              className="h-2/3 resize-none py-10"
              onChange={({target}) => set_note_content(target.value)}
              value={note_content}
            />

            <button
              onClick={() => {
                const formatted_content = format_markdown(note_content)

                set_note_content(formatted_content)
              }}
            >
              Format
            </button>

            <button
              disabled={is_content_untouched}
              onClick={() => {
                if (!is_content_untouched) {
                  const formatted_content = format_markdown(note_content)

                  supabaseClient
                    .from("notes")
                    .update({content: formatted_content})
                    .eq("id", document.id)
                    .then(() => {
                      console.log("updated", document.id)

                      document.content = note_content
                      set_note_state("VIEWING")
                    })
                }
              }}
            >
              Save
            </button>
            <button
              onClick={() => {
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