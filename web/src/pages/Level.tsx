import { useScenario } from '~/hooks/useScenario'
import Scenario from '~components/Scenario'

export default function Level() {
	const { data, isLoading } = useScenario('main')

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (data) {
		return <Scenario data={data} />
	}
}
