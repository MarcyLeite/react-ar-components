import Icon from '@mdi/react'
import { mdiChevronDown } from '@mdi/js'

import './ARComponentInfo.scss'
import { useEffect, useRef, useState } from 'react'

const ARComponentInfo = () => {
	const contentRef = useRef<HTMLDivElement>(null)
	const expendButtonRef = useRef<HTMLButtonElement>(null)

	const [isExpended, setIsExpended] = useState(true)
	const [contentWidth, setcontentWidth] = useState<number>()
	const [contentHeight, setContentHeight] = useState<number>()

	useEffect(() => {
		if (contentHeight !== undefined) return
		const contentElement = contentRef.current
		if (!contentElement) return

		setcontentWidth(contentElement.scrollWidth)
		setContentHeight(contentElement.scrollHeight)
		setIsExpended(false)
	}, [contentWidth, contentHeight])

	useEffect(() => {
		const contentElement = contentRef.current
		const expendButtonElement = expendButtonRef.current
		if (!contentElement) return
		if (!expendButtonElement) return

		contentElement.classList.add(isExpended ? 'transition-expand' : 'transition-hide')
		contentElement.classList.remove(isExpended ? 'transition-hide' : 'transition-expand')

		expendButtonElement.style.rotate = isExpended ? '180deg' : '0deg'
		contentElement.style.width = isExpended ? contentWidth + 'px' : '0px'
		contentElement.style.height = isExpended ? contentHeight + 'px' : '0px'
		contentElement.style.opacity = isExpended ? '1' : '0'
	}, [isExpended, contentWidth, contentHeight])

	return (
		<div className="component-info d-flex flex-column">
			<div className="d-flex justify-space-between align-center grow-1">
				<span className="text-bold">Bateria #1</span>
				<button
					ref={expendButtonRef}
					onClick={() => setIsExpended(!isExpended)}
					className="icon-wrapper transparent hover-shake"
				>
					<Icon path={mdiChevronDown} size={1} />
				</button>
			</div>
			<div
				ref={contentRef}
				className="component-content d-flex flex-column gap-2"
				style={{ opacity: 0 }}
			>
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
	)
}

export default ARComponentInfo
