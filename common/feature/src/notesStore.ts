import { v4 as uuid } from 'uuid'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { UUID, Note, NotesState } from '.'

const initialState: NotesState = [
  {
    id: uuid(),
    created_at: new Date().toLocaleString(),
    title: 'Sample Note 1',
    body: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  },
  {
    id: uuid(),
    created_at: new Date().toLocaleString(),
    title: 'Sample Note 2',
    body: '\tLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \n\tDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: uuid(),
    created_at: new Date().toLocaleString(),
    title: 'Sample Note 3',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
]

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state: NotesState, action: PayloadAction<Note>) => {
      state.unshift({ ...action.payload })
    },
    editNote: (state: NotesState, action: PayloadAction<{ id: UUID; title: string | null; body: string | null }>) => {
      return state.map((note) => {
        if (note.id === action.payload.id) {
          return {
            ...note,
            modified_at: new Date().toLocaleString(),
            title: action.payload.title || '',
            body: action.payload.body || '',
          }
        }
        return note
      })
    },
    deleteNote: (state: NotesState, action: PayloadAction<UUID>) => {
      return state.filter(({ id }) => id !== action.payload)
    },
  },
})

export const { addNote, editNote, deleteNote } = notesSlice.actions
export const notesReducer = notesSlice.reducer
