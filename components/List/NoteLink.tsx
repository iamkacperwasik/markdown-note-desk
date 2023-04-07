import Link from "next/link"

type Props = {
  opened?: boolean
  title: string
  titleSlug: string
}
export const NoteLink = ({opened = false, title, titleSlug}: Props) => (
  <Link href={titleSlug}>
    <p
      className={`cursor-pointer text-gray-300 ${
        opened ? "py-2 px-4 font-bold" : "hover:underline"
      }`}
    >
      {title}
    </p>
  </Link>
)
