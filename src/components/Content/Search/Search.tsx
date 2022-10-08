import { useEffect } from 'react'
import { Input } from 'antd'
import { useInput } from '../../../hooks/input'
import { useDebounce } from '../../../hooks/debounce'

interface searchProps {
	setSearchText: (value: string) => void
}

export const Search = ({ setSearchText }: searchProps) => {
	const input = useInput()
	const debounced = useDebounce<string>(input.value)

	useEffect(() => {
		setSearchText(debounced)
	}, [debounced])

	return <Input placeholder='Search...' {...input} />
}
