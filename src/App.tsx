import React from 'react'
import './App.scss'
import Icon from '@mdi/react'
import { mdiChevronDown, mdiDebugStepOver, mdiEye, mdiPencil, mdiPlay, mdiRabbit } from '@mdi/js'

function App() {
	return (
		<div className="App">
			<div className="overlay-wrapper">
				<div className="overlay gap-2 p-relative grow-1 ma-3 justify-center">
					<div className="model-views d-flex pa-half gap-2 ar-container">
						<button className="button button-selected">Thermal</button>
						<button className="button">Subsystem</button>
					</div>
					<div className="model-options d-flex flex-column justify-center items-end gap-2">
						<div className="d-flex gap-2">
							<button className="button button-fill">Help</button>
							<button className="button button-fill">Teprom</button>
						</div>
					</div>
					<div className="component-view">
						<div className=" ar-container ar-border pa-2 d-flex flex-column gap-2">
							<div className="component-label d-flex">
								<span className="text-bold">Bateria #1</span>
								<button className="icon-wrapper">
									<Icon path={mdiChevronDown} size={1} color={'#fff'} />
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
					</div>
					<div className="toolbar">
						<div className="d-flex justify-end">
							<div className="ar-container d-flex justify-end items-end pa-1 border-circle gap-2">
								<button className="icon-wrapper button-icon">
									<Icon path={mdiEye} size={1} color={'#fff'} />
								</button>

								<button className="icon-wrapper button-icon">
									<Icon path={mdiPencil} size={1} color={'#fff'} />
								</button>
							</div>
						</div>
					</div>
					<div className="player ar-container pa-1 d-flex justify-space-between gap-1">
						<div className="d-flex align-center gap-1">
							<button className="icon-wrapper">
								<Icon path={mdiPlay} size={1} />
							</button>
							<span>0:00:01 / 10:51:32</span>
						</div>
						<div className="grow-1 d-flex align-center ph-2">
							<div className="ball"></div>
							<div className="line"></div>
						</div>
						<div className="d-flex align-center gap-1">
							<div>09/20/2024 - 10:25:32</div>
							<button className="button-small ar-container">2x</button>
							<button className="button-small icon-wrapper ar-container">
								<Icon path={mdiDebugStepOver} size={'1rem'}></Icon>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
