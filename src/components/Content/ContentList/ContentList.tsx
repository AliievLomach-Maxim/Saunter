import { ReactElement } from 'react'
import { List, Typography } from 'antd'
import { NodeIndexOutlined, StarFilled } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import { IPath } from '../../../models/models'

interface ContentListProps {
	path: IPath[]
}

export const ContentList: Function = (
	props: ContentListProps
): ReactElement => {
	const { id } = useParams<{ id: string }>()
	const navigate = useNavigate()
	const handleClick = (event: any) => {
		navigate(`/${event.id}`)
	}

	return (
		<List
			className='list'
			style={{ overflow: 'auto' }}
			dataSource={props.path}
			renderItem={(item, index) => (
				<List.Item
					className={item.id === id ? ' active' : ''}
					key={index}
					onClick={() => handleClick(item)}
					style={{
						cursor: 'pointer',
						margin: 14,
						padding: 14,
					}}
				>
					<List.Item.Meta
						avatar={<NodeIndexOutlined style={{ fontSize: 36 }} />}
						title={
							item.favorite ? (
								<>
									<StarFilled />
									{` ${item.title}`}
								</>
							) : (
								item.title
							)
						}
						description={
							<Typography.Text>{item.shotDescription}</Typography.Text>
						}
					/>
					<Typography.Title level={3} style={{ marginLeft: 14 }}>
						{item.length >= 1000
							? `${(item.length / 1000).toFixed(2)} km`
							: `${item.length} m`}
					</Typography.Title>
				</List.Item>
			)}
		/>
	)
}
