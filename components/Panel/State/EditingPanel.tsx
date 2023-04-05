import use_note from "hooks/use_note"

type Props = ReturnType<typeof use_note> & {
  note: Note
}
export default function EditingPanel({note, data, methods}: Props) {
  return (
    <>
      <div className="sticky top-0 mb-4 flex justify-between gap-8 bg-[#111111f9] p-4">
        <div>
          <span className="text-sm">Editing:</span>
          <h2 className="font-bold uppercase">{note.title}</h2>
        </div>

        <div className="flex gap-8">
          <button
            className="hover:underline"
            onClick={methods.note_actions.edit}
            disabled={data.is_data_untouched}
          >
            Save
          </button>
          <button
            className="hover:underline"
            onClick={methods.note_actions.format}
          >
            Format
          </button>
          <button
            className="hover:underline"
            onClick={methods.back_to_viewing.from_editing}
          >
            Cancel
          </button>
        </div>
      </div>

      <div className="mb-4 bg-[#111111f9] p-4">
        <label className="flex items-center gap-4">
          <p className="font-semibold">Share this note?</p>
          <input
            type="checkbox"
            className="h-3 w-3"
            checked={data.share_note}
            onChange={({target}) => methods.set_share_note(target.checked)}
          />
        </label>
        <span className="text-sm font-thin">Save to see apply changes!</span>
      </div>
    </>
  )
}
