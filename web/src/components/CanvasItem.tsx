interface CanvasItemProps {
	x: number
	y: number
	show?: boolean
	children: React.ReactNode
}

export default function CanvasItem({
	x,
	y,
	show = false,
	children,
}: CanvasItemProps) {
	if (!show) return null

	return (
		<div
			style={{ position: 'absolute', top: `${y}px`, left: `${x}px` }}
			className="-translate-x-1/2 -translate-y-1/2 transform"
		>
			{children}
		</div>
	)
}
