import Icon from '@mdi/react'
import { mdiChevronDown } from '@mdi/js'

import './ARComponentInfo.scss'

const ARComponentInfo = () => {
	return (
		<div className="d-flex flex-column gap-1">
			<div className="d-flex justify-space-between align-center">
				<span className="text-bold">Bateria #1</span>
				<button className="icon-wrapper transparent pa-0">
					<Icon path={mdiChevronDown} size={1} />
				</button>
			</div>
			<div className="component-value">
				<span>Power: </span>
				<span>ON</span>
			</div>
			<table className="component-telemetry-table">
				<thead>
					<tr>
						<td>Telemetry</td>
						<td>Eng</td>

						<td>Raw</td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>A009</td>
						<td>9</td>
						<td>9</td>
					</tr>
					<tr>
						<td>A100</td>
						<td>20</td>
						<td>250</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

export default ARComponentInfo
