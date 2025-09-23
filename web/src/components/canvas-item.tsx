interface CanvasItemProps {
	x: number
	y: number
	hidden?: boolean
	children: React.ReactNode
}

export default function CanvasItem({
	x,
	y,
	hidden = false,
	children,
}: CanvasItemProps) {
	if (hidden) {
		return null
	}

	return (
		<div
			style={{ position: 'absolute', top: `${y}px`, left: `${x}px` }}
			className="-translate-x-1/2 -translate-y-1/2 transform"
		>
			{children}
		</div>
	)
}
