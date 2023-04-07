import {useNote} from "hooks/useNote"

type Props = ReturnType<typeof useNote> & {
  note: Note
}
export const ViewingPanel = ({note, methods}: Props) => (
  <div className="sticky top-0 mb-4 flex justify-between gap-8 bg-[#111111f9] p-4">
    <div>
      <span className="text-sm">Viewing:</span>
      <h2 className="font-bold uppercase">{note.title}</h2>
      <p className="text-xs">
        Your note is available for everyone at:{" "}
        <span className="cursor-pointer text-blue-500">
          https://localhost:3000/adasdad
        </span>
      </p>
    </div>

    <div className="flex gap-8">
      <button
        className="hover:underline"
        onClick={methods.changeState.toEditing}
      >
        Edit
      </button>
      <button
        className="hover:underline"
        onClick={methods.changeState.toDeleting}
      >
        Delete
      </button>
    </div>
  </div>
)
