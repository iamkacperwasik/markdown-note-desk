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

      <div className="flex h-screen items-center justify-center  bg-[#111111f9]">
        <Auth
          supabaseClient={supabase}
          providers={[]}
          appearance={{
            extend: false,
            className: {
              button:
                "block hover:underline w-full text-white text-2xl font-semibold",
              input:
                "text-bold text-md w-full bg-[#111111f9] py-[4px] text-white my-2",
              label: "text-xl font-bold text-white",
              anchor: "block hover:underline text-white",
              message: "mt-4 text-red-200 font-bold text-xl block",
              container: "bg-[#111111f9] p-4",
            },
          }}
        />
      </div>
    </>
  )
}

export default LoginPage
