import { useState } from 'react'
import waldoImage from '~assets/whereswaldo.jpg'
import TargetsMenu from './TargetsMenu'

export default function Scenario() {
	const [menuOpen, setMenuOpen] = useState(false)

	const handleClick = () => {
		setMenuOpen((open) => !open)
	}

	return (
		<>
			<button type="button" onClick={handleClick}>
				<img src={waldoImage} alt="Where's Waldo scene" />
			</button>
			{menuOpen && <TargetsMenu />}
		</>
	)
}
