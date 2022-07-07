import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'

import { useAppDispatch, useAppSelector } from '@mono/core'
import { setActiveNoteId, toggleEditorModal } from '@mono/ui'
import { ListItemCollapsible } from 'components/notes'

export const List = (): JSX.Element => {
  const notes = useAppSelector((state) => state.notes)
  const dispatch = useAppDispatch()

  const [isOpenAll, setIsOpenAll] = useState<boolean | null>(null)

  return (
    <div className="p-5 min-w-fit">
      <div className="flex flex-row justify-between mb-5">
        <button
          className="p-1 pl-4 pr-4 font-semibold text-white rounded-md bg-sky-500 hover:shadow-md hover:shadow-sky-500 hover:bg-sky-400"
          onClick={() => {
            dispatch(setActiveNoteId(null))
            dispatch(toggleEditorModal())
          }}
        >
          + New
        </button>
        <button
          className="p-1 pl-4 pr-4 font-semibold text-white rounded-md bg-sky-500 hover:shadow-md hover:shadow-sky-500 hover:bg-sky-400"
          onClick={() => setIsOpenAll((_) => !_)}
        >
          {isOpenAll ? '〈' : '〉'}
        </button>
      </div>
      <div className="flex flex-col bg-white shadow-md shadow-gray-100 rounded-xl">
        {notes.map((item) => (
          <ListItemCollapsible key={uuid()} noteId={item.id} open={!!isOpenAll} />
        ))}
      </div>
    </div>
  )
}
