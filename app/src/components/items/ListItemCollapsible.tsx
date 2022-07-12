import React, { useState } from 'react'

import { useAppDispatch } from '@mono/core'
import { deleteItem } from '@mono/feature'
import { setActiveItemId, toggleEditorModal } from '@mono/ui'

import type { Item } from '@mono/feature'

type ListItemCollapsibleProps = {
  itemData: Item
  open: boolean
}

export function ListItemCollapsible({
  itemData,
  open,
}: ListItemCollapsibleProps): JSX.Element | null {
  const dispatch = useAppDispatch()

  const [isOpen, setIsOpen] = useState(open)

  return itemData ? (
    <div>
      <p className="flex flex-row justify-between p-4 shadow">
        <div>
          <div className="m-1 text-xl font-bold font-sans-serif text-sky-600">
            {itemData.title || 'Untitled'}
          </div>
          <div className="m-1 text-xs text-gray-500">
            {itemData.modified_time || itemData.created_time}
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
            className="p-1 pl-4 pr-4 font-semibold text-gray-100 rounded shadow-sm bg-slate-500 hover:bg-rose-400 hover:shadow-rose-300 bg-"
            onClick={() => {
              dispatch(deleteItem(itemData._id))
              dispatch(setActiveItemId(undefined))
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
      </p>
      {isOpen && (
        <div className="p-3 pl-5 pr-5 font-serif text-gray-500 whitespace-pre-wrap border border-gray-200 border-solid shadow-sm">
          {itemData.content || (
            <div className="text-sm text-gray-400 font-sans-serif">(Empty)</div>
          )}
        </div>
      )}
    </div>
  ) : null
}
