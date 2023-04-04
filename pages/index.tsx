import type {GetServerSideProps} from "next"

import {createServerSupabaseClient} from "@supabase/auth-helpers-nextjs"

import {Database} from "types/supabase"

import {fetch_first_note_slug} from "utils/fetching/fetch_first_note_slug"

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

  const {count: notes_count} = await supabase
    .from("notes")
    .select("*", {count: "exact", head: true})

  if (notes_count === 0) {
    await supabase.from("notes").insert({
      title: "Empty note!",
      title_slug: "empty-note",
      user_id: session.user.id,
      content: "# Empty note",
      is_bookmark: false,
    })

    return {
      redirect: {
        permanent: false,
        destination: "/empty-note",
      },
    }
  }

  const user_id = session.user.id
  const title_slug = await fetch_first_note_slug(supabase, user_id)

  return {
    redirect: {
      permanent: false,
      destination: title_slug,
    },
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {}
