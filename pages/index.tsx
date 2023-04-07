import type {GetServerSideProps} from "next"

import {createServerSupabaseClient} from "@supabase/auth-helpers-nextjs"

import {Database} from "types/supabase"

import {createEmptyNote} from "utils/supabase/createEmptyNote"
import {fetchFirstNoteSlug} from "utils/supabase/fetchFirstNoteSlug"
import {fetchNotesCount} from "utils/supabase/fetchNotesCount"

export const getServerSideProps: GetServerSideProps = async (ctx) => {
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

  const userId = session.user.id

  const notesCount = await fetchNotesCount(supabase, userId)

  if (notesCount === 0) {
    await createEmptyNote(supabase, userId)

    return {
      redirect: {
        permanent: false,
        destination: "/empty-note",
      },
    }
  }

  const titleSlug = await fetchFirstNoteSlug(supabase, userId)

  return {
    redirect: {
      permanent: false,
      destination: titleSlug,
    },
  }
}

const IndexPage = () => {}

export default IndexPage
