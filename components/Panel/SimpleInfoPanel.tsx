type Props = {
  title: string
}
export default function SimpleInfoPanel({title}: Props) {
  return (
    <div className="mb-4 flex justify-between gap-8 bg-[#111111f9] p-4">
      <div>
        <h2 className="font-bold uppercase">{title}</h2>
      </div>
    </div>
  )
}
