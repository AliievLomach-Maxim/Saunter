import { Link } from 'react-router-dom'
import { Col, Layout, Row, Typography } from 'antd'
import { NodeIndexOutlined } from '@ant-design/icons'
import { AddPath } from '../../pages/AddPage/AddPath'

const { Header } = Layout

export const HeaderMain = () => {
	return (
		<Header style={{ backgroundColor: 'black' }}>
			<Row justify='space-between'>
				<Col>
					<Typography.Title>
						<NodeIndexOutlined style={{ fontSize: 48 }} />
						<Link to='/'>Saunter</Link>
					</Typography.Title>
				</Col>
				<Col>
					<AddPath />
				</Col>
			</Row>
		</Header>
	)
}
