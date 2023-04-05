import NewNoteButton from "components/Buttons/NewNoteButton"
import BookmarkedNoteList from "components/List/BookmarkedNoteList copy"
import NoteList from "components/List/NoteList"
import UserPanel from "components/Panel/UserPanel"

export default function Sidebar() {
  return (
    <div className="relative h-full w-[500px] overflow-y-auto scroll-smooth">
      <UserPanel />

      <div className="bg-[#111111f9] p-4">
        <NewNoteButton />

        <BookmarkedNoteList />
        <NoteList />
      </div>
    </div>
  )
}
