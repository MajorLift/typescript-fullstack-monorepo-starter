/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { itemsApi } from '@mono/api'
import { itemsReducer } from '@mono/feature'
import { uiReducer } from '@mono/ui'
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    ui: uiReducer,
    [itemsApi.reducerPath]: itemsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(itemsApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
