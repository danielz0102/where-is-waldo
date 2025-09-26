interface CanvasItemProps {
	x: number
	y: number
	hidden?: boolean
	className?: string
	children: React.ReactNode
}

export default function CanvasItem({
	x,
	y,
	hidden = false,
	className,
	children,
}: CanvasItemProps) {
	return (
		<div
			style={{ position: 'absolute', top: `${y}px`, left: `${x}px` }}
			className={`-translate-x-1/2 -translate-y-1/2 transform ${className}`}
			hidden={hidden}
		>
			{children}
		</div>
	)
}
