export default function MainLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-red-100">
			{children}
		</div>
	)
}
