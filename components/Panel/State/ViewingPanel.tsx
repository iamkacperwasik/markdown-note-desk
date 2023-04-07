import Link from "next/link"
import {useEffect, useState} from "react"
import {When} from "react-if"

import {useNote} from "hooks/useNote"

type Props = ReturnType<typeof useNote> & {
  note: Note
}
export const ViewingPanel = ({note, methods}: Props) => {
  const [sharedLink, setSharedLink] = useState<null | string>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSharedLink(
        `${window!.location.origin}/shared/${note.userId}/${note.titleSlug}`
      )
    } else setSharedLink(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note.isShared])

  return (
    <div className="sticky top-0 mb-4 flex justify-between gap-8 bg-[#111111f9] p-4">
      <div>
        <span className="text-sm">Viewing:</span>
        <h2 className="font-bold uppercase">{note.title}</h2>

        <When condition={note.isShared}>
          <p className="text-xs">
            Your note is available for everyone at:{" "}
            <Link target="_blank" href={sharedLink || ""}>
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
