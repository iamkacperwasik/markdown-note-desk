/* eslint-disable react/no-children-prop */
import type {GetServerSideProps, InferGetServerSidePropsType} from "next"
import Head from "next/head"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

import {createServerSupabaseClient} from "@supabase/auth-helpers-nextjs"

import {Database} from "types/supabase"

export const getServerSideProps: GetServerSideProps<
  {
    note: Note
  },
  {
    slug: string
    userid: string
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

  const {slug, userid} = ctx.params!

  const {data: current_note} = await supabase
    .from("notes")
    .select("*")
    .eq("title_slug", slug)
    .eq("user_id", userid)
    .single()

  if (!current_note) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    }
  }

  await supabase
    .from("notes")
    .update({
      views: current_note.views + 1,
    })
    .eq("title_slug", slug)
    .eq("user_id", userid)

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
      </div>
    </>
  )
}
