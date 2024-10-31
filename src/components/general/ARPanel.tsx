import { ForwardedRef, forwardRef, PropsWithChildren, RefObject } from 'react'

const ARPanel = forwardRef(
	(
		{ children, className }: PropsWithChildren<{ className?: string }>,
		ref: ForwardedRef<HTMLDivElement>
	) => {
		className = className ? `${className} ` : ''
		return (
			<div ref={ref} className={`${className}ar-container bg-ar`}>
				{children}
			</div>
		)
	}
)

export default ARPanel
