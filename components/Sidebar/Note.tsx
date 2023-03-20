import {FC} from "react"
import {HiOutlineDocumentText} from "react-icons/hi"

const Note: FC<{
  opened?: boolean
  document: {
    name: string
  }
}> = ({opened = false, document}) => (
  <div
    className={`flex cursor-pointer items-center gap-4 py-[5px] px-8 ${
      opened ? "bg-zinc-200" : ""
    }`}
  >
    <HiOutlineDocumentText className="text-2xl text-zinc-400" />

    <p className="text-bold text-md w-full py-[4px] font-medium text-zinc-500">
      {document.name}
    </p>
  </div>
)

export default Note
