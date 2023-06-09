import {LogoutButton} from "components/Buttons/LogoutButton"

import {useUserStore} from "stores/useUserStore"

export const UserPanel = () => {
  const {email, userId} = useUserStore()

  return (
    <div className="sticky top-0 left-0 mb-4 bg-[#111111f9] p-4">
      <div>
        <h2 className="font-bold uppercase">{email}</h2>
        <span className="text-xs font-extralight text-gray-300">
          ID: {userId}
        </span>
      </div>

      <LogoutButton />
    </div>
  )
}
