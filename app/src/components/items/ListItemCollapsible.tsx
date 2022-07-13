import React, { useEffect, useState } from 'react'

import { useDeleteItemMutation } from '@mono/api'
import { useAppDispatch, useAppSelector } from '@mono/core'
import { setActiveItemId, toggleEditorModal } from '@mono/ui'

import type { Item } from '@mono/feature'
type ListItemCollapsibleProps = {
  itemData: Item
}

export function ListItemCollapsible({
  itemData,
}: ListItemCollapsibleProps): JSX.Element {
  const dispatch = useAppDispatch()

  const openAll = useAppSelector((state) => state.ui.openAll)
  const [isOpen, setIsOpen] = useState(openAll)
  useEffect(() => {
    setIsOpen(openAll)
  }, [openAll])

  const [deleteItem] = useDeleteItemMutation()

  return (
    itemData && (
      <>
        <div className="flex flex-row justify-between p-4 shadow rounded-t-xl">
          <div>
            <div className="m-1 text-xl font-bold font-sans-serif text-sky-600">
              {itemData.title || 'Untitled'}
            </div>
            <div className="m-1 text-xs font-light text-gray-500">
              {new Date(
                itemData.modified_time || itemData.created_time
              ).toLocaleString()}
            </div>
          </div>
          <div className="flex flex-row items-end space-x-1 text-sm">
            <button
              className="p-1 pl-4 pr-4 font-semibold text-gray-100 rounded shadow-sm bg-sky-500 hover:bg-sky-400 hover:shadow-lg"
              onClick={() => {
                dispatch(setActiveItemId(itemData._id))
                dispatch(toggleEditorModal())
              }}
            >
              Edit
            </button>
            <button
              className="p-1 pl-4 pr-4 font-semibold text-gray-100 rounded shadow-sm bg-slate-400 hover:bg-rose-400 hover:shadow-rose-300"
              onClick={async () => {
                await deleteItem(itemData._id).unwrap()
              }}
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
        </div>
        {isOpen && (
          <div className="p-3 pl-5 pr-5 font-light text-gray-500 whitespace-pre-wrap border shadow-sm rounded-b-xl bg-gray-50 font-sans-serif">
            {itemData.content || (
              <div className="text-sm text-gray-400 font-sans-serif">-</div>
            )}
          </div>
        )}
      </>
    )
  )
}
