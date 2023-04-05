/* eslint-disable react/no-children-prop */
import type {GetServerSideProps, InferGetServerSidePropsType} from "next"
import Head from "next/head"

import {createServerSupabaseClient} from "@supabase/auth-helpers-nextjs"

import {Database} from "types/supabase"

import SimpleInfoPanel from "components/Panel/SimpleInfoPanel"
import MarkdownPreview from "components/View/MarkdownPreview"

import fetch_note_by_slug from "utils/supabase/fetch_note_by_slug"
import increment_note_views from "utils/supabase/increment_note_views"

export const getServerSideProps: GetServerSideProps<
  {
    title: string
    content: string
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
      title: current_note.title,
      content: current_note.content || "",
    },
  }
}

export default function SharedNotePage({
  title,
  content,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>

      <div className="w-full gap-4 scroll-smooth bg-[#111111f9] px-10 pt-10 text-white">
        <SimpleInfoPanel title={title} />

        <div className="w-full bg-[#111111f9] p-4">
          <MarkdownPreview content={content || ""} />
        </div>
      </div>
    </>
  )
}
