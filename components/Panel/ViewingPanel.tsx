type Props = {
  title: string
  change_state_to_editing: () => void
  change_state_to_deleting: () => void
}
export default function ViewingPanel({
  title,
  change_state_to_deleting,
  change_state_to_editing,
}: Props) {
  return (
    <div className="sticky top-0 mb-4 flex justify-between gap-8 bg-[#111111f9] p-4">
      <div>
        <span className="text-sm">Viewing:</span>
        <h2 className="font-bold uppercase">{title}</h2>
        <p className="text-xs">
          Your note is available for everyone at:{" "}
          <span className="cursor-pointer text-blue-500">
            https://localhost:3000/adasdad
          </span>
        </p>
      </div>

      <div className="flex gap-8">
        <button className="hover:underline" onClick={change_state_to_editing}>
          Edit
        </button>
        <button className="hover:underline" onClick={change_state_to_deleting}>
          Delete
        </button>
      </div>
    </div>
  )
}
