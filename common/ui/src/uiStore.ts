import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { UUID } from '@mono/feature'

export type UIState = {
  activeNoteId?: UUID | null // new draft has null id
  showEditorModal: boolean
}

const initialState = {
  activeNoteId: undefined,
  showEditorModal: false,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveNoteId: (state: UIState, action: PayloadAction<UUID | null | undefined>) => {
      state.activeNoteId = action.payload
    },
    toggleEditorModal: (state: UIState) => {
      state.showEditorModal = !state.showEditorModal
    },
  },
})

export const { setActiveNoteId, toggleEditorModal } = uiSlice.actions
export const uiReducer = uiSlice.reducer
