import type {GetServerSideProps, InferGetServerSidePropsType} from "next"
import Head from "next/head"
import {useEffect} from "react"

import {createServerSupabaseClient} from "@supabase/auth-helpers-nextjs"

import {Database} from "types/supabase"

import {Layout} from "components/View/Layout"

import {fetchNoteBySlug} from "utils/supabase/fetchNoteBySlug"
import {fetchNotes} from "utils/supabase/fetchNotes"

import {useNotesStore} from "stores/useNotesStore"
import {useUserStore} from "stores/useUserStore"

export const getServerSideProps: GetServerSideProps<
  {
    notes: Note[]
    slug: string
    email: string
    userId: string
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
  const userId = session.user.id

  const note = await fetchNoteBySlug(supabase, slug, userId)

  if (!note) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    }
  }

  const notes = await fetchNotes(supabase, userId)

  const email = session.user.email!

  return {
    props: {
      notes,
      slug,
      userId,
      email,
    },
  }
}

const NotePage = ({
  notes,
  slug,
  email,
  userId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {setNotes, setOpenedNoteSlug} = useNotesStore()
  const {setEmail, setUserId} = useUserStore()

  useEffect(() => {
    setNotes(notes)
    setOpenedNoteSlug(slug)
    setEmail(email)
    setUserId(userId)
  }, [
    email,
    notes,
    slug,
    userId,
    setEmail,
    setNotes,
    setOpenedNoteSlug,
    setUserId,
  ])

  const note = notes.find(({titleSlug}) => titleSlug === slug)!

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>

      <Layout note={note} />
    </>
  )
}

export default NotePage
