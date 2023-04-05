import Link from "next/link"

type Props = {
  opened?: boolean
  title: string
  title_slug: string
}
export default function NoteLink({opened = false, title, title_slug}: Props) {
  return (
    <Link href={title_slug}>
      <p
        className={`cursor-pointer text-gray-300 ${
          opened ? "py-2 px-4 font-bold" : "hover:underline"
        }`}
      >
        {title}
      </p>
    </Link>
  )
}
