import Heading from "components/Sidebar/Heading"
import Note from "components/Sidebar/Note"
import Profile from "components/Sidebar/Profile"
import Search from "components/Sidebar/Search"

import NewNoteButton from "./NewNoteButton"
import ThemeSwitch from "./ThemeSwitch"

const Sidebar = () => (
  <div className="flex h-screen w-1/4 flex-col justify-between bg-zinc-100">
    <div className="p-8">
      <Profile />
      <Search />

      <hr />
    </div>

    <div className="flex h-full flex-col justify-between overflow-y-auto">
      <div>
        <Heading>Bookmarks</Heading>

        <div>
          <Note document={{name: "Bookmark 1"}} opened />
          <Note document={{name: "Bookmark 2"}} />
        </div>

        <Heading>Notes</Heading>

        <Note document={{name: "Lorem ipsum dolor sit amet."}} />
      </div>
    </div>

    <NewNoteButton />

    <div className="px-8">
      <hr />

      <ThemeSwitch />
    </div>
  </div>
)

export default Sidebar
