import Avatar from "components/Sidebar/Avatar"

const Profile = () => (
  <div className="flex h-[64px] items-end gap-4">
    <Avatar />

    <div className="flex flex-col">
      <h2 className="text-2xl font-medium">Kacper Wąsik</h2>
      <p className="font-light">kacper@wasik.me</p>
    </div>
  </div>
)

export default Profile
