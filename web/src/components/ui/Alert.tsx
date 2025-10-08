import clsx from 'clsx'
import { OctagonX } from 'lucide-react'

interface AlertProps {
	children: React.ReactNode
	className?: string
}

export default function Alert({ children, className }: AlertProps) {
	return (
		<p
			className={clsx(
				'flex items-center justify-center gap-2 rounded border border-red-900 bg-red-300 p-4 text-red-900',
				className
			)}
		>
			<OctagonX />
			{children}
		</p>
	)
}
