import { combineReducers, configureStore } from '@reduxjs/toolkit'
import pathDetailsSlice from './slices/pathDetailsSlice'
import pathReducer from './slices/pathsSlice'

const rootReduscer = combineReducers({
	path: pathReducer,
	pathDetails: pathDetailsSlice,
})

export function setupStore() {
	return configureStore({
		reducer: rootReduscer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck: false,
			}),
	})
}

export type RootState = ReturnType<typeof rootReduscer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
