import Fuse from "fuse.js"
import {useMemo} from "react"

import NewNoteButton from "components/Sidebar/Buttons/NewNoteButton"
import Footer from "components/Sidebar/Footer"
import Heading from "components/Sidebar/Heading"
import NoteLink from "components/Sidebar/NoteLink"
import Search from "components/Sidebar/Search"

import useNotesStore from "stores/notes_store"

export default function Sidebar() {
  const {notes: all_notes, opened_note_slug, search} = useNotesStore()

  const notes = useMemo(() => {
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

  const bookmarked_notes = notes
    .filter(({is_bookmark}) => is_bookmark)
    .map(({id, title, title_slug}) => (
      <NoteLink
        key={id}
        opened={title_slug === opened_note_slug}
        title={title}
        title_slug={title_slug}
      />
    ))

  const unbookmarked_notes = notes
    .filter(({is_bookmark}) => !is_bookmark)
    .map(({id, title, title_slug}) => (
      <NoteLink
        key={id}
        opened={title_slug === opened_note_slug}
        title={title}
        title_slug={title_slug}
      />
    ))

  return (
    <div className="flex h-screen w-1/4 flex-col justify-between bg-zinc-100">
      <div className="mb-8 px-8">
        <Search />

        <hr />
      </div>

      <div className="flex h-full flex-col justify-between overflow-y-auto">
        <div className="flex flex-col gap-4">
          <div>
            <Heading>Bookmarks</Heading>

            <div>{bookmarked_notes}</div>
          </div>

          <div>
            <Heading>Notes</Heading>

            <div>{unbookmarked_notes}</div>
          </div>
        </div>
      </div>

      <div className="px-8">
        <hr />

        <NewNoteButton />
      </div>

      <div className="px-8">
        <hr />

        <Footer />
      </div>
    </div>
  )
}
