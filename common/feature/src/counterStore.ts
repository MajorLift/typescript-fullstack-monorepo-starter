import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'feature',
  initialState: 0,
  reducers: {
    increment: (state: number, action: PayloadAction<number>) => state + action.payload,
    decrement: (state: number, action: PayloadAction<number>) => state - action.payload,
  },
})

export const { increment, decrement } = counterSlice.actions
export const counterReducer = counterSlice.reducer
