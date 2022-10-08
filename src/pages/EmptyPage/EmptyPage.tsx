import { Empty, Row } from 'antd'
import { AddPath } from '../AddPage/AddPath'

export const EmptyPage = () => {
	return (
		<Row className='calcHeight'>
			<Empty className='centerEmptyList'>
				<AddPath />
			</Empty>
		</Row>
	)
}
