import type {GetServerSideProps, InferGetServerSidePropsType} from "next"
import Head from "next/head"

const View = ({id}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>

      <div>
        <h1>View: {id}</h1>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<
  {id: string},
  {id: string}
> = async (ctx) => {
  const {id} = ctx.params!

  console.log({id})

  // fetch specific note

  return {
    props: {
      id,
    },
  }
}

export default View
