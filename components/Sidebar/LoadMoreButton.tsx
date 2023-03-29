import {useSupabaseClient} from "@supabase/auth-helpers-react"
import {FC, useEffect, useState} from "react"
import {Database} from "types/supabase"

import {useNotesStore} from "stores/NotesStore"

const LoadMoreButton: FC<{bookmarked?: boolean}> = ({bookmarked = false}) => {
  const [all_notes_fetched, set_all_notes_fetched] = useState(false)
  const supabase = useSupabaseClient<Database>()
  const {
    notes_pagination_offset,
    bookmarked_pagination_offset,
    set_bookmarked_pagination_offset,
    set_notes_pagination_offset,
    push_notes,
  } = useNotesStore()

  useEffect(() => {
    if (bookmarked && bookmarked_pagination_offset < 5) {
      set_all_notes_fetched(true)

      return
    }

    if (!bookmarked && notes_pagination_offset < 5) {
      set_all_notes_fetched(true)

      return
    }
  }, [bookmarked, bookmarked_pagination_offset, notes_pagination_offset])

  const load_more_posts = async () => {
    if (all_notes_fetched) {
      return
    }

    if (bookmarked) {
      const {data: notes} = await supabase
        .from("notes")
        .select("*")
        .eq("is_bookmark", true)
        .range(bookmarked_pagination_offset, bookmarked_pagination_offset + 1)

      if (notes!.length <= 1) {
        set_all_notes_fetched(true)
      }

      // @ts-ignore
      push_notes(notes)
      set_bookmarked_pagination_offset(bookmarked_pagination_offset + 2)
    } else {
      const {data: notes} = await supabase
        .from("notes")
        .select("*")
        .eq("is_bookmark", false)
        .range(notes_pagination_offset, notes_pagination_offset + 1)

      if (notes!.length <= 1) {
        set_all_notes_fetched(true)
      }

      // @ts-ignore
      push_notes(notes)
      set_notes_pagination_offset(notes_pagination_offset + 2)
    }
  }

  return (
    <div
      className="flex cursor-pointer items-center py-2 px-8"
      onClick={load_more_posts}
    >
      <p
        className={`${
          all_notes_fetched
            ? "cursor-not-allowed select-none text-gray-300"
            : "text-sky-600"
        }
				text-bold text-md w-full py-[4px] font-medium`}
      >
        Load More
      </p>
    </div>
  )
}

export default LoadMoreButton
