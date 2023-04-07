import Link from "next/link"
import {useEffect, useState} from "react"
import {When} from "react-if"

import {useNote} from "hooks/useNote"

type Props = ReturnType<typeof useNote> & {
  note: Note
}
export const ViewingPanel = ({note, methods}: Props) => {
  const [sharedLink, setSharedLink] = useState<string | null>(null)

  useEffect(() => {
    if (note.isShared) {
      const fullUrl =
        typeof window !== "undefined" && window.location.origin
          ? window.location.origin
          : ""

      const sharedLink = `${fullUrl}/shared/${note.userId}/${note.titleSlug}`

      setSharedLink(sharedLink)
    } else {
      setSharedLink(null)
    }
  }, [note.isShared, note.titleSlug, note.userId])

  return (
    <div className="sticky top-0 mb-4 flex justify-between gap-8 bg-[#111111f9] p-4">
      <div>
        <span className="text-sm">Viewing:</span>
        <h2 className="font-bold uppercase">{note.title}</h2>

        <When condition={note.isShared}>
          <p className="text-xs">
            Your note is available for everyone at:{" "}
            <Link target="_blank" href={sharedLink!}>
              <span className="block cursor-pointer select-text text-blue-500">
                {sharedLink}
              </span>
            </Link>
          </p>
        </When>
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
}
