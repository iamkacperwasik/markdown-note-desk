import {useNote} from "hooks/useNote"

type Props = ReturnType<typeof useNote> & {
  note: Note
}
export const EditingPanel = ({note, data, methods}: Props) => (
  <>
    <div className="sticky top-0 mb-4 flex justify-between gap-8 bg-[#111111f9] p-4">
      <div>
        <span className="text-sm">Editing:</span>
        <h2 className="font-bold uppercase">{note.title}</h2>
      </div>

      <div className="flex gap-8">
        <button
          className="hover:underline"
          onClick={methods.noteActions.edit}
          disabled={data.isDataUntouched}
        >
          Save
        </button>
        <button
          className="hover:underline"
          onClick={methods.noteActions.format}
        >
          Format
        </button>
        <button
          className="hover:underline"
          onClick={methods.backToViewing.fromEditing}
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
          checked={data.isNoteShared}
          onChange={({target}) => methods.setIsNoteShared(target.checked)}
        />
      </label>
      <span className="text-sm font-thin">Save to see apply changes!</span>
    </div>

    <div className="mb-4 bg-[#111111f9] p-4">
      <label className="flex items-center gap-4">
        <p className="font-semibold">Bookmark this note</p>
        <input
          type="checkbox"
          className="h-3 w-3"
          checked={data.isBookmarked}
          onChange={({target}) => methods.setIsBookmarked(target.checked)}
        />
      </label>
    </div>
  </>
)
