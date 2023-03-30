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
  slug,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {set_notes, set_opened_note_slug} = useNotesStore()

  useEffect(() => {
    console.log({slug})
    set_notes(notes)
    set_opened_note_slug(slug)
  }, [notes, set_notes, set_opened_note_slug, slug])

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>

      <div className="flex h-screen select-text bg-zinc-50 text-slate-900">
        <Sidebar />

        <div>
          <h1>View: {slug}</h1>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<
  {
    notes: Note[]
    slug: string
  },
  {
    slug: string
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

  const {slug} = ctx.params!
  const notes = await fetch_notes(supabase)

  return {
    props: {
      notes,
      slug,
    },
  }
}

export default View
