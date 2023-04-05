import type {GetServerSideProps} from "next"

import {createServerSupabaseClient} from "@supabase/auth-helpers-nextjs"

import {Database} from "types/supabase"

import create_empty_note from "utils/supabase/create_empty_note"
import fetch_first_note_slug from "utils/supabase/fetch_first_note_slug"
import fetch_notes_count from "utils/supabase/fetch_notes_count"

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

  const user_id = session.user.id

  const notes_count = await fetch_notes_count(supabase, user_id)

  if (notes_count === 0) {
    await create_empty_note(supabase, user_id)

    return {
      redirect: {
        permanent: false,
        destination: "/empty-note",
      },
    }
  }

  const title_slug = await fetch_first_note_slug(supabase, user_id)

  return {
    redirect: {
      permanent: false,
      destination: title_slug,
    },
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function IndexPage() {}
