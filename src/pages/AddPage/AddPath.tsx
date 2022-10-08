import { useEffect, useState } from 'react'
import { useLoadScript } from '@react-google-maps/api'
import moment from 'moment'
import {
	Button,
	Modal,
	Form,
	Row,
	Col,
	Input,
	Typography,
	ConfigProvider,
} from 'antd'
import { Timestamp } from 'firebase/firestore'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { Map } from '../../components/MapWindow/Map'
import { setNewPath } from '../../store/actions/pathActions'

const { TextArea } = Input

export const AddPath = () => {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: 'AIzaSyAIIkly6_D79RcSCSp2h1Xi5eoNhccrF4o',
	})
	const dispatch = useAppDispatch()
	const { loading, update } = useAppSelector((state) => state.path)
	const [showModal, setShowModal] = useState(false)
	const [clearMap, setClearMap] = useState(false)
	const [length, setLength] = useState<number>(0)
	const [path, setPath] = useState<
		google.maps.LatLng[] | google.maps.LatLngLiteral[] | undefined
	>()
	const [form] = Form.useForm()

	const handleCancel = () => {
		setShowModal(false)
		setClearMap(true)
		setLength(0)
		setPath(undefined)
		form.resetFields()
	}
	const createNewPath = (e: any) => {
		e.createdAt = Timestamp.now()
		e.favorite = false
		e.paths = path
		e.length = length
		dispatch(setNewPath(e))
	}

	useEffect(() => {
		update && handleCancel()
	}, [update])

	const config = {
		hasFeedback: true,
		rules: [
			{
				required: true,
			},
		],
	}

	return (
		<>
			<Button onClick={() => setShowModal(true)}>Add path</Button>
			<Modal
				className='modal'
				title='Add new path'
				open={showModal}
				onCancel={handleCancel}
				bodyStyle={{ paddingTop: 0, paddingBottom: 0 }}
				footer={null}
			>
				<Row justify='space-between'>
					<Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 11 }}>
						<ConfigProvider locale={{ locale: moment.locale() }}>
							<Form
								form={form}
								colon={true}
								name='basic'
								initialValues={{ remember: true }}
								autoComplete='off'
								layout='vertical'
								onFinish={(e) => {
									createNewPath(e)
								}}
								requiredMark={false}
							>
								<Form.Item
									{...config}
									label={'Title'}
									name='title'
									style={{ marginTop: 14 }}
								>
									<Input placeholder={'Input title'} />
								</Form.Item>
								<Form.Item
									{...config}
									label={'Shot Description'}
									name='shotDescription'
									style={{ marginTop: 14 }}
								>
									<TextArea
										placeholder={'Input shot Description'}
										showCount
										minLength={9}
										maxLength={160}
										rows={3}
									/>
								</Form.Item>
								<Form.Item
									{...config}
									label={'Full Description'}
									name='fullDescription'
									style={{ marginTop: 14 }}
								>
									<TextArea placeholder={'Input full Description'} rows={6} />
								</Form.Item>
								<Form.Item name='length'>
									<Row align='middle' justify='center'>
										<Col>
											<i
												className='material-icons'
												style={{ fontSize: '48px' }}
											>
												map
											</i>
										</Col>
										<Col offset={1}>
											<Typography.Text>
												Length:{' '}
												{length
													? length > 1000
														? `${(length / 1000).toFixed(2)} km`
														: `${length} m`
													: '...'}
											</Typography.Text>
										</Col>
									</Row>
								</Form.Item>
								<Form.Item>
									<Row justify='center' style={{ padding: 24 }}>
										<Col>
											<Button onClick={handleCancel}>{'Cancel'}</Button>
										</Col>
										<Col>
											<Button
												style={{ marginLeft: 14 }}
												htmlType='submit'
												type='primary'
												loading={loading}
											>
												{'Add new Path'}
											</Button>
										</Col>
									</Row>
								</Form.Item>
							</Form>
						</ConfigProvider>
					</Col>
					<Col
						xs={{ span: 24 }}
						sm={{ span: 24 }}
						md={{ span: 11 }}
						lg={{ span: 12 }}
						style={{ marginTop: 24 }}
					>
						{isLoaded && (
							<Map
								clearMap={clearMap}
								setClearMap={setClearMap}
								setLength={setLength}
								setPath={setPath}
							/>
						)}
					</Col>
				</Row>
			</Modal>
		</>
	)
}
