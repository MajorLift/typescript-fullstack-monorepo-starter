import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { UIState } from './'

import type { UUID } from '@mono/feature'

const initialState = {
  activeItemId: undefined, // unsaved draft has null id
  showEditorModal: false,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveItemId: (
      state: UIState,
      action: PayloadAction<UUID | null | undefined>
    ) => {
      state.activeItemId = action.payload
    },
    toggleEditorModal: (state: UIState) => {
      state.showEditorModal = !state.showEditorModal
    },
  },
})

export const { setActiveItemId, toggleEditorModal } = uiSlice.actions
export const uiReducer = uiSlice.reducer
