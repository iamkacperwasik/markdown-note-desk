import Fuse from "fuse.js"
import {useMemo} from "react"

import NoteLink from "components/List/NoteLink"

import useNotesStore from "stores/notes_store"

type Props = {bookmarked?: boolean}
export default function NoteList({bookmarked = false}: Props) {
  const {notes: all_notes, opened_note_slug, search} = useNotesStore()

  const filtered_notes = useMemo(() => {
    if (search) {
      const options = {
        includeScore: false,
        keys: ["title", "content"],
      }

      const fuse = new Fuse(all_notes, options)

      return fuse.search(search).map((fuse_result) => fuse_result.item)
    }

    return all_notes
  }, [all_notes, search])

  const notes = filtered_notes
    .filter(({is_bookmark}) => is_bookmark === bookmarked)
    .map(({id, title, title_slug}) => (
      <NoteLink
        key={id}
        opened={title_slug === opened_note_slug}
        title={title}
        title_slug={title_slug}
      />
    ))

  const heading = bookmarked ? "BOOKMARKS" : "NOTES"

  return (
    <div className="mb-2">
      <h2 className="font-bold">
        {heading} ({notes.length})
      </h2>

      <div className="flex flex-col gap-[2px]">{notes}</div>
    </div>
  )
}
