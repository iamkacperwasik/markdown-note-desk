import {createServerSupabaseClient} from "@supabase/auth-helpers-nextjs"
import type {GetServerSideProps, InferGetServerSidePropsType} from "next"
import Head from "next/head"
import {useEffect} from "react"
import {Database} from "types/supabase"
import {fetch_note_by_slug} from "utils/fetch_note_by_slug"
import {fetch_notes} from "utils/fetch_notes"

import Sidebar from "components/Sidebar"
import Note from "components/View/Note"

import {useNotesStore} from "stores/NotesStore"

const View = ({
  notes,
  slug,
  current_open_note,
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
          <Note document={current_open_note} />
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<
  {
    notes: Note[]
    slug: string
    current_open_note: Note
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

  const current_note = await fetch_note_by_slug(supabase, slug)

  if (!current_note) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    }
  }

  const notes = await fetch_notes(supabase)

  return {
    props: {
      notes,
      slug,
      current_open_note: current_note,
    },
  }
}

export default View
