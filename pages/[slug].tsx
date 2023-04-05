import type {GetServerSideProps, InferGetServerSidePropsType} from "next"
import Head from "next/head"
import {useEffect} from "react"

import {createServerSupabaseClient} from "@supabase/auth-helpers-nextjs"

import {Database} from "types/supabase"

import Layout from "components/View/Layout"

import fetch_note_by_slug from "utils/supabase/fetch_note_by_slug"
import fetch_notes from "utils/supabase/fetch_notes"

import useNotesStore from "stores/notes_store"

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
  const user_id = session.user.id

  const current_note = await fetch_note_by_slug(supabase, slug, user_id)

  if (!current_note) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    }
  }

  const notes = await fetch_notes(supabase, user_id)

  return {
    props: {
      notes,
      slug,
    },
  }
}

export default function NotePage({
  notes,
  slug,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {set_notes, set_opened_note_slug} = useNotesStore()

  useEffect(() => {
    set_notes(notes)
    set_opened_note_slug(slug)
  }, [notes, set_notes, set_opened_note_slug, slug])

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>

      <Layout />
    </>
  )
}
