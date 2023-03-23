import {createServerSupabaseClient} from "@supabase/auth-helpers-nextjs"
import type {GetServerSideProps, InferGetServerSidePropsType} from "next"
import Head from "next/head"

import Sidebar from "components/Sidebar"

const Main = ({}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>

      <div className="flex h-screen select-text bg-zinc-50 text-slate-900">
        <Sidebar />
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx)

  const {
    data: {session},
  } = await supabase.auth.getSession()

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }

  // fetch all notes

  return {
    props: {},
  }
}

export default Main
