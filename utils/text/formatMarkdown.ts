import prettier from "prettier"
import markdown_parser from "prettier/parser-markdown"

export const formatMarkdown = (markdown: string) =>
  prettier.format(markdown, {
    parser: "markdown",
    plugins: [markdown_parser],
  })
