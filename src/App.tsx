import React from 'react'
import './App.scss'
import Icon from '@mdi/react'
import { mdiDebugStepOver, mdiEye, mdiPencil, mdiPlay, mdiChevronDown, mdiPlaySpeed } from '@mdi/js'
import ARTab from './components/general/ARTab'
import ARPanel from './components/general/ARPanel'
import ARPlayBar from './components/general/ARPlayBar'
import ARComponentInfo from './components/ARComponentInfo'

function App() {
	return (
		<div className="App">
			<div className="grid-center overlay-wrapper">
				<div className="overlay gap-2 p-relative grow-1 ma-3 justify-center">
					<div className="view-wrapper d-flex justify-end align-center">
						<ARTab tabs={['Tab #1', 'Tab #2']}></ARTab>
					</div>
					<div className="options-wrapper d-flex justify-end align-center">
						<div className="d-flex gap-2">
							<button className="button button-fill">Help</button>
							<button className="button button-fill">Teprom</button>
						</div>
					</div>

					<div className="component-info-wrapper">
						<ARPanel>
							<ARComponentInfo />
						</ARPanel>
					</div>
					<div className="toolbar-wrapper d-flex justify-end align-center">
						<ARPanel pill className="w-min-content">
							<button className="icon-wrapper button-icon bg-ar-revert text-default">
								<Icon path={mdiEye} size={1} />
							</button>

							<button className="icon-wrapper button-icon bg-ar-revert text-default">
								<Icon path={mdiPencil} size={1} />
							</button>
						</ARPanel>
					</div>
					<div className="player-wrapper">
						<ARPanel>
							<div className="pa-1 d-flex flex-column gap-1">
								<ARPlayBar />
								<div className="d-flex align-center gap-1 justify-space-between">
									<div className="d-flex align-center gap-1">
										<button className="icon-wrapper transparent">
											<Icon path={mdiPlay} size={1} />
										</button>
										<span>0:00:01 / 10:51:32</span>
									</div>
									<div className="d-flex align-center gap-1">
										<button className="icon-wrapper transparent">
											<Icon path={mdiPlaySpeed} size={1} />
										</button>
										<button className="icon-wrapper transparent">
											<Icon path={mdiDebugStepOver} size={1}></Icon>
										</button>
									</div>
								</div>
							</div>
						</ARPanel>
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
