import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { UUID } from '@mono/feature'
import type { UIState } from './'

const initialState = {
  activeItemId: undefined, // unsaved draft has null id
  showEditorModal: false,
  openAll: false,
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
    toggleOpenAll: (state: UIState) => {
      state.openAll = !state.openAll
    },
  },
})

export const { setActiveItemId, toggleEditorModal, toggleOpenAll } =
  uiSlice.actions
export const uiReducer = uiSlice.reducer
