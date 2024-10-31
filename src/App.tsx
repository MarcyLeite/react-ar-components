import React from 'react'
import './App.scss'
import Icon from '@mdi/react'
import { mdiEye, mdiPencil } from '@mdi/js'
import ARTab from './components/general/ARTab'
import ARPanel from './components/general/ARPanel'
import ARComponentInfo from './components/ARComponentInfo'
import ARPlayer from './components/ARPlayer'

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
							<button className="button elevate-2">Help</button>
							<button className="button elevate-2">Teprom</button>
						</div>
					</div>

					<div className="component-info-wrapper">
						<ARPanel className="pa-3 elevate-3 border-round">
							<ARComponentInfo />
						</ARPanel>
					</div>
					<div className="toolbar-wrapper d-flex justify-end align-center">
						<ARPanel className="w-min-content pa-1 d-flex gap-2 elevate-3 pill">
							<button className="icon-wrapper transparent text-default hover-shake">
								<Icon path={mdiEye} size={1} />
							</button>

							<button className="icon-wrapper transparent text-default hover-shake">
								<Icon path={mdiPencil} size={1} />
							</button>
						</ARPanel>
					</div>
					<div className="player-wrapper">
						<ARPlayer speeds={[1, 2, 4, 16, 64, 128]}></ARPlayer>
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
