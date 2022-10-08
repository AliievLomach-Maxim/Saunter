import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	orderBy,
	query,
	updateDoc,
	where,
} from 'firebase/firestore'
import { db } from '../../firebase'
import { AppDispatch } from '../store'
import { IPath } from '../../models/models'
import { pathsSlice } from '../slices/pathsSlice'
import { pathDetailsSlice } from '../slices/pathDetailsSlice'

export const getAllPaths = () => {
	return async (dispatch: AppDispatch) => {
		try {
			dispatch(pathsSlice.actions.fetching())
			const q = query(collection(db, 'Path'), orderBy('favorite', 'desc'))
			const querySnapshot = await getDocs(q)
			if (querySnapshot) {
				const result = querySnapshot.docs.map((doc) => doc.data())
				dispatch(pathsSlice.actions.fetchSuccess(result as IPath[]))
			}
		} catch (error) {
			dispatch(pathsSlice.actions.fetchError(error as Error))
		}
	}
}

export const setNewPath = (pathData: any) => {
	return async (dispatch: AppDispatch) => {
		try {
			dispatch(pathsSlice.actions.fetching())
			const docRef = await addDoc(collection(db, 'Path'), pathData)
			await updateDoc(doc(db, 'Path', docRef.id), {
				id: docRef.id,
			})
			dispatch(pathsSlice.actions.fetchUpdate(true))
		} catch (error) {
			dispatch(pathsSlice.actions.fetchError(error as Error))
		}
	}
}

export const getPathDetails = (id: string) => {
	return async (dispatch: AppDispatch) => {
		try {
			dispatch(pathDetailsSlice.actions.fetchingDetails())
			const q = query(collection(db, 'Path'), where('id', '==', id))
			const querySnapshot = await getDocs(q)
			if (querySnapshot) {
				const result = querySnapshot.docs.map((doc) => doc.data())
				dispatch(
					pathDetailsSlice.actions.fetchSuccessDetails(result as IPath[])
				)
			}
		} catch (error) {
			dispatch(pathDetailsSlice.actions.fetchErrorDetails(error as Error))
		}
	}
}

export const dellPath = (id: string) => {
	return async (dispatch: AppDispatch) => {
		try {
			dispatch(pathDetailsSlice.actions.fetchingDetails())
			await deleteDoc(doc(db, 'Path', id))
			dispatch(pathsSlice.actions.fetchUpdate(true))
			dispatch(pathsSlice.actions.fetchDell(true))
		} catch (error) {
			dispatch(pathDetailsSlice.actions.fetchErrorDetails(error as Error))
		}
	}
}

export const addOrRemovePathToFavorite = (id: string, favorite: boolean) => {
	return async (dispatch: AppDispatch) => {
		try {
			dispatch(pathDetailsSlice.actions.fetchingDetails())
			await updateDoc(doc(db, 'Path', id), {
				favorite,
			})
			dispatch(pathsSlice.actions.fetchUpdate(true))
			dispatch(getPathDetails(id))
		} catch (error) {
			dispatch(pathDetailsSlice.actions.fetchErrorDetails(error as Error))
		}
	}
}
