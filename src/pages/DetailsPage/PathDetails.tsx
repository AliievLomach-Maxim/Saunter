import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Card, Row, Typography } from 'antd'
import { StarOutlined, StarFilled } from '@ant-design/icons'
import { useLoadScript } from '@react-google-maps/api'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import {
	getPathDetails,
	addOrRemovePathToFavorite,
} from '../../store/actions/pathActions'
import { Map } from '../../components/MapWindow/Map'
import { ModalDelete } from '../../UI components/Modal/ModalDelete'

export const PathDetails = () => {
	const dispatch = useAppDispatch()
	const { id } = useParams()
	const ID: any = id
	const { pathDetails, loading } = useAppSelector((state) => state.pathDetails)
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: 'AIzaSyAIIkly6_D79RcSCSp2h1Xi5eoNhccrF4o',
	})

	useEffect(() => {
		dispatch(getPathDetails(ID))
	}, [dispatch, ID])

	const addOrRemoveToFavorite = (value: boolean) => {
		dispatch(addOrRemovePathToFavorite(ID, value))
	}

	return (
		pathDetails[0] && (
			<Card
				style={{ overflow: 'auto' }}
				loading={loading}
				title={
					<Typography.Title level={2}>{pathDetails[0].title}</Typography.Title>
				}
				extra={
					<Typography.Title level={3}>
						{pathDetails[0].length >= 1000
							? `${(pathDetails[0].length / 1000).toFixed(2)} km`
							: `${pathDetails[0].length} m`}
					</Typography.Title>
				}
				actions={[
					<>
						{pathDetails[0].favorite ? (
							<StarFilled
								key='favorite'
								onClick={() => addOrRemoveToFavorite(false)}
							/>
						) : (
							<StarOutlined
								key='favorite'
								onClick={() => addOrRemoveToFavorite(true)}
							/>
						)}
					</>,
					<ModalDelete ID={ID} />,
				]}
			>
				<Row style={{ marginBottom: 24 }}>
					<Typography.Text style={{ width: '100%' }}>
						{pathDetails[0].fullDescription}
					</Typography.Text>
				</Row>
				<Row>{isLoaded && <Map key={id} path={pathDetails[0].paths} />}</Row>
			</Card>
		)
	)
}
