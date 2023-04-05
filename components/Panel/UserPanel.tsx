import LogoutButton from "components/Buttons/LogoutButton"

export default function UserPanel() {
  return (
    <div className="sticky top-0 left-0 mb-4 bg-[#111111f9] p-4">
      <div>
        <h2 className="font-bold uppercase">Kacper@wasik.me</h2>
        <span className="text-xs font-extralight text-gray-300">
          ID: 7c7297f8-6bf1-42fc-a76b-e26e9caa5222
        </span>
      </div>

      <LogoutButton />
    </div>
  )
}
