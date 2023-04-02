import LogoutButton from "components/Sidebar/Buttons/LogoutButton"
import ThemeSwitch from "components/Sidebar/ThemeSwitch"

const Footer = () => (
  <div className="flex items-center justify-between py-6 text-xl text-zinc-400">
    <ThemeSwitch />

    <LogoutButton />
  </div>
)

export default Footer
