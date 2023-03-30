import {useSupabaseClient} from "@supabase/auth-helpers-react"
import {FC, useEffect, useState} from "react"
import {Database} from "types/supabase"

import {useNotesStore} from "stores/NotesStore"

const LoadMoreButton: FC<{bookmarked?: boolean}> = ({bookmarked = false}) => {
  const [all_notes_fetched, set_all_notes_fetched] = useState(false)
  const supabase = useSupabaseClient<Database>()
  const {pagination_offset, set_pagination_offset, push_notes} = useNotesStore()

  const offset_for = bookmarked ? "bookmarks" : "notes"

  useEffect(() => {
    if (
      (bookmarked && pagination_offset.bookmarks < 5) ||
      (!bookmarked && pagination_offset.notes < 5)
    ) {
      set_all_notes_fetched(true)

      return
    }
  }, [bookmarked, pagination_offset.bookmarks, pagination_offset.notes])

  useEffect(() => {
    supabase
      .from("notes")
      .select("*", {count: "exact", head: true})
      .eq("is_bookmark", bookmarked)
      .then(({count: notes_count}) => {
        if (notes_count === pagination_offset[offset_for]) {
          set_all_notes_fetched(true)

          return
        }
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const load_more_posts = async () => {
    if (all_notes_fetched) {
      return
    }

    const {data: notes} = await supabase
      .from("notes")
      .select("*")
      .eq("is_bookmark", bookmarked)
      .range(pagination_offset[offset_for], pagination_offset[offset_for] + 1)

    if (notes!.length <= 1) {
      set_all_notes_fetched(true)
    }

    push_notes(notes!)
    set_pagination_offset(offset_for, pagination_offset[offset_for] + 2)
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
