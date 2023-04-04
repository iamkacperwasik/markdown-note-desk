import Fuse from "fuse.js"
import {useMemo} from "react"

import NewNoteButton from "components/Sidebar/Buttons/NewNoteButton"
import Footer from "components/Sidebar/Footer"
import Heading from "components/Sidebar/Heading"
import NoteLink from "components/Sidebar/NoteLink"
import Search from "components/Sidebar/Search"

import useNotesStore from "stores/NotesStore"

export default function Sidebar() {
  const {notes, opened_note_slug, search} = useNotesStore()

  const filtered_notes = useMemo(() => {
    if (search) {
      const options = {
        includeScore: false,
        keys: ["title", "content"],
      }

      const fuse = new Fuse(notes, options)

      const result = fuse.search(search)

      return result.map((v) => v.item)
    }

    return notes
  }, [notes, search])

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

            <div>
              {filtered_notes
                .filter(({is_bookmark}) => is_bookmark)
                .map((note) => (
                  <NoteLink
                    key={note.id}
                    document={note}
                    opened={note.title_slug === opened_note_slug}
                  />
                ))}
            </div>
          </div>

          <div>
            <Heading>Notes</Heading>

            {filtered_notes
              .filter(({is_bookmark}) => !is_bookmark)
              .map((note) => (
                <NoteLink
                  key={note.id}
                  document={note}
                  opened={note.title_slug === opened_note_slug}
                />
              ))}
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
