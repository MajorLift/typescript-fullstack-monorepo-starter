import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'

import { useCreateItemMutation, useFindAllItemsQuery, useUpdateItemMutation } from '@mono/api'
import { useAppDispatch, useAppSelector } from '@mono/core'
import { setActiveItemId, toggleEditorModal } from '@mono/ui'

import type { Item } from '@mono/feature'
export const EditorModal = (): JSX.Element | null => {
  const dispatch = useAppDispatch()
  const { activeItemId, showEditorModal } = useAppSelector((state) => state.ui)

  const { data } = useFindAllItemsQuery()
  const { items } = data || {}

  const [createItem] = useCreateItemMutation()
  const [updateItem] = useUpdateItemMutation()

  const [activeItem, setActiveItem] = useState<Item | undefined>()
  const [titleText, setTitleText] = useState<string>('')
  const [contentText, setContentText] = useState<string>('')

  useEffect(() => {
    setActiveItem(items?.find((item) => item._id === activeItemId))
    setTitleText(activeItem?.title || '')
    setContentText(activeItem?.content || '')
  }, [activeItemId, activeItem?.title, activeItem?.content, items])

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
        await createItem({
          ...newContents,
          _id: uuid(),
          created_time: new Date().toLocaleString(),
        }).unwrap()
      } else if (activeItemId) {
        await updateItem({
          itemId: activeItemId,
          body: {
            ...newContents,
            _id: activeItemId,
            modified_time: new Date().toLocaleString(),
          },
        }).unwrap()
      }
    } catch (e) {
      console.error(e)
    }
    handleClear()
  }

  return showEditorModal && (!activeItemId || activeItem) ? (
    <>
      <div
        className="fixed inset-0 bg-black opacity-25"
        onClick={handleClear}
      />
      <div className="fixed flex flex-col justify-between p-5 bg-gray-100 rounded-md inset-5 min-w-fit">
        <input
          className="p-1 text-gray-600 bg-gray-100 rounded"
          type="text"
          placeholder={`Untitled - ${new Date().toLocaleString()}`}
          onChange={(e) => setTitleText(e.target.value)}
          defaultValue={titleText}
        />
        <textarea
          className="p-2 text-gray-600 rounded bg-gray-50 h-4/5"
          onChange={(e) => setContentText(e.target.value)}
          defaultValue={contentText}
        />
        <div className="flex flex-row justify-between ml-10 mr-10 space-x-5">
          <button
            className="p-1 pl-4 pr-4 font-semibold text-gray-100 bg-gray-500 rounded shadow-sm gray-500 hover:bg-gray-400 hover:shadow-gray-500"
            onClick={handleClear}
          >
            Cancel
          </button>
          <button
            className="p-1 pl-4 pr-4 font-bold text-gray-100 rounded shadow-sm bg-sky-500 focus:border-black hover:bg-sky-400 hover:shadow-xl"
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
