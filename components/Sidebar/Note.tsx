import {FC} from "react"
import {HiOutlineDocumentText} from "react-icons/hi"

const Note: FC<{
  opened?: boolean
  document: Note
}> = ({opened = false, document: {title}}) => (
  <div
    className={`flex cursor-pointer items-center gap-4 py-[5px] px-8 ${
      opened ? "bg-zinc-200" : ""
    }`}
  >
    <HiOutlineDocumentText className="text-2xl text-zinc-400" />

    <p className="text-md w-full truncate text-ellipsis py-[4px] font-medium text-zinc-500">
      {title}
    </p>
  </div>
)

export default Note
