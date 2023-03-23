import Footer from "components/Sidebar/Footer"
import Heading from "components/Sidebar/Heading"
import NewNoteButton from "components/Sidebar/NewNoteButton"
import Note from "components/Sidebar/Note"
import Search from "components/Sidebar/Search"

const Sidebar = () => (
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

      <Footer />
    </div>
  </div>
)

export default Sidebar
