import {When} from "react-if"

import Sidebar from "components/Panel/Sidebar"
import DeletingPanel from "components/Panel/State/DeletingPanel"
import EditingPanel from "components/Panel/State/EditingPanel"
import ViewingPanel from "components/Panel/State/ViewingPanel"
import MarkdownPreview from "components/View/MarkdownPreview"

import use_note from "hooks/use_note"

type Props = {
  note: Note
}
export default function Layout({note}: Props) {
  const {data, methods} = use_note(note)

  return (
    <div className="flex h-screen gap-4 bg-[#111111f9] px-10 pt-10 text-white">
      <Sidebar />

      <div className="relative w-full overflow-y-auto overflow-x-hidden scroll-smooth">
        <When condition={data.note_state === "VIEWING"}>
          <ViewingPanel note={note} methods={methods} data={data} />

          <div className="w-full bg-[#111111f9] p-4">
            <MarkdownPreview content={data.note_content} />
          </div>
        </When>

        <When condition={data.note_state === "EDITING"}>
          <EditingPanel note={note} methods={methods} data={data} />

          <div className="flex w-full gap-8 bg-[#111111f9] p-4">
            <textarea
              className="w-1/2 bg-transparent"
              value={data.note_content}
              onChange={({target}) => methods.set_note_content(target.value)}
            />

            <MarkdownPreview content={data.note_content} />
          </div>
        </When>

        <When condition={data.note_state === "DELETING"}>
          <DeletingPanel note={note} methods={methods} data={data} />

          <div className="w-full bg-[#111111f9] p-4">
            <MarkdownPreview content={data.note_content} />
          </div>
        </When>
      </div>
    </div>
  )
}
