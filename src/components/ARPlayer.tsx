import ARPanel from './general/ARPanel'
import ARPlayBar from './general/ARPlayBar'
import Icon from '@mdi/react'
import { mdiPlay, mdiPlaySpeed, mdiDebugStepOver, mdiPause } from '@mdi/js'
import { MouseEvent, useEffect, useRef, useState } from 'react'

import './ARPlayer.scss'

type Props = {
	speeds: number[]
}

const secondsToTimestring = (time: number) => {
	time = Math.floor(time)
	const hours = Math.floor(time / 3600000)
	const minutes = Math.floor((time - hours * 3600000) / 60000)
	const seconds = Math.floor((time - hours * 3600000 - minutes * 60000) / 1000)

	const timeString =
		hours.toString().padStart(2, '0') +
		':' +
		minutes.toString().padStart(2, '0') +
		':' +
		seconds.toString().padStart(2, '0')
	return timeString
}

const ARPlayer = ({ speeds: speedList }: Props) => {
	const maxTime = 367630
	const [currentTime, setCurrentTime] = useState(0)
	const [speed, setSpeed] = useState(1)
	const [isPlaying, setIsPlaying] = useState(false)

	const requestRef = useRef(0)
	const frameLastRef = useRef(0)
	const isHoldingRef = useRef(false)
	const speedMenuRef = useRef<HTMLDivElement>(null)

	const executeFrame = (frameCurrent: number) => {
		if (isPlaying && !isHoldingRef.current) {
			const interval = frameCurrent - frameLastRef.current
			const rawNextTime = currentTime + interval * speed
			const nextTime = rawNextTime <= maxTime ? rawNextTime : maxTime

			setCurrentTime(nextTime)
			if (rawNextTime >= maxTime) setIsPlaying(false)
		}
		frameLastRef.current = frameCurrent
		requestRef.current = requestAnimationFrame(executeFrame)
	}

	const closeSpeedMenu = (e: Event) => {
		if (e.target === speedMenuRef.current) return
		window.removeEventListener('click', closeSpeedMenu)
	}

	useEffect(() => {
		requestRef.current = requestAnimationFrame(executeFrame)
		return () => cancelAnimationFrame(requestRef.current)
	})

	return (
		<ARPanel className="pa-3 elevate-3 border-round">
			<div className="pa-1 d-flex flex-column gap-2">
				<ARPlayBar
					maxTime={maxTime}
					currentTime={currentTime}
					onTrackChange={(isTracking) => {
						isHoldingRef.current = isTracking
					}}
					onCurrentTimeUpdate={setCurrentTime}
				/>
				<div className="d-flex align-center gap-1 justify-space-between">
					<div className="d-flex align-center gap-1">
						<button
							onClick={() => setIsPlaying(!isPlaying)}
							className="icon-wrapper transparent"
						>
							<Icon path={isPlaying ? mdiPause : mdiPlay} size={1} />
						</button>
						<span>
							{secondsToTimestring(currentTime)} / {secondsToTimestring(maxTime)}
						</span>
					</div>
					<div className="d-flex align-center gap-1">
						<div className="p-relative">
							<button className="icon-wrapper transparent hover-shake">
								<Icon path={mdiPlaySpeed} size={1} />
							</button>
						</div>
						<button className="icon-wrapper transparent hover-shake">
							<Icon path={mdiDebugStepOver} size={1}></Icon>
						</button>
					</div>
				</div>
			</div>
		</ARPanel>
	)
}

export default ARPlayer
