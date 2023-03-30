import {createServerSupabaseClient} from "@supabase/auth-helpers-nextjs"
import type {GetServerSideProps, InferGetServerSidePropsType} from "next"
import Head from "next/head"
import {useEffect} from "react"
import {Database} from "types/supabase"
import {fetch_notes} from "utils/fetch_notes"

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

export const getServerSideProps: GetServerSideProps<
  {
    notes: Note[]
    id: string
  },
  {
    id: string
  }
> = async (ctx) => {
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
  const notes = await fetch_notes(supabase)

  return {
    props: {
      notes,
      id,
    },
  }
}

export default View
