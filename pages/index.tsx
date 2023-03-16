import type {GetServerSideProps} from "next"
import Head from "next/head"

const Main = () => {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>

      <div>
        <h1>Hello</h1>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  // fetch all notes

  return {props: {}}
}

export default Main
