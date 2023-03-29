import {createServerSupabaseClient} from "@supabase/auth-helpers-nextjs"
import type {GetServerSideProps, InferGetServerSidePropsType} from "next"
import Head from "next/head"
import {useEffect} from "react"
import {Database} from "types/supabase"

import Sidebar from "components/Sidebar"

import {useNotesStore} from "stores/NotesStore"

const View = ({
  notes,
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {set_notes} = useNotesStore()

  useEffect(() => {
    set_notes(notes)
  }, [notes, set_notes])

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>

      <div className="flex h-screen select-text bg-zinc-50 text-slate-900">
        <Sidebar />

        <div>
          <h1>View: {id}</h1>
        </div>
      </div>
    </>
  )
}

// @ts-ignore
export const getServerSideProps: GetServerSideProps<{
  notes: Note[]
  id: string
}> = async (ctx) => {
  const supabase = createServerSupabaseClient<Database>(ctx)

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

  const {id} = ctx.params!

  console.log({id})

  const {data: bookmarks} = await supabase
    .from("notes")
    .select("*")
    .eq("is_bookmark", true)
    .range(0, 4)

  const {data: notes} = await supabase
    .from("notes")
    .select("*")
    .eq("is_bookmark", false)
    .range(0, 4)

  return {
    props: {
      notes: [bookmarks!, notes!].flat(),
      id,
    },
  }
}

export default View
