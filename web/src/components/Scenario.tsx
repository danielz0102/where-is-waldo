import { useState } from 'react'
import waldoImage from '~assets/whereswaldo.jpg'
import Dropdown from '~ui/Dropdown'

export default function Scenario() {
	const [dropdownOpen, setDropdownOpen] = useState(false)

	const handleClick = () => {
		setDropdownOpen((open) => !open)
	}

	return (
		<>
			<button type="button" onClick={handleClick}>
				<img src={waldoImage} alt="Where's Waldo scene" />
			</button>
			{dropdownOpen && <Dropdown />}
		</>
	)
}
