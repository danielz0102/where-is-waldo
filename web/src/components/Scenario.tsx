import { useState } from 'react'
import waldoImage from '~assets/whereswaldo.jpg'
import TargetsMenu from './TargetsMenu'

export default function Scenario() {
	const [menuOptions, setMenuOptions] = useState({ open: false, x: 0, y: 0 })

	const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
		setMenuOptions(({ open }) => ({
			open: !open,
			x: event.clientX,
			y: event.clientY,
		}))
	}

	return (
		<>
			<canvas
				onClick={handleClick}
				width={800}
				height={600}
				data-testid="scenario"
				style={{
					backgroundImage: `url(${waldoImage})`,
					backgroundSize: 'cover',
					cursor: 'crosshair',
				}}
			/>
			{menuOptions.open && <TargetsMenu x={menuOptions.x} y={menuOptions.y} />}
		</>
	)
}
