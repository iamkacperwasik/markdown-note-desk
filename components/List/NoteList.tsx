import Fuse from "fuse.js"
import {useMemo} from "react"

import {NoteLink} from "components/List/NoteLink"

import {useNotesStore} from "stores/useNotesStore"

type Props = {bookmarked?: boolean}
export const NoteList = ({bookmarked = false}: Props) => {
  const {notes: allNotes, openedNoteSlug, search} = useNotesStore()

  const filteredNotes = useMemo(() => {
    if (search) {
      const options = {
        includeScore: false,
        keys: ["title", "content"],
      }

      const fuse = new Fuse(allNotes, options)

      return fuse.search(search).map((fuseResult) => fuseResult.item)
    }

    return allNotes
  }, [allNotes, search])

  const notes = filteredNotes
    .filter(({isBookmark}) => isBookmark === bookmarked)
    .map(({id, title, titleSlug}) => (
      <NoteLink
        key={id}
        opened={titleSlug === openedNoteSlug}
        title={title}
        titleSlug={titleSlug}
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
