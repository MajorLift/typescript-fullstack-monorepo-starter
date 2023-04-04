import React from 'react'

import { useDeleteItemMutation, useFindAllItemsQuery } from '@mono/api'
import { useAppDispatch, useAppSelector } from '@mono/core'
import { setActiveItemId, toggleEditorModal, toggleOpenAll } from '@mono/ui'
import { EditorModal, List } from 'components/items'

export const ItemsLayout = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const openAll = useAppSelector((state) => state.ui.openAll)

  const { data } = useFindAllItemsQuery()
  const [deleteItem] = useDeleteItemMutation()

  return (
    <div className="min-h-screen p-5 bg-slate-800 min-w-fit">
      <EditorModal />
      <div className="flex flex-row justify-between mb-5">
        <button
          className="p-1 pl-4 pr-4 font-semibold text-white duration-200 rounded-md shadow-lg shadow-black bg-sky-500 hover:shadow-md hover:shadow-sky-700 hover:bg-sky-400 active:bg-sky-300"
          onClick={() => {
            dispatch(setActiveItemId(null))
            dispatch(toggleEditorModal())
          }}
        >
          + New
        </button>
        <div className="flex flex-row space-x-2">
          <button
            className="p-1 pl-4 pr-4 font-semibold text-gray-100 duration-200 rounded shadow-md shadow-black bg-slate-500 hover:bg-rose-500 hover:shadow-rose-700 active:bg-rose-300"
            onClick={() => {
              data?.forEach((item) => deleteItem(item._id))
            }}
          >
            Delete All
          </button>
          <button
            className="p-1 pl-4 pr-4 font-semibold text-white duration-200 rounded-md shadow-md active:bg-sky-300 shadow-black bg-sky-500 hover:shadow-md hover:shadow-sky-700 hover:bg-sky-400"
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
