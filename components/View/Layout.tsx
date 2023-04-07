import {When} from "react-if"

import {Sidebar} from "components/Panel/Sidebar"
import {DeletingPanel} from "components/Panel/State/DeletingPanel"
import {EditingPanel} from "components/Panel/State/EditingPanel"
import {ViewingPanel} from "components/Panel/State/ViewingPanel"
import {MarkdownPreview} from "components/View/MarkdownPreview"

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
            <MarkdownPreview content={data.noteContent} />
          </div>
        </When>

        <When condition={data.noteState === "EDITING"}>
          <EditingPanel note={note} methods={methods} data={data} />

          <div className="flex w-full gap-8 bg-[#111111f9] p-4">
            <textarea
              className="w-1/2 bg-transparent"
              value={data.noteContent}
              onChange={({target}) => methods.setNoteContent(target.value)}
            />

            <MarkdownPreview content={data.noteContent} />
          </div>
        </When>

        <When condition={data.noteState === "DELETING"}>
          <DeletingPanel note={note} methods={methods} data={data} />

          <div className="w-full bg-[#111111f9] p-4">
            <MarkdownPreview content={data.noteContent} />
          </div>
        </When>
      </div>
    </div>
  )
}
