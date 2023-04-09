/* eslint-disable react/no-children-prop */
import type {GetServerSideProps, InferGetServerSidePropsType} from "next"
import Head from "next/head"

import {createServerSupabaseClient} from "@supabase/auth-helpers-nextjs"

import {Database} from "types/supabase"

import {SimpleInfoPanel} from "components/Panel/SimpleInfoPanel"
import {MarkdownPreview} from "components/View/MarkdownPreview"

import {fetchNoteBySlug} from "utils/supabase/fetchNoteBySlug"
import {incrementNoteViews} from "utils/supabase/incrementNoteViews"

export const getServerSideProps: GetServerSideProps<
  {
    title: string
    content: string
    views: number
  },
  {
    slug: string
    userId: string
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

  const {slug, userId} = ctx.params!

  const note = await fetchNoteBySlug(supabase, slug, userId)

  if (!note) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    }
  }

  const {titleSlug, views} = note

  await incrementNoteViews(supabase, userId, titleSlug, views)
  note.views += 1

  return {
    props: {
      title: note.title,
      content: note.content || "",
      views: note.views,
    },
  }
}

const SharedNotePage = ({
  title,
  content,
  views,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <>
    <Head>
      <meta name="robots" content="noindex" />
    </Head>

    <div className="min-h-screen w-full gap-4 scroll-smooth bg-[#111111f9] px-10 pt-10 text-white">
      <SimpleInfoPanel title={title} views={views} />

      <div className="w-full bg-[#111111f9] p-4">
        <MarkdownPreview content={content || ""} />
      </div>
    </div>
  </>
)

export default SharedNotePage
