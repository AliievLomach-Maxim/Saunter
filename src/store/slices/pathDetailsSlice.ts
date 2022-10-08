import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IPath } from '../../models/models'

interface PathState {
	pathDetails: IPath[]
	loading: boolean
	error: string
}

const initialState: PathState = {
	pathDetails: [],
	loading: false,
	error: '',
}

export const pathDetailsSlice = createSlice({
	name: 'path',
	initialState,
	reducers: {
		fetchingDetails(state) {
			state.loading = true
			state.error = ''
		},
		fetchSuccessDetails(state, action: PayloadAction<IPath[]>) {
			state.loading = false
			state.pathDetails = action.payload
		},
		fetchErrorDetails(state, action: PayloadAction<Error>) {
			state.loading = false
			state.error = action.payload.message
		},
	},
})

export default pathDetailsSlice.reducer
