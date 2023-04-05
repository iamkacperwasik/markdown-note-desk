import {debounce} from "debounce"
import {ChangeEvent, useEffect, useMemo} from "react"
import {MdSearch} from "react-icons/md"

import useNotesStore from "stores/notes_store"

const DEBOUNCE_INTERVAL = 300

export default function Search() {
  const {set_search} = useNotesStore()

  const debounced_set_search = useMemo(() => {
    return debounce(({target}: ChangeEvent<HTMLInputElement>) => {
      const new_value = target.value

      if (new_value !== "") {
        set_search(target.value)
      } else {
        set_search(null)
      }
    }, DEBOUNCE_INTERVAL)
  }, [set_search])

  useEffect(() => {
    return () => {
      debounced_set_search.clear()
    }
  })

  return (
    <label className="mt-4 flex items-center gap-4 py-4">
      <MdSearch className="w-min text-2xl text-zinc-400" />

      <input
        type="text"
        placeholder="Search"
        className="text-bold text-md w-full bg-zinc-100 py-[4px]"
        onChange={debounced_set_search}
      />
    </label>
  )
}
