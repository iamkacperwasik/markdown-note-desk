import {createServerSupabaseClient} from "@supabase/auth-helpers-nextjs"
import type {GetServerSideProps, InferGetServerSidePropsType} from "next"
import Head from "next/head"
import {useEffect} from "react"
import {Database} from "types/supabase"
import {fetchNotes} from "utils/fetchNotes"

import Sidebar from "components/Sidebar"

import {useNotesStore} from "stores/NotesStore"

const Main = ({
  notes,
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
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<{
  notes: Note[]
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

  const notes = await fetchNotes(supabase)

  return {
    props: {
      notes,
    },
  }
}

export default Main
