import {useRouter} from "next/router"

import {useSupabaseClient} from "@supabase/auth-helpers-react"

export default function LogoutButton() {
  const router = useRouter()
  const supabase = useSupabaseClient()

  async function logout() {
    await supabase.auth.signOut()

    router.replace("/login")
  }

  return (
    <button className="text-sm font-bold underline" onClick={logout}>
      Logout
    </button>
  )
}
