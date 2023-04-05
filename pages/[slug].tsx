import type {GetServerSideProps, InferGetServerSidePropsType} from "next"
import Head from "next/head"
import {useEffect} from "react"

import {createServerSupabaseClient} from "@supabase/auth-helpers-nextjs"

import {Database} from "types/supabase"

import Layout from "components/View/Layout"

import fetch_note_by_slug from "utils/supabase/fetch_note_by_slug"
import fetch_notes from "utils/supabase/fetch_notes"

import useNotesStore from "stores/notes_store"
import useUserStore from "stores/user_store"

export const getServerSideProps: GetServerSideProps<
  {
    notes: Note[]
    slug: string
    email: string
    user_id: string
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

  const email = session.user.email!

  return {
    props: {
      notes,
      slug,
      user_id,
      email,
    },
  }
}

export default function NotePage({
  notes,
  slug,
  email,
  user_id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {set_notes, set_opened_note_slug} = useNotesStore()
  const {set_email, set_user_id} = useUserStore()

  useEffect(() => {
    set_notes(notes)
    set_opened_note_slug(slug)
    set_email(email)
    set_user_id(user_id)
  }, [
    email,
    notes,
    set_email,
    set_notes,
    set_opened_note_slug,
    set_user_id,
    slug,
    user_id,
  ])

  const note = notes.find(({title_slug}) => title_slug === slug)!

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>

      <Layout note={note} />
    </>
  )
}
