import {CiSquarePlus} from "react-icons/ci"

const NewNoteButton = () => (
  <div className="flex cursor-pointer items-center gap-2 py-4 px-8">
    <CiSquarePlus className="text-2xl text-sky-600" />

    <p className="text-bold text-md w-full py-[4px] font-medium text-sky-600">
      Add Note
    </p>
  </div>
)

export default NewNoteButton
