import {debounce} from "debounce"
import {ChangeEvent, useEffect, useMemo} from "react"
import {MdSearch} from "react-icons/md"

import {useNotesStore} from "stores/useNotesStore"

const DEBOUNCE_INTERVAL = 300

export const Search = () => {
  const {setSearch} = useNotesStore()

  const debouncedSetSearch = useMemo(() => {
    return debounce(({target}: ChangeEvent<HTMLInputElement>) => {
      const newValue = target.value

      if (newValue !== "") {
        setSearch(target.value)
      } else {
        setSearch(null)
      }
    }, DEBOUNCE_INTERVAL)
  }, [setSearch])

  useEffect(() => {
    return () => {
      debouncedSetSearch.clear()
    }
  })

  return (
    <div className="mb-4 bg-[#111111f9] p-4">
      <label className="flex items-center gap-4">
        <MdSearch className="w-min text-2xl text-zinc-400" />

        <input
          type="text"
          placeholder="Search"
          className="text-bold text-md w-full bg-[#111111f9]  py-[4px] text-white"
          onChange={debouncedSetSearch}
        />
      </label>
    </div>
  )
}
