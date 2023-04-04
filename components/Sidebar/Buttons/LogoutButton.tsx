import {useRouter} from "next/router"
import {SlLogout} from "react-icons/sl"

import {createBrowserSupabaseClient} from "@supabase/auth-helpers-nextjs"

const LogoutButton = () => {
  const supabaseClient = createBrowserSupabaseClient()
  const router = useRouter()

  const logout = () => {
    supabaseClient.auth.signOut().then(() => {
      router.replace("/login")
    })
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

export default LogoutButton
