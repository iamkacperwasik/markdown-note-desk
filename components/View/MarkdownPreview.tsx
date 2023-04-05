/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

type Props = {
  content: string
}
export default function MarkdownPreview({content}: Props) {
  return (
    <ReactMarkdown
      // eslint-disable-next-line react/no-children-prop
      children={content}
      remarkPlugins={[remarkGfm]}
      className="select-text"
      skipHtml
      components={{
        h1: ({node, ...props}) => <h1 className="my-2 text-4xl" {...props} />,
        h2: ({node, ...props}) => <h2 className="my-2 text-2xl" {...props} />,
        h3: ({node, ...props}) => <h3 className="my-2 text-xl" {...props} />,
        ol: ({node, ...props}) => (
          <ol className="my-2 list-inside list-decimal" {...props} />
        ),
        ul: ({node, ...props}) => (
          <ol className="my-2 list-inside list-disc" {...props} />
        ),
        hr: ({node, ...props}) => <hr className="my-4" {...props} />,
        a: ({node, ...props}) => (
          <Link
            href={props.href || ""}
            target={props.target}
            className="my-4 text-blue-500 visited:text-purple-500"
            {...props}
          />
        ),
        img: ({node, ...props}) => (
          <Image
            //@ts-ignore
            height={Number(props.height) || 300}
            //@ts-ignore
            width={Number(props.width) || 400}
            className="my-2"
            {...props}
          />
        ),
        th: ({node, ...props}) => (
          <th className="border-[1px] p-2" {...props} />
        ),
        td: ({node, ...props}) => (
          <td className="border-[1px] p-2" {...props} />
        ),
        pre: ({node, ...props}) => <pre className="my-4" {...props} />,
      }}
    />
  )
}
