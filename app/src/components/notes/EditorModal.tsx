import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'

import { useAppDispatch, useAppSelector } from '@mono/core'
import { addNote, editNote } from '@mono/feature'
import { setActiveNoteId, toggleEditorModal } from '@mono/ui'

export const EditorModal = (): JSX.Element | null => {
  const { activeNoteId, showEditorModal } = useAppSelector((state) => state.ui)
  const activeNote = useAppSelector((state) => state.notes.filter((note) => note.id === activeNoteId)[0])
  const dispatch = useAppDispatch()

  const [inputText, setInputText] = useState<string | null>(null)
  const [titleText, setTitleText] = useState<string | null>(null)

  return activeNoteId !== undefined && showEditorModal ? (
    <>
      <div className="fixed inset-0 bg-black opacity-25" onClick={() => dispatch(toggleEditorModal())} />
      <div className="fixed flex flex-col justify-between p-5 bg-white rounded-md bg-opacity-90 inset-5 min-w-fit">
        <input
          className="p-1 text-gray-600 border-gray-100 rounded"
          type="text"
          placeholder={`Untitled - ${new Date().toLocaleString()}`}
          onChange={(e) => setTitleText(e.target.value)}
          defaultValue={titleText || activeNote?.title}
        />
        <textarea
          className="p-2 text-gray-600 border-gray-100 rounded h-4/5"
          onChange={(e) => setInputText(e.target.value)}
          defaultValue={inputText || activeNote?.body}
          required
        />
        <div className="flex flex-row justify-between ml-10 mr-10 space-x-5">
          <button
            className="p-1 pl-4 pr-4 font-semibold text-gray-100 bg-gray-400 rounded shadow-sm gray-500 hover:bg-gray-600 focus:border-black"
            onClick={() => {
              dispatch(setActiveNoteId(undefined))
              dispatch(toggleEditorModal())
              setTitleText(null)
              setInputText(null)
            }}
          >
            Cancel
          </button>
          <button
            className="p-1 pl-4 pr-4 font-bold text-gray-100 rounded shadow-sm bg-sky-500 focus:border-black hover:bg-sky-400 hover:shadow-xl"
            type="submit"
            onClick={() => {
              const newContents = {
                title: titleText || 'Untitled',
                body: inputText || '',
              }
              dispatch(
                activeNoteId === null
                  ? addNote({ ...newContents, id: uuid(), created_at: new Date().toLocaleString() })
                  : editNote({ ...newContents, id: activeNoteId })
              )
              dispatch(toggleEditorModal())
              setTitleText(null)
              setInputText(null)
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  ) : null
}
