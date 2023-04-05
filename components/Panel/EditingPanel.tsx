type Props = {
  title: string
  is_data_untouched: boolean
  share_note: boolean
  set_share_note: (share: boolean) => void
  save_note: () => void
  format_note: () => void
  back_to_viewing: () => void
}
export default function EditingPanel({
  title,
  save_note,
  back_to_viewing,
  format_note,
  is_data_untouched,
  set_share_note,
  share_note,
}: Props) {
  return (
    <>
      <div className="sticky top-0 mb-4 flex justify-between gap-8 bg-[#111111f9] p-4">
        <div>
          <span className="text-sm">Editing:</span>
          <h2 className="font-bold uppercase">{title}</h2>
        </div>

        <div className="flex gap-8">
          <button
            className="hover:underline"
            onClick={save_note}
            disabled={is_data_untouched}
          >
            Save
          </button>
          <button className="hover:underline" onClick={format_note}>
            Format
          </button>
          <button className="hover:underline" onClick={back_to_viewing}>
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
            checked={share_note}
            onChange={({target}) => set_share_note(target.checked)}
          />
        </label>
        <span className="text-sm font-thin">Save to see apply changes!</span>
      </div>
    </>
  )
}
