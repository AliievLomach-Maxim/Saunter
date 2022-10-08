import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IPath } from '../../models/models'

interface PathState {
	path: IPath[]
	loading: boolean
	error: string
	update: boolean
	dell: boolean
}

const initialState: PathState = {
	path: [],
	loading: false,
	error: '',
	update: false,
	dell: false,
}

export const pathsSlice = createSlice({
	name: 'path',
	initialState,
	reducers: {
		fetching(state) {
			state.loading = true
			state.error = ''
			state.update = false
			state.dell = false
		},
		fetchSuccess(state, action: PayloadAction<IPath[]>) {
			state.loading = false
			state.path = action.payload
		},
		fetchUpdate(state, action: PayloadAction<boolean>) {
			state.update = action.payload
		},
		fetchDell(state, action: PayloadAction<boolean>) {
			state.dell = action.payload
		},
		fetchError(state, action: PayloadAction<Error>) {
			state.loading = false
			state.error = action.payload.message
		},
	},
})

export default pathsSlice.reducer
