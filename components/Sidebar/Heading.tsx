type Props = {children: string}
export default function Heading({children: text}: Props) {
  return (
    <h2 className="mb-4 px-8 text-xl font-bold uppercase text-zinc-400">
      {text}
    </h2>
  )
}
