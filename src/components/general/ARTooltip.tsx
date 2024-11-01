import { PropsWithChildren, useCallback, useEffect, useRef } from 'react'
import './ARTooltip.scss'
import ARPanel from './ARPanel'

type Props = {
	active: boolean
	setActive: (value: boolean) => void
}

const ARTooltip = ({ children, active, setActive }: PropsWithChildren<Props>) => {
	const wrapperRef = useRef<HTMLDivElement>(null)

	const clickOutCallback = useCallback(() => {
		setActive(false)
		window.removeEventListener('click', clickOutCallback)
	}, [setActive])

	useEffect(() => {
		const wrapperElement = wrapperRef.current
		if (!wrapperElement) return
		wrapperElement.style.left = -wrapperElement?.clientWidth - 12 + 'px'
	}, [wrapperRef])

	useEffect(() => {
		const wrapperElement = wrapperRef.current
		if (!wrapperElement) return
		wrapperElement.style.opacity = active ? '1' : '0'
		wrapperElement.style.visibility = active ? 'visible' : 'hidden'

		if (active) window.addEventListener('click', clickOutCallback)
		else window.removeEventListener('click', clickOutCallback)
	}, [wrapperRef, active, clickOutCallback])

	return (
		<ARPanel
			onClick={(e) => e.stopPropagation()}
			ref={wrapperRef}
			className={'ar-modal pa-2 border-round'}
			style={{ opacity: 0 }}
		>
			{children}
		</ARPanel>
	)
}

export default ARTooltip
