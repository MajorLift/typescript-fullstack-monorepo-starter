import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'

import { useCreateItemMutation } from '@mono/api'
import { useAppDispatch, useAppSelector } from '@mono/core'
import { addItem, editItem } from '@mono/feature'
import { setActiveItemId, toggleEditorModal } from '@mono/ui'

export const EditorModal = (): JSX.Element | null => {
  const { activeItemId, showEditorModal } = useAppSelector((state) => state.ui)
  const activeItem = useAppSelector(
    (state) => state.items.filter((item) => item.id === activeItemId)[0]
  )
  const [createItem, { isLoading }] = useCreateItemMutation()

  const dispatch = useAppDispatch()

  const [contentText, setContentText] = useState<string | null>(null)
  const [titleText, setTitleText] = useState<string | null>(null)

  return activeItemId !== undefined && showEditorModal ? (
    <>
      <div
        className="fixed inset-0 bg-black opacity-25"
        onClick={() => dispatch(toggleEditorModal())}
      />
      <div className="fixed flex flex-col justify-between p-5 bg-white rounded-md bg-opacity-90 inset-10 min-w-fit">
        <input
          className="p-1 text-gray-600 border-gray-100 rounded"
          type="text"
          placeholder={`Untitled - ${new Date().toLocaleString()}`}
          onChange={(e) => setTitleText(e.target.value)}
          defaultValue={activeItem?.title || titleText || ''}
        />
        <textarea
          className="p-2 text-gray-600 border-gray-100 rounded h-4/5"
          onChange={(e) => setContentText(e.target.value)}
          defaultValue={activeItem?.content || contentText || ''}
          required
        />
        <div className="flex flex-row justify-between ml-10 mr-10 space-x-5">
          <button
            className="p-1 pl-4 pr-4 font-semibold text-gray-100 bg-gray-500 rounded shadow-sm gray-500 hover:bg-gray-400 hover:shadow-gray-500"
            onClick={() => {
              dispatch(setActiveItemId(undefined))
              dispatch(toggleEditorModal())
              setTitleText(null)
              setContentText(null)
            }}
          >
            Cancel
          </button>
          <button
            className="p-1 pl-4 pr-4 font-bold text-gray-100 rounded shadow-sm bg-sky-500 focus:border-black hover:bg-sky-400 hover:shadow-xl"
            type="submit"
            onClick={() => {
              const newContents = {
                title: titleText || '',
                content: contentText || '',
              }
              dispatch(
                activeItemId === null
                  ? createItem({
                      ...newContents,
                      _id: uuid(),
                      created_time: new Date().toLocaleString(),
                    }).unwrap()
                  : editItem({ ...newContents, id: activeItemId })
              )
              dispatch(toggleEditorModal())
              setTitleText(null)
              setContentText(null)
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  ) : null
}
