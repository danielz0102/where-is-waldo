import { Undo2 } from 'lucide-react'
import { Link } from 'react-router'

export default function HomeLink() {
	return (
		<Link
			to="/"
			aria-label="Home"
			className="inline-block transition-transform duration-300 hover:rotate-360"
		>
			<Undo2 strokeWidth={1.5} size={32} color="#fd1c23" />
		</Link>
	)
}
