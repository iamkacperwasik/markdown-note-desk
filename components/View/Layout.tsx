import {When} from "react-if"

import {DeletingPanel} from "components/Panel/State/DeletingPanel"
import {EditingPanel} from "components/Panel/State/EditingPanel"
import {ViewingPanel} from "components/Panel/State/ViewingPanel"
import {Editor} from "components/View/Editor"
import {MarkdownPreview} from "components/View/MarkdownPreview"
import {Sidebar} from "components/View/Sidebar"

import {useNote} from "hooks/useNote"

type Props = {
  note: Note
}
export const Layout = ({note}: Props) => {
  const {data, methods} = useNote(note)

  return (
    <div className="flex h-screen gap-4 bg-[#111111f9] px-10 pt-10 text-white">
      <Sidebar />

      <div className="relative w-full overflow-y-auto overflow-x-hidden scroll-smooth">
        <When condition={data.noteState === "VIEWING"}>
          <ViewingPanel note={note} methods={methods} data={data} />

          <div className="w-full bg-[#111111f9] p-4">
            <h2 className="mb-4 font-bold">Note preview</h2>

            <MarkdownPreview content={data.noteContent} />
          </div>
        </When>

        <When condition={data.noteState === "EDITING"}>
          <EditingPanel note={note} methods={methods} data={data} />

          <div className="flex w-full gap-2">
            <div className="flex w-1/2 flex-col bg-[#111111f9] p-4">
              <h2 className="mb-4 font-bold">
                Write your note here (using Markdown)
              </h2>

              <Editor
                noteContent={data.noteContent}
                setNoteContent={methods.setNoteContent}
              />
            </div>

            <div className="flex w-1/2 flex-col bg-[#111111f9] p-4">
              <h2 className="mb-4 font-bold">Note preview</h2>

              <MarkdownPreview content={data.noteContent} />
            </div>
          </div>
        </When>

        <When condition={data.noteState === "DELETING"}>
          <DeletingPanel note={note} methods={methods} data={data} />

          <div className="w-full bg-[#111111f9] p-4">
            <h2 className="mb-4 font-bold">Note preview</h2>

            <MarkdownPreview content={data.noteContent} />
          </div>
        </When>
      </div>
    </div>
  )
}
