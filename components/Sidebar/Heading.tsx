import {FC} from "react"

const Heading: FC<{children: string}> = ({children: text}) => (
  <h2 className="mb-4 px-8 text-xl font-bold uppercase text-zinc-400">
    {text}
  </h2>
)

export default Heading
