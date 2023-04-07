import {NewNoteButton} from "components/Buttons/NewNoteButton"
import {NoteList} from "components/List/NoteList"
import {UserPanel} from "components/Panel/UserPanel"

export const Sidebar = () => (
  <div className="relative h-full w-[500px] overflow-y-auto scroll-smooth">
    <UserPanel />

    <div className="bg-[#111111f9] p-4">
      <NewNoteButton />

      <NoteList bookmarked />
      <NoteList />
    </div>
  </div>
)
