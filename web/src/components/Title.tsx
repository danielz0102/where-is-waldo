import clsx from 'clsx'

interface TitleProps {
	children: React.ReactNode
	className?: string
}

export default function Title({ children, className }: TitleProps) {
	return (
		<h1 className={clsx('mb-6 font-bold text-6xl text-gray-800', className)}>
			{children}
		</h1>
	)
}
