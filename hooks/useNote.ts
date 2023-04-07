/* eslint-disable react-hooks/exhaustive-deps */
import {useRouter} from "next/router"
import {useEffect, useState} from "react"
import slugify from "slugify"

import {useSupabaseClient} from "@supabase/auth-helpers-react"

import {Database} from "types/supabase"

import {fetchNoteBySlug} from "utils/supabase/fetchNoteBySlug"
import {formatMarkdown} from "utils/text/formatMarkdown"

export const useNote = (note: Note) => {
  const supabase = useSupabaseClient<Database>()
  const router = useRouter()

  const [noteState, setNoteState] = useState<NoteState>("VIEWING")

  const [noteContent, setNoteContent] = useState<string>(note.content || "")
  const [newTitle, setNewTitle] = useState(note.title)
  const [isNoteShared, setIsNoteShared] = useState(note.isShared)
  const [isBookmarked, setIsBookmarked] = useState(note.isBookmark)

  const isUntouched = {
    content: noteContent === note.content,
    isShared: isNoteShared === note.isShared,
    isBookmarked: isBookmarked === note.isBookmark,
  }

  useEffect(() => {
    const formattedContent = formatMarkdown(note.content || "")

    setNoteContent(formattedContent)
    setNewTitle(note.title)
    setIsNoteShared(note.isShared)
    setIsBookmarked(note.isBookmark)

    changeState.toViewing()
  }, [note.content, note.title, note.isShared, note.isBookmark])

  const changeState = {
    toViewing: () => {
      setNoteState("VIEWING")
    },
    toEditing: () => {
      setNoteState("EDITING")
    },
    toDeleting: () => {
      setNoteState("DELETING")
    },
  }

  const backToViewing = {
    fromEditing: () => {
      setIsNoteShared(note.isShared)
      setIsBookmarked(note.isBookmark)
      setNoteContent(note.content!)

      changeState.toViewing()
    },
    fromDeleting: () => {
      changeState.toViewing()
    },
  }

  const noteActions = {
    format: () => {
      const formattedContent = formatMarkdown(noteContent)

      setNoteContent(formattedContent)
    },
    edit: async () => {
      if (newTitle === "") return

      const titleChanged = newTitle !== note.title
      const newTitleSlug = slugify(newTitle, {
        replacement: "-",
        lower: true,
        strict: true,
        trim: true,
      })

      const {
        data: {user},
      } = await supabase.auth.getUser()

      const userId = user!.id

      if (titleChanged) {
        const existingNote = await fetchNoteBySlug(
          supabase,
          newTitleSlug,
          userId
        )

        if (existingNote) {
          return
        }
      }

      if (
        titleChanged ||
        !isUntouched.content ||
        !isUntouched.isShared ||
        !isUntouched.isBookmarked
      ) {
        const formattedContent = formatMarkdown(noteContent)

        await supabase
          .from("notes")
          .update({
            content: formattedContent,
            title: newTitle,
            titleSlug: newTitleSlug,
            isShared: isNoteShared,
            isBookmark: isBookmarked,
          })
          .eq("id", note.id)

        note.content = noteContent
        note.title = newTitle
        note.titleSlug = newTitleSlug
        note.isShared = isNoteShared
        note.isBookmark = isBookmarked

        if (titleChanged) {
          router.replace(newTitleSlug)
        } else {
          setNoteState("VIEWING")
        }
      }
    },
    delete: async () => {
      await supabase.from("notes").delete().eq("id", note.id)

      router.replace("/")
    },
  }

  const isDataUntouched =
    newTitle === note.title &&
    isUntouched.content &&
    isUntouched.isShared &&
    isUntouched.isBookmarked

  return {
    data: {
      noteState,
      noteContent,
      isDataUntouched,
      isNoteShared,
      isBookmarked,
    },
    methods: {
      noteActions,
      backToViewing,
      changeState,
      setNoteContent,
      setIsNoteShared,
      setIsBookmarked,
    },
  }
}
