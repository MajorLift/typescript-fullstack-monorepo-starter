import React, { useEffect, useState } from 'react'

import {
  useCreateItemMutation,
  useFindAllItemsQuery,
  useUpdateItemMutation,
} from '@mono/api'
import { useAppDispatch, useAppSelector } from '@mono/core'
import { setActiveItemId, toggleEditorModal } from '@mono/ui'

import type { Item } from '@mono/feature'

export const EditorModal = (): JSX.Element | null => {
  const dispatch = useAppDispatch()
  const { activeItemId, showEditorModal } = useAppSelector((state) => state.ui)

  const { activeItem } = useFindAllItemsQuery<{ activeItem: Item | undefined }>(
    undefined,
    {
      selectFromResult: ({ data }) => ({
        activeItem: data?.find((item) => {
          return item._id === activeItemId
        }),
      }),
    }
  )

  const [createItem] = useCreateItemMutation()
  const [updateItem] = useUpdateItemMutation()

  const [titleText, setTitleText] = useState('')
  const [contentText, setContentText] = useState('')

  useEffect(() => {
    setTitleText(activeItem?.title ?? '')
    setContentText(activeItem?.content ?? '')
  }, [activeItem?.title, activeItem?.content])

  const handleClear = () => {
    dispatch(setActiveItemId(undefined))
    dispatch(toggleEditorModal())
    setTitleText('')
    setContentText('')
  }

  const handleSubmit = async () => {
    const newContents = {
      title: titleText,
      content: contentText,
    }
    try {
      if (activeItemId === null) {
        await createItem(newContents)
      } else if (activeItemId) {
        await updateItem({ itemId: activeItemId, body: newContents })
      }
    } catch (e) {
      console.error(e)
    }
    handleClear()
  }

  return showEditorModal && (activeItemId === undefined || !!activeItem) ? (
    <>
      <div
        className="fixed inset-0 bg-black opacity-25"
        onClick={handleClear}
      />
      <div className="fixed flex flex-col justify-between p-5 rounded-md bg-slate-700 inset-5 min-w-fit">
        <input
          className="p-1 text-gray-600 bg-gray-100 rounded-md bg-opacity-90"
          type="text"
          placeholder={`Untitled - ${new Date().toLocaleString()}`}
          onChange={(e) => setTitleText(e.target.value)}
          defaultValue={titleText}
        />
        <textarea
          className="p-2 text-gray-600 rounded-md bg-opacity-90 bg-gray-50 h-4/5"
          onChange={(e) => setContentText(e.target.value)}
          defaultValue={contentText}
        />
        <div className="flex flex-row justify-between ml-10 mr-10 space-x-5">
          <button
            className="p-1 pl-4 pr-4 font-semibold text-gray-100 duration-200 rounded shadow-sm bg-slate-500 active:bg-gray-400 hover:bg-slate-400 hover:shadow-black"
            onClick={handleClear}
          >
            Cancel
          </button>
          <button
            className="p-1 pl-4 pr-4 font-bold text-gray-100 duration-200 rounded shadow-sm active:bg-sky-300 bg-sky-500 focus:border-black hover:bg-sky-400 hover:shadow-black"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  ) : null
}
