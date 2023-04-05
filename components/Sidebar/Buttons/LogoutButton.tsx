import {useRouter} from "next/router"
import {SlLogout} from "react-icons/sl"

import {useSupabaseClient} from "@supabase/auth-helpers-react"

export default function LogoutButton() {
  const router = useRouter()
  const supabase = useSupabaseClient()

  async function logout() {
    await supabase.auth.signOut()

    router.replace("/login")
  }

  return (
    <div className="flex cursor-pointer items-center gap-2">
      <SlLogout className="text-sky-600" />

      <p className="w-full py-[4px] font-medium text-sky-600" onClick={logout}>
        Logout
      </p>
    </div>
  )
}
