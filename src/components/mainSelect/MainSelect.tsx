interface Option {
	value: string
	label: string
}

interface ISelectProps {
	value: string
	onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
	options: Option[] | []
}

export const Select = ({ value, onChange, options }: ISelectProps) => {
	return (
		<select value={value} onChange={onChange}>
			<option disabled>Выберите бренд</option>
			{options?.map(option => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
		</select>
	)
}
