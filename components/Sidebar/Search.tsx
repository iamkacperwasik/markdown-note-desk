import {MdSearch} from "react-icons/md"

const Search = () => (
  <label className="mt-4 flex items-center gap-4 py-4">
    {/* Icon */}
    <MdSearch className="w-min text-2xl text-zinc-400" />

    <input
      type="text"
      placeholder="Search"
      className="text-bold text-md w-full bg-zinc-100 py-[4px] text-zinc-100"
    />
  </label>
)

export default Search
