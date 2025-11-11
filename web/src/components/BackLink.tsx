import { Undo2 } from 'lucide-react'
import { useNavigate } from 'react-router'

export default function BackLink() {
	const navigate = useNavigate()

	return (
		<button
			type="button"
			onClick={() => navigate(-1)}
			aria-label="Go back"
			className="inline-block cursor-pointer transition-transform duration-300 hover:rotate-360"
		>
			<Undo2 strokeWidth={1.5} size={32} color="#fd1c23" />
		</button>
	)
}
