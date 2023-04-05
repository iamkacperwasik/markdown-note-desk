/* eslint-disable react/no-children-prop */
import type {GetServerSideProps, InferGetServerSidePropsType} from "next"
import Head from "next/head"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

import {createServerSupabaseClient} from "@supabase/auth-helpers-nextjs"

import {Database} from "types/supabase"

import fetch_note_by_slug from "utils/supabase/fetch_note_by_slug"
import increment_note_views from "utils/supabase/increment_note_views"

export const getServerSideProps: GetServerSideProps<
  {
    note: Note
  },
  {
    slug: string
    user_id: string
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

  const {slug, user_id} = ctx.params!

  const current_note = await fetch_note_by_slug(supabase, slug, user_id)

  if (!current_note) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    }
  }

  const {title_slug, views} = current_note

  await increment_note_views(supabase, user_id, title_slug, views)
  current_note.views += 1

  return {
    props: {
      note: current_note,
    },
  }
}

export default function SharedNotePage({
  note,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>

      <div className="flex h-screen select-text bg-zinc-50 text-slate-900">
        <h1>{note.title}</h1>
        <ReactMarkdown
          children={note.content || ""}
          remarkPlugins={[remarkGfm]}
        />
        <p>Views: {note.views}</p>
      </div>
    </>
  )
}
