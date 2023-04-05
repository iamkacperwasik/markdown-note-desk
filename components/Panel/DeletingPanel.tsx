type Props = {
  title: string
  back_to_viewing: () => void
  delete_note: () => void
}
export default function DeletingPanel({
  title,
  back_to_viewing,
  delete_note,
}: Props) {
  return (
    <div className="sticky top-0 mb-4 flex justify-between gap-8 bg-[#111111f9] p-4">
      <div>
        <span className="text-sm">Deleting:</span>
        <h2 className="font-bold uppercase">{title}</h2>
      </div>

      <div className="flex gap-8">
        <button className="hover:underline" onClick={delete_note}>
          Delete
        </button>
        <button className="hover:underline" onClick={back_to_viewing}>
          Cancel
        </button>
      </div>
    </div>
  )
}
