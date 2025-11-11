import clsx from 'clsx'

interface OverlayProps {
	className?: string
	children?: React.ReactNode
}

export default function Overlay({ className, children }: OverlayProps) {
	return (
		<div
			className={clsx(
				'min-h-screen bg-gradient-to-br from-blue-100 to-red-100 p-4',
				className
			)}
		>
			{children}
		</div>
	)
}
