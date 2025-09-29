import { Crosshair } from 'lucide-react'

export default function TargetBox() {
	return (
		<div className="rounded-full border-2 border-red-500 border-dashed bg-neutral-700/70 p-4">
			<Crosshair size={16} color="#fb2c36" />
		</div>
	)
}
