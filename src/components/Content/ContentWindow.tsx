import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { message, Spin } from 'antd'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { getAllPaths } from '../../store/actions/pathActions'
import { ContentList } from './ContentList/ContentList'
import { Search } from './Search/Search'
import { IPath } from '../../models/models'

export const ContentWindow = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const { path, error, loading, update, dell } = useAppSelector(
		(state) => state.path
	)
	const [searchText, setSearchText] = useState('')
	const [data, setData] = useState<IPath[]>([])

	useEffect(() => {
		update && dispatch(getAllPaths())
	}, [dispatch, update])

	useEffect(() => {
		error && message.error(error)
	}, [error])

	useEffect(() => {
		dell && message.success('Path delete succefull')
		navigate('/')
	}, [dell])

	useEffect(() => {
		setData(path)
	}, [path])

	useEffect(() => {
		const filteredArr = path.filter(
			(el) =>
				el.title.toLowerCase().includes(searchText.toLowerCase()) ||
				el.shotDescription.toLowerCase().includes(searchText.toLowerCase())
		)
		searchText ? setData(filteredArr) : setData(path)
	}, [searchText])

	return (
		<div
			style={{
				padding: '16px',
			}}
		>
			{loading && <Spin className='example' size='large' />}
			<Search setSearchText={setSearchText} />
			<ContentList path={data} />
		</div>
	)
}
