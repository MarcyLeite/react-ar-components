import ARPanel from './general/ARPanel'
import ARPlayBar from './general/ARPlayBar'
import Icon from '@mdi/react'
import { mdiPlay, mdiPlaySpeed, mdiDebugStepOver, mdiPause } from '@mdi/js'
import { useEffect, useRef, useState } from 'react'

import './ARPlayer.scss'
import ARTooltip from './general/ARTooltip'

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
	const [maxTime, setMaxTime] = useState(0)
	const [currentTime, setCurrentTime] = useState(0)

	const [speed, setSpeed] = useState(1)
	const [showSpeedMenu, setShowSpeedMenu] = useState(false)
	const [showJumpMenu, setShowJumpMenu] = useState(false)

	const [isPlaying, setIsPlaying] = useState(false)

	const requestRef = useRef(0)
	const frameLastRef = useRef(0)
	const isHoldingRef = useRef(false)

	const fromDateRef = useRef<HTMLInputElement>(null)
	const toDateRef = useRef<HTMLInputElement>(null)

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

	useEffect(() => {
		requestRef.current = requestAnimationFrame(executeFrame)
		return () => cancelAnimationFrame(requestRef.current)
	})

	const jump = () => {
		const fromDateElement = fromDateRef.current
		const toDateElement = toDateRef.current

		if (
			!fromDateElement ||
			!toDateElement ||
			[toDateElement.valueAsNumber, fromDateElement.valueAsNumber].includes(NaN)
		)
			return
		setMaxTime(toDateElement.valueAsNumber - fromDateElement.valueAsNumber)
		setCurrentTime(0)
	}

	useEffect(jump, [fromDateRef, toDateRef])

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
							{`${secondsToTimestring(currentTime)} / ${secondsToTimestring(maxTime)}`}
						</span>
					</div>
					<div className="d-flex align-center gap-1">
						<div className="p-relative">
							<ARTooltip active={showSpeedMenu} setActive={setShowSpeedMenu}>
								<div className="d-flex gap-1">
									{speedList.map((speedValue, i) => (
										<button
											onClick={() => setSpeed(speedValue)}
											className={
												'transparent' +
												(speedValue === speed ? ' selected' : '')
											}
											key={i}
										>
											{speedValue}x
										</button>
									))}
								</div>
							</ARTooltip>
							<button
								onClick={(e) => {
									e.stopPropagation()
									setShowSpeedMenu(!showSpeedMenu)
								}}
								className="icon-wrapper transparent hover-shake"
							>
								<Icon path={mdiPlaySpeed} size={1} />
							</button>
						</div>
						<div className="p-relative">
							<ARTooltip active={showJumpMenu} setActive={setShowJumpMenu}>
								<div className="d-flex pa-1 gap-1 align-center">
									<div
										style={{
											display: 'grid',
											gridTemplateColumns: 'min-content 1fr',
											gridAutoRows: 'min-content 1fr',
											alignItems: 'center',
											textAlign: 'right',
											gap: '0.5rem',
										}}
									>
										<label>From</label>
										<input
											ref={fromDateRef}
											type="datetime-local"
											onChange={(e) => {
												if (
													!toDateRef.current ||
													(toDateRef.current.value !== '' &&
														toDateRef.current.valueAsNumber >
															e.target.valueAsNumber)
												)
													return

												toDateRef.current.valueAsNumber =
													e.target.valueAsNumber + 5000 * 60
											}}
										/>
										<label>To</label>
										<input ref={toDateRef} type="datetime-local" />
									</div>
									<button onClick={jump} className="transparent">
										Jump
									</button>
								</div>
							</ARTooltip>
							<button
								onClick={(e) => {
									e.stopPropagation()
									setShowJumpMenu(!showJumpMenu)
								}}
								className="icon-wrapper transparent hover-shake"
							>
								<Icon path={mdiDebugStepOver} size={1}></Icon>
							</button>
						</div>
					</div>
				</div>
			</div>
		</ARPanel>
	)
}

export default ARPlayer
