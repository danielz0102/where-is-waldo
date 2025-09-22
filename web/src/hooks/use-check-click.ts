import { useQuery } from '@tanstack/react-query'
import { checkClick } from '~services/characters-service'

export function useCheckClick({
	id,
	x,
	y,
}: {
	id: string
	x: number
	y: number
}) {
	return useQuery({
		queryKey: ['checkClick', id, x, y],
		queryFn: async () => {
			const hasBeenClicked = await checkClick({ id, x, y })
			return hasBeenClicked
		},
		refetchOnWindowFocus: false,
	})
}
