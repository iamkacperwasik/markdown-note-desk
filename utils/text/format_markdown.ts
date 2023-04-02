import prettier from "prettier"
import markdown_parser from "prettier/parser-markdown"

export const format_markdown = (markdown: string) => {
  return prettier.format(markdown, {
    parser: "markdown",
    plugins: [markdown_parser],
  })
}
