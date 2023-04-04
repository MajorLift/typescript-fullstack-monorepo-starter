import React, { useEffect, useState } from 'react'

import { useDeleteItemMutation, useFindAllItemsQuery } from '@mono/api'
import { useAppDispatch, useAppSelector } from '@mono/core'
import { setActiveItemId, toggleEditorModal } from '@mono/ui'

import type { Item, UUID } from '@mono/feature'
type ListItemCollapsibleProps = {
  itemId: UUID
}

export function ListItemCollapsible({
  itemId,
}: ListItemCollapsibleProps): JSX.Element | null {
  const dispatch = useAppDispatch()

  const { openAll } = useAppSelector((state) => state.ui)
  const [open, setOpen] = useState(openAll)

  useEffect(() => {
    setOpen(openAll)
  }, [openAll])

  const { currentItem } = useFindAllItemsQuery<{
    currentItem: Item | undefined
  }>(undefined, {
    selectFromResult: ({ data }) => ({
      currentItem: data?.find((item) => item._id === itemId),
    }),
  })

  const [deleteItem] = useDeleteItemMutation()

  const handleClickDelete = async () => {
    try {
      if (currentItem === undefined) throw new TypeError('Item is undefined')
      await deleteItem(currentItem._id)
    } catch (e) {
      console.error(e)
    }
  }

  return currentItem ? (
    <>
      <div className="flex flex-row justify-between p-4 shadow rounded-t-xl">
        <div>
          <div className="m-1 text-xl font-bold font-sans-serif text-sky-600">
            {currentItem.title || 'Untitled'}
          </div>
          <div className="m-1 text-xs font-light text-gray-500">
            {new Date(
              currentItem.modified_time ?? currentItem.created_time
            ).toLocaleString()}
          </div>
        </div>
        <div className="flex flex-row items-end space-x-1 text-sm">
          <button
            className="p-1 pl-4 pr-4 font-semibold text-gray-100 duration-200 rounded shadow-sm active:bg-sky-300 bg-sky-500 hover:bg-sky-400 hover:shadow-lg"
            onClick={() => {
              dispatch(setActiveItemId(currentItem._id))
              dispatch(toggleEditorModal())
            }}
          >
            Edit
          </button>
          <button
            className="p-1 pl-4 pr-4 font-semibold text-gray-100 duration-200 rounded shadow-sm active:bg-rose-300 bg-slate-400 hover:bg-rose-400 hover:shadow-rose-300"
            onClick={handleClickDelete}
          >
            Delete
          </button>
          <button
            className="p-1 pl-4 pr-4 font-semibold text-gray-100 duration-200 rounded shadow-sm active:bg-sky-300 bg-sky-500 hover:bg-sky-400 hover:shadow-lg"
            onClick={() => setOpen((_) => !_)}
          >
            {open ? '〈' : '〉'}
          </button>
        </div>
      </div>
      {open && (
        <div className="p-3 pl-5 pr-5 font-light text-gray-500 whitespace-pre-wrap bg-gray-100 border shadow-sm rounded-b-xl font-sans-serif">
          {currentItem.content || (
            <div className="text-sm text-gray-400 font-sans-serif">-</div>
          )}
        </div>
      )}
    </>
  ) : null
}
