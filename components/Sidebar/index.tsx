import Footer from "components/Sidebar/Footer"
import Heading from "components/Sidebar/Heading"
import LoadMoreButton from "components/Sidebar/LoadMoreButton"
import NewNoteButton from "components/Sidebar/NewNoteButton"
import NoteLink from "components/Sidebar/NoteLink"
import Search from "components/Sidebar/Search"

import {useNotesStore} from "stores/NotesStore"

const Sidebar = () => {
  const {notes, opened_note_slug} = useNotesStore()

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
              {notes
                .filter(({is_bookmark}) => is_bookmark)
                .map((note) => (
                  <NoteLink
                    key={note.id}
                    document={note}
                    opened={note.title_slug === opened_note_slug}
                  />
                ))}
            </div>

            <LoadMoreButton bookmarked />
          </div>

          <div>
            <Heading>Notes</Heading>

            {notes
              .filter(({is_bookmark}) => !is_bookmark)
              .map((note) => (
                <NoteLink
                  key={note.id}
                  document={note}
                  opened={note.title_slug === opened_note_slug}
                />
              ))}

            <LoadMoreButton />
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

export default Sidebar
