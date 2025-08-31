interface Props {
	children: React.ReactNode
}

export default function Dropdown({ children }: Props) {
	return <ul>{children}</ul>
}
