import {RiMoonFill, RiSunFill} from "react-icons/ri"

const ThemeSwitch = () => (
  <div className="flex gap-4 py-6 text-xl text-zinc-400">
    <RiSunFill className="cursor-pointer text-sky-600" />

    <RiMoonFill className="cursor-pointer" />
  </div>
)

export default ThemeSwitch
