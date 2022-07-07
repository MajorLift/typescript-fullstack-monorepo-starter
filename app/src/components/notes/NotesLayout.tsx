import React from 'react'

import { EditorModal, List } from 'components/notes'

export const NotesLayout = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-gray-700">
      <EditorModal />
      <List />
    </div>
  )
}
