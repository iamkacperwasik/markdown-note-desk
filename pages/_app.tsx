import {createBrowserSupabaseClient} from "@supabase/auth-helpers-nextjs"
import {Session, SessionContextProvider} from "@supabase/auth-helpers-react"
import type {AppProps} from "next/app"
import {useState} from "react"
import "styles/globals.css"

function MyApp({Component, pageProps}: AppProps<{initialSession: Session}>) {
  const [supabase_client] = useState(() => createBrowserSupabaseClient())

  return (
    <SessionContextProvider
      supabaseClient={supabase_client}
      initialSession={pageProps.initialSession}
    >
      <Component {...pageProps} />
    </SessionContextProvider>
  )
}

export default MyApp
