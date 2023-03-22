import Heading from "components/Sidebar/Heading"
import NewNoteButton from "components/Sidebar/NewNoteButton"
import Note from "components/Sidebar/Note"
import Profile from "components/Sidebar/Profile"
import Search from "components/Sidebar/Search"
import ThemeSwitch from "components/Sidebar/ThemeSwitch"

const Sidebar = () => (
  <div className="flex h-screen w-1/4 flex-col justify-between bg-zinc-100">
    <div className="p-8">
      <Profile />
      <Search />

      <hr />
    </div>

    <div className="flex h-full flex-col justify-between overflow-y-auto">
      <div className="flex flex-col gap-4">
        <div>
          <Heading>Bookmarks</Heading>

          <div>
            <Note document={{name: "Bookmark 1"}} opened />
            <Note document={{name: "Bookmark 2"}} />
          </div>
        </div>

        <div>
          <Heading>Notes</Heading>

          <Note document={{name: "Lorem ipsum dolor sit amet."}} />
        </div>
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
