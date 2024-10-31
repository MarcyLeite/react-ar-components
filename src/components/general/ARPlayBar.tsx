import { MouseEvent, useEffect, useRef, useState } from 'react'
import './ARPlayBar.scss'

type ARPlayBarProps = {
	maxTime: number
	currentTime: number
	onCurrentTimeUpdate: (time: number) => void
	onTrackChange: (isTracking: boolean) => void
}

const ARPlayBar = ({
	maxTime,
	currentTime,
	onTrackChange,
	onCurrentTimeUpdate,
}: ARPlayBarProps) => {
	const [isDrag, setDrag] = useState(false)

	const containerRef = useRef<HTMLDivElement>(null)
	const selectorRef = useRef<HTMLDivElement>(null)
	const playedBarRef = useRef<HTMLDivElement>(null)

	const selectTime = () => {
		setDrag(false)
	}

	const updateBarLength = (offset: number) => {
		const selectorElement = selectorRef.current
		const containerElement = containerRef.current
		const playedBarElement = playedBarRef.current
		if (!selectorElement || !containerElement || !playedBarElement) return

		selectorElement.style.left = `${offset - selectorElement.clientWidth / 2}px`
		playedBarElement.style.width = `${offset}px`
	}

	const slideMove = (e: MouseEvent, force = false) => {
		if (!isDrag && !force) return
		const selectorElement = selectorRef.current
		const containerElement = containerRef.current
		const playedBarElement = playedBarRef.current
		if (!selectorElement || !containerElement || !playedBarElement) return

		const rawOffset = e.clientX - containerElement.getClientRects()[0].left

		const offset =
			rawOffset < 0
				? 0
				: rawOffset > containerElement.clientWidth
					? containerElement.clientWidth
					: rawOffset

		updateBarLength(offset)
		const computedTime = Math.floor((offset * maxTime) / containerElement.clientWidth)
		onCurrentTimeUpdate(computedTime)
	}

	useEffect(() => {
		if (isDrag) return
		const containerElement = containerRef.current
		if (!containerElement) return
		const offset = (currentTime * containerElement.clientWidth) / maxTime
		updateBarLength(offset)
	}, [currentTime, isDrag, maxTime])

	useEffect(() => {
		onTrackChange(isDrag)
	}, [isDrag, onTrackChange])

	return (
		<div
			ref={containerRef}
			onMouseDown={(e) => {
				setDrag(true)
				slideMove(e, true)
			}}
			onMouseMove={(e) => slideMove(e)}
			onMouseUp={() => selectTime()}
			onMouseLeave={() => selectTime()}
			className="playbar-container pv-1"
		>
			<div className="playbar-line border-round-pill elevate-2"></div>
			<div ref={playedBarRef} className="playbar-played-line border-round-pill"></div>
			<div ref={selectorRef} className="playbar-selector border-round-pill elevate-2"></div>
		</div>
	)
}

export default ARPlayBar
