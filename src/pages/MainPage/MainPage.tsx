import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Col, Layout, Row } from 'antd'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { getAllPaths } from '../../store/actions/pathActions'
import { HeaderMain } from '../../components/HeaderMain/HeaderMain'
import { ContentWindow } from '../../components/Content/ContentWindow'
import { EmptyPage } from '../EmptyPage/EmptyPage'

const { Content, Footer } = Layout

export const MainPage = () => {
	const dispatch = useAppDispatch()
	const { path, update } = useAppSelector((state) => state.path)

	useEffect(() => {
		dispatch(getAllPaths())
	}, [update])

	return (
		<Layout>
			<HeaderMain />
			{path.length ? (
				<Layout>
					<Row>
						<Col xs={{ span: 24 }} md={{ span: 12 }} className='sider'>
							<ContentWindow />
						</Col>
						<Col xs={{ span: 24 }} md={{ span: 12 }} className='card'>
							<Content>
								<Outlet />
							</Content>
						</Col>
					</Row>
				</Layout>
			) : (
				<Layout>
					<EmptyPage />
				</Layout>
			)}
			<Footer
				style={{
					textAlign: 'center',
					position: 'fixed',
					top: '91%',
					width: '100%',
				}}
			>
				©2022 Created Aliev-Lomach Maxim
			</Footer>
		</Layout>
	)
}
