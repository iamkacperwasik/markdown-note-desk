import use_note from "hooks/use_note"

type Props = ReturnType<typeof use_note> & {note: Note}
export default function DeletingPanel({data, methods, note}: Props) {
  return (
    <div className="sticky top-0 mb-4 flex justify-between gap-8 bg-[#111111f9] p-4">
      <div>
        <span className="text-sm">Deleting:</span>
        <h2 className="font-bold uppercase">{note.title}</h2>
      </div>

      <div className="flex gap-8">
        <button
          className="hover:underline"
          onClick={methods.note_actions.delete}
        >
          Delete
        </button>
        <button
          className="hover:underline"
          onClick={methods.back_to_viewing.from_editing}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
