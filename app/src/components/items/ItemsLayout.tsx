import React from 'react'

import { useDeleteItemMutation, useFindAllItemsQuery } from '@mono/api'
import { useAppDispatch, useAppSelector } from '@mono/core'
import { setActiveItemId, toggleEditorModal, toggleOpenAll } from '@mono/ui'
import { EditorModal, List } from 'components/items'

export const ItemsLayout = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const openAll = useAppSelector((state) => state.ui.openAll)

  const { data } = useFindAllItemsQuery()
  const { items } = data || {}
  const [deleteItem] = useDeleteItemMutation()

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
        <div className="flex flex-row space-x-2">
          <button
            className="p-1 pl-4 pr-4 font-semibold text-gray-100 rounded shadow-sm bg-slate-500 hover:bg-rose-400 hover:shadow-rose-300 bg-"
            onClick={() => {
              items?.forEach((item) => deleteItem(item._id))
            }}
          >
            Delete All
          </button>
          <button
            className="p-1 pl-4 pr-4 font-semibold text-white rounded-md bg-sky-500 hover:shadow-md hover:shadow-sky-500 hover:bg-sky-400"
            onClick={() => dispatch(toggleOpenAll())}
          >
            {openAll ? '〈' : '〉'}
          </button>
        </div>
      </div>
      <List />
    </div>
  )
}
