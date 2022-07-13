import { v4 as uuid } from 'uuid'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { Item, ItemsState, UUID } from '.'

const initialState: ItemsState = [
  {
    _id: uuid(),
    created_time: new Date().toLocaleString(),
    title: '',
    content: '',
  },
  {
    _id: uuid(),
    created_time: new Date().toLocaleString(),
    title: 'Sample Item 1',
    content: `    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  },
  {
    _id: uuid(),
    created_time: new Date().toLocaleString(),
    title: 'Sample Item 2',
    content: `\tLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    \n\tDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  },
  {
    _id: uuid(),
    created_time: new Date().toLocaleString(),
    title: 'Sample Item 3',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
]

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state: ItemsState, action: PayloadAction<Item>) => {
      state.unshift({ ...action.payload })
    },
    editItem: (
      state: ItemsState,
      action: PayloadAction<{
        id: UUID
        title: string | null
        content: string | null
      }>
    ) => {
      return state.map((item) => {
        if (item._id === action.payload.id) {
          return {
            ...item,
            modified_time: new Date().toLocaleString(),
            title: action.payload.title || '',
            content: action.payload.content || '',
          }
        }
        return item
      })
    },
    deleteItem: (state: ItemsState, action: PayloadAction<UUID>) => {
      return state.filter(({ _id }) => _id !== action.payload)
    },
  },
})

export const { addItem, editItem, deleteItem } = itemsSlice.actions
export const itemsReducer = itemsSlice.reducer
