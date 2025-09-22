export default function Marker({ ok = true }) {
	return (
		<div className="flex items-center justify-center rounded-full p-2 text-sm shadow">
			{ok ? '✔️' : '❌'}
		</div>
	)
}
