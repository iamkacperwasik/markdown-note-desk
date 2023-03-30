import {createServerSupabaseClient} from "@supabase/auth-helpers-nextjs"
import type {GetServerSideProps} from "next"
import {Database} from "types/supabase"
import {fetch_first_note_slug} from "utils/fetch_first_note_slug"

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
    return {
      redirect: {
        permanent: false,
        destination: "/welcome-to-markdown-notes-app",
      },
    }
  }

  const title_slug = await fetch_first_note_slug(supabase)

  return {
    redirect: {
      permanent: false,
      destination: title_slug,
    },
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {}
