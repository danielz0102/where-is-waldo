import odlaw from '~assets/odlaw.webp'
import waldo from '~assets/waldo.webp'
import wizard from '~assets/wizard.webp'

export default function TargetsMenu() {
	return (
		<div>
			<button type="button">
				<img src={waldo} alt="" />
				Waldo
			</button>
			<button type="button">
				<img src={wizard} alt="" />
				Wizard
			</button>
			<button type="button">
				<img src={odlaw} alt="" />
				Odlaw
			</button>
		</div>
	)
}
