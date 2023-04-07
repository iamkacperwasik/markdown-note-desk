import {GetServerSideProps} from "next"
import Head from "next/head"
import {useRouter} from "next/router"
import {useEffect} from "react"

import {createServerSupabaseClient} from "@supabase/auth-helpers-nextjs"
import {useSupabaseClient} from "@supabase/auth-helpers-react"
import {Auth} from "@supabase/auth-ui-react"

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx)

  const {
    data: {session},
  } = await supabase.auth.getSession()

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return {props: {}}
}

const LoginPage = () => {
  const supabase = useSupabaseClient()
  const router = useRouter()

  useEffect(() => {
    supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") router.reload()
    })
  }, [router, supabase.auth])

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>

      <div className="flex h-screen items-center justify-center bg-zinc-100">
        <Auth
          supabaseClient={supabase}
          providers={[]}
          appearance={{
            extend: false,
            className: {
              button:
                "text-2xl my-2 w-full py-[4px] text-left font-bold w-max uppercase text-sky-600 mt-4",
              input: "text-bold bg-zinc-100 text-md w-full py-[8px]",
              label: "text-xl font-bold uppercase text-zinc-400",
              anchor: "block text-left text-sky-600 ",
              message: "mt-4 text-black font-bold text-xl block",
            },
          }}
        />
      </div>
    </>
  )
}

export default LoginPage
