/* eslint-disable react/no-children-prop */
import {FC} from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

const Note: FC<{
  document: Note
}> = ({document}) => {
  return (
    <div>
      <h1>{document.title}</h1>

      <div>
        <ReactMarkdown
          children={document.content || ""}
          remarkPlugins={[remarkGfm]}
        />
      </div>
    </div>
  )
}

export default Note
