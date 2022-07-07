import React, { useState } from 'react'

import { useAppDispatch, useAppSelector } from '@mono/core'
import { deleteNote } from '@mono/feature'
import { setActiveNoteId, toggleEditorModal } from '@mono/ui'

import type { UUID } from '@mono/feature'
type ListItemCollapsibleProps = {
  noteId: UUID
  open: boolean
}

export function ListItemCollapsible({ noteId, open }: ListItemCollapsibleProps): JSX.Element | null {
  const activeNote = useAppSelector((state) => state.notes.filter(({ id }) => id === noteId)[0])
  const dispatch = useAppDispatch()

  const [isOpen, setIsOpen] = useState(open)

  return activeNote ? (
    <p className="p-4 shadow">
      <div className="m-1 text-xl font-bold font-sans-serif text-sky-600">{activeNote.title}</div>
      <div className="m-1 text-xs text-gray-500">{activeNote.modified_at || activeNote.created_at}</div>
      <div className="flex flex-row justify-end space-x-1 text-sm">
        <button
          className="p-1 pl-4 pr-4 font-semibold text-gray-100 rounded shadow-sm bg-sky-500 hover:bg-sky-400 hover:shadow-lg"
          onClick={() => {
            dispatch(setActiveNoteId(activeNote.id))
            dispatch(toggleEditorModal())
          }}
        >
          Edit
        </button>
        <button
          className="p-1 pl-4 pr-4 font-semibold text-gray-100 rounded shadow-sm bg-sky-500 hover:bg-sky-400 hover:shadow-lg"
          onClick={() => dispatch(deleteNote(activeNote.id))}
        >
          Delete
        </button>
        <button
          className="p-1 pl-4 pr-4 font-semibold text-gray-100 rounded shadow-sm bg-sky-500 hover:bg-sky-400 hover:shadow-lg"
          onClick={() => setIsOpen((_) => !_)}
        >
          {isOpen ? '〈' : '〉'}
        </button>
      </div>
      {isOpen && <div className="p-2 mt-2 font-serif text-gray-500 whitespace-pre-wrap">{activeNote.body}</div>}
    </p>
  ) : null
}
