import {useEffect, useRef} from "react"

type Props = {noteContent: string; setNoteContent: (content: string) => void}
export const Editor = ({noteContent, setNoteContent}: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"
    }
  })

  return (
    <textarea
      className="h-auto w-full bg-transparent"
      value={noteContent}
      ref={textareaRef}
      onChange={({target}) => setNoteContent(target.value)}
    />
  )
}
