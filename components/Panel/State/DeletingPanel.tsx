import {useNote} from "hooks/useNote"

type Props = ReturnType<typeof useNote> & {note: Note}
export const DeletingPanel = ({methods, note}: Props) => (
  <div className="sticky top-0 mb-4 flex justify-between gap-8 bg-[#111111f9] p-4">
    <div>
      <span className="text-sm">Deleting:</span>
      <h2 className="font-bold uppercase">{note.title}</h2>
    </div>

    <div className="flex gap-8">
      <button className="hover:underline" onClick={methods.noteActions.delete}>
        Delete
      </button>
      <button
        className="hover:underline"
        onClick={methods.backToViewing.fromEditing}
      >
        Cancel
      </button>
    </div>
  </div>
)
