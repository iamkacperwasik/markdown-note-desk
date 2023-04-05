import Link from "next/link"
import {HiOutlineDocumentText} from "react-icons/hi"

type Props = {
  opened?: boolean
  title: string
  title_slug: string
}
export default function NoteLink({opened = false, title, title_slug}: Props) {
  return (
    <Link href={title_slug}>
      <div
        className={`flex cursor-pointer items-center gap-4 py-[5px] px-8 ${
          opened && "bg-zinc-200"
        }`}
      >
        <HiOutlineDocumentText className="text-2xl text-zinc-400" />

        <p className="text-md w-full truncate text-ellipsis py-[4px] font-medium text-zinc-500">
          {title}
        </p>
      </div>
    </Link>
  )
}
