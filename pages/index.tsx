import type {GetServerSideProps} from "next"
import Head from "next/head"

import Sidebar from "components/Sidebar"

const Main = () => {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>

      <div className="flex h-screen select-text bg-zinc-50 text-slate-900">
        <Sidebar />
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  // fetch all notes

  return {props: {}}
}

export default Main
