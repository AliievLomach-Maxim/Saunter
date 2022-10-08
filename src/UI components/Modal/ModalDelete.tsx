import { Modal } from 'antd'
import { useAppDispatch } from '../../hooks/redux'
import { dellPath } from '../../store/actions/pathActions'
import { DeleteOutlined } from '@ant-design/icons'

interface Props {
	ID: string
}

export const ModalDelete = (props: Props) => {
	const dispatch = useAppDispatch()
	const confirm = () => {
		Modal.confirm({
			title: 'Are you sure you want to delete this path?',
			okText: 'Dell',
			cancelText: 'Cancel',
			onOk: () => dispatch(dellPath(props.ID)),
			autoFocusButton: null,
		})
	}
	return <DeleteOutlined key='delete' onClick={confirm} />
}
