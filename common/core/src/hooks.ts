import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import type { AppDispatch, RootState } from '.'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
