import React, { useState } from 'react'

import { useAppDispatch } from '@mono/core'
import { setActiveItemId, toggleEditorModal } from '@mono/ui'
import { EditorModal, List } from 'components/items'

export const AppLayout = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const [isOpenAll, setIsOpenAll] = useState<boolean | null>(null)

  return (
    <div className="min-h-screen p-8 bg-slate-800 min-w-fit">
      <EditorModal />
      <div className="flex flex-row justify-between mb-5">
        <button
          className="p-1 pl-4 pr-4 font-semibold text-white rounded-md bg-sky-500 hover:shadow-md hover:shadow-sky-500 hover:bg-sky-400"
          onClick={() => {
            dispatch(setActiveItemId(null))
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
      <List openAll={!!isOpenAll} />
    </div>
  )
}
